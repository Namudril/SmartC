
/**
 * Converts a utf-16 string to utf-8 hexstring
 *
 * @param inStr Input string
 * @returns Same string converted, padded and reversed.
 * (multiple of 8 bytes)
 */
export function stringToHexstring (inStr: string) : string {
    const byarr : number [] = []

    if (inStr.length === 0) byarr.push(0)

    let i = 0
    while (i < inStr.length) {
        const charCode = inStr.charCodeAt(i)
        switch (true) {
        case (charCode < 0x80):
            byarr.push(charCode)
            break
        case (charCode < 0x800):
            byarr.push(0xc0 | (charCode >> 6))
            byarr.push(0x80 | (charCode & 0x3f))
            break
        case (charCode < 0xd800):
        case (charCode > 0xdfff):
            byarr.push(0xe0 | (0x3f & (charCode >> 12)))
            byarr.push(0x80 | (0x3f & (charCode >> 6)))
            byarr.push(0x80 | (0x3f & charCode))
            break
        default: {
            i++
            const nextCharCode = inStr.charCodeAt(i)
            if (isNaN(nextCharCode)) {
                break
            }
            if ((charCode & 0xfc00) === 0xd800 && (nextCharCode & 0xfc00) === 0xdc00) {
                const newCharCode = ((charCode & 0x3ff) << 10) + (nextCharCode & 0x3ff) + 0x10000
                byarr.push(0xf0 | (0x3f & (newCharCode >> 18)))
                byarr.push(0x80 | (0x3f & (newCharCode >> 12)))
                byarr.push(0x80 | (0x3f & (newCharCode >> 6)))
                byarr.push(0x80 | (0x3f & newCharCode))
            }
        }
        }
        i++
    }
    const byteSize = (Math.floor((byarr.length - 1) / 8) + 1) * 8
    byarr.reverse()
    const hexstring = byarr.map(num => num.toString(16).padStart(2, '0')).join('')
    return hexstring.padStart(byteSize * 2, '0')
}

/**
 * Decode REED-SALOMON signum address from string to long value
 * Adapted from https://github.com/signum-network/signumj
 *
 * @param RSString String without S-, TS- nor BURST- prefix. Invalid
 * chars are skipped
 * @param currLine Will be used in throw message if error in decoding
 * @returns hexstring little endian equivalent for RS address
 * @throws {TypeError} on decoding error
 */
export function ReedSalomonAddressDecode (RSString: string, currLine: number) : string {
    const gexp = [1, 2, 4, 8, 16, 5, 10, 20, 13, 26, 17, 7, 14, 28, 29, 31, 27, 19, 3, 6, 12, 24, 21, 15, 30, 25, 23, 11, 22, 9, 18, 1]
    const glog = [0, 0, 1, 18, 2, 5, 19, 11, 3, 29, 6, 27, 20, 8, 12, 23, 4, 10, 30, 17, 7, 22, 28, 26, 21, 25, 9, 16, 13, 14, 24, 15]

    function gmult (a: number, b: number) : number {
        if (a === 0 || b === 0) {
            return 0
        }
        const idx = (glog[a] + glog[b]) % 31
        return gexp[idx]
    }

    function isCodewordValid (codewordToTest: number[]) : boolean {
        let sum = 0
        for (let i = 1; i < 5; i++) {
            let t = 0
            for (let j = 0; j < 31; j++) {
                if (j > 12 && j < 27) {
                    continue
                }
                let pos = j
                if (j > 26) {
                    pos -= 14
                }
                t ^= gmult(codewordToTest[pos], gexp[(i * j) % 31])
            }
            sum |= t
        }
        return sum === 0
    }

    function run () : string {
        const codeword: number[] = []
        const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
        const codewordMap = [3, 2, 1, 0, 7, 6, 5, 4, 13, 14, 15, 16, 12, 8, 9, 10, 11]

        const validChars = RSString.replace(/[^23456789ABCDEFGHJKLMNPQRSTUVWXYZ]/g, '')
        validChars.split('').forEach((char, index) => {
            const positionInAlphabet = alphabet.indexOf(char)
            codeword[codewordMap[index]] = positionInAlphabet
        })
        if (validChars.length !== 17 || !isCodewordValid(codeword)) {
            throw new TypeError(`At line: ${currLine}. Error decoding address: S-${RSString}`)
        }

        // base32 to bigint conversion. Disregard checking bytes on indexes above 13.
        const accountId = codeword.slice(0, 13).reduce((previousValue, currentValue, currentIndex) => {
            return previousValue + (BigInt(currentValue) * (1n << (5n * BigInt(currentIndex))))
        }, 0n)

        if (accountId >= 18446744073709551616n) {
            throw new TypeError(`At line: ${currLine}. Error decoding address: S-${RSString}`)
        }
        return accountId.toString(16).padStart(16, '0')
    }

    return run()
}
