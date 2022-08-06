import { CONTRACT } from '../index'

describe('optimzeVM:', () => {
    it('should optimize: cpu opcodes (1)', () => {
        /* this is source code for test:
            #include APIFunctions\n#pragma verboseAssembly\n#pragma optimizationLevel 3\n\nconst long n3 = 3;\n\nlong testID, a, b, c, d;\n\nswitch (testID) {\ncase 0: // label __GNT\n    b=testID;\n    a=getNextTx();\n    b=testID;\n    break;\ncase 1: // label _opt\n    b=testID;\n    if (b) {\n        b=testID;\n    }\n    break;\ncase 2: // SET_VAL\n    b=9;\n    b=9; //optimize same content\n    break;\ncase 3: // SET_DAT\n    b=9; a=9;\n    b=a; //optimize same content\n    c=d;\n    d=c; //optimize same var\n    break;\ncase 4: // CLR\n    a=0;\n    asm { SET @b #0000000000000000 }\n    b=0; //optimize same content\n    a=b; //optimize same content\n    break;\ncase 5: // INC DEC\n    a=0;\n    b=10;\n    a++; b--;\n    a=1; //optimize same content\n    b=9; //optimize same content\n    break;\n}
        */
        const code = [
            '^declare r0',
            '^declare r1',
            '^declare r2',
            '^declare _counterTimestamp',
            '^declare n3',
            '^declare testID',
            '^declare a',
            '^declare b',
            '^declare c',
            '^declare d',
            '',
            '^comment line 5 const long n3 = 3;',
            '^const SET @n3 #0000000000000003',
            '^comment line 9 switch (testID) {',
            'BZR $testID :__switch1_0',
            'SET @r0 #0000000000000001',
            'BEQ $testID $r0 :__switch1_1',
            'SET @r0 #0000000000000002',
            'BEQ $testID $r0 :__switch1_2',
            'BEQ $testID $n3 :__switch1_3',
            'SET @r0 #0000000000000004',
            'BEQ $testID $r0 :__switch1_4',
            'SET @r0 #0000000000000005',
            'BEQ $testID $r0 :__switch1_5',
            'FIN',
            '^comment line 10 case 0: // label __GNT',
            '__switch1_0:',
            '^comment line 11     b=testID;',
            'SET @b $testID',
            '^comment line 12     a=getNextTx();',
            'FUN A_to_Tx_after_Timestamp $_counterTimestamp',
            'FUN @a get_A1',
            'BZR $a :__GNT_2',
            'FUN @_counterTimestamp get_Timestamp_for_Tx_in_A',
            '__GNT_2:',
            '^comment line 13     b=testID;',
            'SET @b $testID',
            '^comment line 14     break;',
            'FIN',
            '^comment line 15 case 1: // label _opt',
            '__switch1_1:',
            '^comment line 16     b=testID;',
            'SET @b $testID',
            '^comment line 17     if (b) {',
            'BNZ $b :__opt_1',
            'FIN',
            '__opt_1:',
            '^comment line 18         b=testID;',
            'SET @b $testID',
            '^comment line 20     break;',
            'FIN',
            '^comment line 21 case 2: // SET_VAL',
            '__switch1_2:',
            '^comment line 22     b=9;',
            'SET @b #0000000000000009',
            '^comment line 23     b=9; //optimize same content',
            'SET @b #0000000000000009',
            '^comment line 24     break;',
            'FIN',
            '^comment line 25 case 3: // SET_DAT',
            '__switch1_3:',
            '^comment line 26     b=9; a=9;',
            'SET @b #0000000000000009',
            'SET @a #0000000000000009',
            '^comment line 27     b=a; //optimize same content',
            'SET @b $a',
            '^comment line 28     c=d;',
            'SET @c $d',
            '^comment line 29     d=c; //optimize same var',
            'SET @d $c',
            '^comment line 30     break;',
            'FIN',
            '^comment line 31 case 4: // CLR',
            '__switch1_4:',
            '^comment line 32     a=0;',
            'CLR @a',
            '^comment line 33     asm { SET @b #0000000000000000 }',
            'SET @b #0000000000000000',
            '^comment line 34     b=0; //optimize same content',
            'CLR @b',
            '^comment line 35     a=b; //optimize same content',
            'SET @a $b',
            '^comment line 36     break;',
            'FIN',
            '^comment line 37 case 5: // INC DEC',
            '__switch1_5:',
            '^comment line 38     a=0;',
            'CLR @a',
            '^comment line 39     b=10;',
            'SET @b #000000000000000a',
            '^comment line 40     a++; b--;',
            'INC @a',
            'DEC @b',
            '^comment line 41     a=1; //optimize same content',
            'SET @a #0000000000000001',
            '^comment line 42     b=9; //optimize same content',
            'SET @b #0000000000000009',
            '^comment line 43     break;',
            'FIN'
        ]
        const optCode = [
            '^declare r0',
            '^declare r1',
            '^declare r2',
            '^declare _counterTimestamp',
            '^declare n3',
            '^declare testID',
            '^declare a',
            '^declare b',
            '^declare c',
            '^declare d',
            '',
            '^comment line 5 const long n3 = 3;',
            '^const SET @n3 #0000000000000003',
            '^comment line 9 switch (testID) {',
            'BZR $testID :__switch1_0',
            'SET @r0 #0000000000000001',
            'BEQ $testID $r0 :__switch1_1',
            'SET @r0 #0000000000000002',
            'BEQ $testID $r0 :__switch1_2',
            'BEQ $testID $n3 :__switch1_3',
            'SET @r0 #0000000000000004',
            'BEQ $testID $r0 :__switch1_4',
            'SET @r0 #0000000000000005',
            'BEQ $testID $r0 :__switch1_5',
            'FIN',
            '^comment line 10 case 0: // label __GNT',
            '__switch1_0:',
            '^comment line 11     b=testID;',
            'SET @b $testID',
            '^comment line 12     a=getNextTx();',
            'FUN A_to_Tx_after_Timestamp $_counterTimestamp',
            'FUN @a get_A1',
            'BZR $a :__GNT_2',
            'FUN @_counterTimestamp get_Timestamp_for_Tx_in_A',
            '__GNT_2:',
            '^comment line 13     b=testID;',
            '^comment line 14     break;',
            'FIN',
            '^comment line 15 case 1: // label _opt',
            '__switch1_1:',
            '^comment line 16     b=testID;',
            'SET @b $testID',
            '^comment line 17     if (b) {',
            'BNZ $b :__opt_1',
            'FIN',
            '__opt_1:',
            '^comment line 18         b=testID;',
            '^comment line 20     break;',
            'FIN',
            '^comment line 21 case 2: // SET_VAL',
            '__switch1_2:',
            '^comment line 22     b=9;',
            'SET @b #0000000000000009',
            '^comment line 23     b=9; //optimize same content',
            '^comment line 24     break;',
            'FIN',
            '^comment line 25 case 3: // SET_DAT',
            '__switch1_3:',
            '^comment line 26     b=9; a=9;',
            'SET @b #0000000000000009',
            'SET @a #0000000000000009',
            '^comment line 27     b=a; //optimize same content',
            '^comment line 28     c=d;',
            'SET @c $d',
            '^comment line 29     d=c; //optimize same var',
            '^comment line 30     break;',
            'FIN',
            '^comment line 31 case 4: // CLR',
            '__switch1_4:',
            '^comment line 32     a=0;',
            'CLR @a',
            '^comment line 33     asm { SET @b #0000000000000000 }',
            'SET @b #0000000000000000',
            '^comment line 34     b=0; //optimize same content',
            '^comment line 35     a=b; //optimize same content',
            '^comment line 36     break;',
            'FIN',
            '^comment line 37 case 5: // INC DEC',
            '__switch1_5:',
            '^comment line 38     a=0;',
            'CLR @a',
            '^comment line 39     b=10;',
            'SET @b #000000000000000a',
            '^comment line 40     a++; b--;',
            'INC @a',
            'DEC @b',
            '^comment line 41     a=1; //optimize same content',
            '^comment line 42     b=9; //optimize same content',
            '^comment line 43     break;',
            'FIN'
        ]
        const result = new CONTRACT(code).optimize()
        expect(result).toEqual(optCode)
    })
    it('should not optimize: Fix bug MUL not updating unknow value', () => {
        const code = [
            '^declare r0',
            '^declare r1',
            '^declare r2',
            '^declare f100000000',
            '^const SET @f100000000 #0000000005f5e100',
            '^declare operation',
            '^const SET @operation #0000000000000005',
            '^declare operation_0_signa',
            '^declare operation_0_quantity',
            '^declare operation_0_sender',
            '^declare operation_1_signa',
            '^declare operation_1_quantity',
            '^declare operation_1_sender',
            '^declare enqueuedTransactions',
            '^declare amount',
            '^declare previousRatio',
            '',
            'SET @r0 #0000000000000003',
            'MUL @r0 $enqueuedTransactions',
            'CLR @r1',
            'SUB @r1 $amount',
            'MUL @r1 $f100000000',
            'SET @($operation + $r0) $r1',
            'SET @r0 #0000000000000003',
            'MUL @r0 $enqueuedTransactions',
            'INC @r0',
            'SET @r1 $amount',
            'MUL @r1 $f100000000',
            'MDV @r1 $f100000000 $previousRatio',
            'DIV @r1 $f100000000',
            'SET @($operation + $r0) $r1',
            'FIN'
        ]
        const result = new CONTRACT(code).optimize()
        expect(result).toEqual(code)
    })
})
