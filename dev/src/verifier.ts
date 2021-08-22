/* global TOKEN_TYPES TOKEN */

// Author: Rui Deleterium
// Project: https://github.com/deleterium/SmartC
// License: BSD 3-Clause License

interface LANG_RULES {
    Current: TOKEN_TYPES | 'begin'
    Next: TOKEN_TYPES | 'end'
    Possible: 'y'|'n'|'kc'
}

/** Verifies if a Tokens-AST produced by parser complies with our syntax rules.
  * @param ast Object to check.
  * @returns The same ast unchanged.
  * @throws {SyntaxError} at any mistakes
  * */
// eslint-disable-next-line no-unused-vars
function verify (ast: TOKEN[] | undefined) {
    // y-> Yes, possible combination
    // n-> No, not possible combination
    // kc->  keyword check (depends on keyword and not implemented)
    const tokenRules: LANG_RULES[] = [
        { Current: 'Variable', Next: 'Variable', Possible: 'y' },
        { Current: 'Variable', Next: 'UnaryOperator', Possible: 'n' },
        { Current: 'Variable', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'Variable', Next: 'SetOperator', Possible: 'y' },
        { Current: 'Variable', Next: 'Operator', Possible: 'y' },
        { Current: 'Variable', Next: 'Terminator', Possible: 'y' },
        { Current: 'Variable', Next: 'end', Possible: 'y' },
        { Current: 'Variable', Next: 'Keyword', Possible: 'n' },
        { Current: 'Variable', Next: 'Delimiter', Possible: 'y' },
        { Current: 'Variable', Next: 'Constant', Possible: 'n' },
        { Current: 'Variable', Next: 'Comparision', Possible: 'y' },
        { Current: 'Variable', Next: 'CodeDomain', Possible: 'y' },
        { Current: 'Variable', Next: 'CodeCave', Possible: 'n' },
        { Current: 'Variable', Next: 'Assignment', Possible: 'y' },
        { Current: 'Variable', Next: 'Arr', Possible: 'y' },
        { Current: 'UnaryOperator', Next: 'Variable', Possible: 'y' },
        { Current: 'UnaryOperator', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'UnaryOperator', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'UnaryOperator', Next: 'SetOperator', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'Operator', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'Terminator', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'end', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'Keyword', Possible: 'kc' },
        { Current: 'UnaryOperator', Next: 'Delimiter', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'Constant', Possible: 'y' },
        { Current: 'UnaryOperator', Next: 'Comparision', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'CodeCave', Possible: 'y' },
        { Current: 'UnaryOperator', Next: 'Assignment', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'Arr', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'Variable', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'UnaryOperator', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'SetUnaryOperator', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'SetOperator', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'Operator', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'Terminator', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'end', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'Keyword', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'Delimiter', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'Constant', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'Comparision', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'CodeCave', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'Assignment', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'Arr', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Variable', Possible: 'y' },
        { Current: 'SetOperator', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'SetOperator', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'SetOperator', Next: 'SetOperator', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Operator', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Terminator', Possible: 'n' },
        { Current: 'SetOperator', Next: 'end', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Keyword', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Delimiter', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Constant', Possible: 'y' },
        { Current: 'SetOperator', Next: 'Comparision', Possible: 'n' },
        { Current: 'SetOperator', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'SetOperator', Next: 'CodeCave', Possible: 'y' },
        { Current: 'SetOperator', Next: 'Assignment', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Arr', Possible: 'n' },
        { Current: 'Operator', Next: 'Variable', Possible: 'y' },
        { Current: 'Operator', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'Operator', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'Operator', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Operator', Next: 'Operator', Possible: 'n' },
        { Current: 'Operator', Next: 'Terminator', Possible: 'n' },
        { Current: 'Operator', Next: 'end', Possible: 'n' },
        { Current: 'Operator', Next: 'Keyword', Possible: 'n' },
        { Current: 'Operator', Next: 'Delimiter', Possible: 'n' },
        { Current: 'Operator', Next: 'Constant', Possible: 'y' },
        { Current: 'Operator', Next: 'Comparision', Possible: 'n' },
        { Current: 'Operator', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'Operator', Next: 'CodeCave', Possible: 'y' },
        { Current: 'Operator', Next: 'Assignment', Possible: 'n' },
        { Current: 'Operator', Next: 'Arr', Possible: 'n' },
        { Current: 'Terminator', Next: 'Variable', Possible: 'y' },
        { Current: 'Terminator', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'Terminator', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'Terminator', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Terminator', Next: 'Operator', Possible: 'n' },
        { Current: 'Terminator', Next: 'Terminator', Possible: 'y' },
        { Current: 'Terminator', Next: 'end', Possible: 'y' },
        { Current: 'Terminator', Next: 'Keyword', Possible: 'y' },
        { Current: 'Terminator', Next: 'Delimiter', Possible: 'n' },
        { Current: 'Terminator', Next: 'Constant', Possible: 'y' },
        { Current: 'Terminator', Next: 'Comparision', Possible: 'n' },
        { Current: 'Terminator', Next: 'CodeDomain', Possible: 'y' },
        { Current: 'Terminator', Next: 'CodeCave', Possible: 'y' },
        { Current: 'Terminator', Next: 'Assignment', Possible: 'n' },
        { Current: 'Terminator', Next: 'Arr', Possible: 'n' },
        { Current: 'Constant', Next: 'Variable', Possible: 'n' },
        { Current: 'Constant', Next: 'UnaryOperator', Possible: 'n' },
        { Current: 'Constant', Next: 'SetUnaryOperator', Possible: 'n' },
        { Current: 'Constant', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Constant', Next: 'Operator', Possible: 'y' },
        { Current: 'Constant', Next: 'Terminator', Possible: 'y' },
        { Current: 'Constant', Next: 'end', Possible: 'y' },
        { Current: 'Constant', Next: 'Keyword', Possible: 'n' },
        { Current: 'Constant', Next: 'Delimiter', Possible: 'y' },
        { Current: 'Constant', Next: 'Constant', Possible: 'n' },
        { Current: 'Constant', Next: 'Comparision', Possible: 'y' },
        { Current: 'Constant', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'Constant', Next: 'CodeCave', Possible: 'n' },
        { Current: 'Constant', Next: 'Assignment', Possible: 'n' },
        { Current: 'Constant', Next: 'Arr', Possible: 'n' },
        { Current: 'Keyword', Next: 'Variable', Possible: 'kc' },
        { Current: 'Keyword', Next: 'UnaryOperator', Possible: 'kc' },
        { Current: 'Keyword', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'Keyword', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Keyword', Next: 'Operator', Possible: 'n' },
        { Current: 'Keyword', Next: 'Terminator', Possible: 'kc' },
        { Current: 'Keyword', Next: 'end', Possible: 'kc' },
        { Current: 'Keyword', Next: 'Keyword', Possible: 'kc' },
        { Current: 'Keyword', Next: 'Delimiter', Possible: 'kc' },
        { Current: 'Keyword', Next: 'Constant', Possible: 'kc' }, // return 2
        { Current: 'Keyword', Next: 'Comparision', Possible: 'n' },
        { Current: 'Keyword', Next: 'CodeDomain', Possible: 'kc' },
        { Current: 'Keyword', Next: 'CodeCave', Possible: 'kc' },
        { Current: 'Keyword', Next: 'Assignment', Possible: 'n' },
        { Current: 'Keyword', Next: 'Arr', Possible: 'n' },
        { Current: 'Comparision', Next: 'Variable', Possible: 'y' },
        { Current: 'Comparision', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'Comparision', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'Comparision', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Comparision', Next: 'Operator', Possible: 'n' },
        { Current: 'Comparision', Next: 'Terminator', Possible: 'n' },
        { Current: 'Comparision', Next: 'end', Possible: 'n' },
        { Current: 'Comparision', Next: 'Keyword', Possible: 'n' },
        { Current: 'Comparision', Next: 'Delimiter', Possible: 'n' },
        { Current: 'Comparision', Next: 'Constant', Possible: 'y' },
        { Current: 'Comparision', Next: 'Comparision', Possible: 'n' },
        { Current: 'Comparision', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'Comparision', Next: 'CodeCave', Possible: 'y' },
        { Current: 'Comparision', Next: 'Assignment', Possible: 'n' },
        { Current: 'Comparision', Next: 'Arr', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'Variable', Possible: 'y' },
        { Current: 'CodeDomain', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'CodeDomain', Next: 'SetUnaryOperator', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'SetOperator', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'Operator', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'Terminator', Possible: 'y' },
        { Current: 'CodeDomain', Next: 'end', Possible: 'y' },
        { Current: 'CodeDomain', Next: 'Keyword', Possible: 'y' },
        { Current: 'CodeDomain', Next: 'Delimiter', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'Constant', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'Comparision', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'CodeCave', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'Assignment', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'Arr', Possible: 'n' },
        { Current: 'Delimiter', Next: 'Variable', Possible: 'y' },
        { Current: 'Delimiter', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'Delimiter', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'Delimiter', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Delimiter', Next: 'Operator', Possible: 'n' },
        { Current: 'Delimiter', Next: 'Terminator', Possible: 'n' },
        { Current: 'Delimiter', Next: 'end', Possible: 'n' },
        { Current: 'Delimiter', Next: 'Keyword', Possible: 'y' },
        { Current: 'Delimiter', Next: 'Delimiter', Possible: 'n' },
        { Current: 'Delimiter', Next: 'Constant', Possible: 'y' },
        { Current: 'Delimiter', Next: 'Comparision', Possible: 'n' },
        { Current: 'Delimiter', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'Delimiter', Next: 'CodeCave', Possible: 'y' },
        { Current: 'Delimiter', Next: 'Assignment', Possible: 'n' },
        { Current: 'Delimiter', Next: 'Arr', Possible: 'n' },
        { Current: 'CodeCave', Next: 'Variable', Possible: 'y' },
        { Current: 'CodeCave', Next: 'UnaryOperator', Possible: 'n' },
        { Current: 'CodeCave', Next: 'SetUnaryOperator', Possible: 'n' },
        { Current: 'CodeCave', Next: 'SetOperator', Possible: 'y' },
        { Current: 'CodeCave', Next: 'Operator', Possible: 'y' },
        { Current: 'CodeCave', Next: 'Terminator', Possible: 'y' },
        { Current: 'CodeCave', Next: 'end', Possible: 'y' },
        { Current: 'CodeCave', Next: 'Keyword', Possible: 'y' },
        { Current: 'CodeCave', Next: 'Delimiter', Possible: 'y' },
        { Current: 'CodeCave', Next: 'Constant', Possible: 'n' },
        { Current: 'CodeCave', Next: 'Comparision', Possible: 'y' },
        { Current: 'CodeCave', Next: 'CodeDomain', Possible: 'y' },
        { Current: 'CodeCave', Next: 'CodeCave', Possible: 'n' },
        { Current: 'CodeCave', Next: 'Assignment', Possible: 'y' },
        { Current: 'CodeCave', Next: 'Arr', Possible: 'n' },
        { Current: 'begin', Next: 'Variable', Possible: 'y' },
        { Current: 'begin', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'begin', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'begin', Next: 'SetOperator', Possible: 'n' },
        { Current: 'begin', Next: 'Operator', Possible: 'n' },
        { Current: 'begin', Next: 'Terminator', Possible: 'y' },
        { Current: 'begin', Next: 'end', Possible: 'y' },
        { Current: 'begin', Next: 'Keyword', Possible: 'y' },
        { Current: 'begin', Next: 'Delimiter', Possible: 'n' },
        { Current: 'begin', Next: 'Constant', Possible: 'y' },
        { Current: 'begin', Next: 'Comparision', Possible: 'n' },
        { Current: 'begin', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'begin', Next: 'CodeCave', Possible: 'y' },
        { Current: 'begin', Next: 'Assignment', Possible: 'n' },
        { Current: 'begin', Next: 'Arr', Possible: 'n' },
        { Current: 'Assignment', Next: 'Variable', Possible: 'y' },
        { Current: 'Assignment', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'Assignment', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'Assignment', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Assignment', Next: 'Operator', Possible: 'n' },
        { Current: 'Assignment', Next: 'Terminator', Possible: 'n' },
        { Current: 'Assignment', Next: 'end', Possible: 'n' },
        { Current: 'Assignment', Next: 'Keyword', Possible: 'n' },
        { Current: 'Assignment', Next: 'Delimiter', Possible: 'n' },
        { Current: 'Assignment', Next: 'Constant', Possible: 'y' },
        { Current: 'Assignment', Next: 'Comparision', Possible: 'n' },
        { Current: 'Assignment', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'Assignment', Next: 'CodeCave', Possible: 'y' },
        { Current: 'Assignment', Next: 'Assignment', Possible: 'n' },
        { Current: 'Assignment', Next: 'Arr', Possible: 'n' },
        { Current: 'Arr', Next: 'Variable', Possible: 'n' },
        { Current: 'Arr', Next: 'UnaryOperator', Possible: 'n' },
        { Current: 'Arr', Next: 'SetUnaryOperator', Possible: 'n' },
        { Current: 'Arr', Next: 'SetOperator', Possible: 'y' },
        { Current: 'Arr', Next: 'Operator', Possible: 'y' },
        { Current: 'Arr', Next: 'Terminator', Possible: 'y' },
        { Current: 'Arr', Next: 'end', Possible: 'y' },
        { Current: 'Arr', Next: 'Keyword', Possible: 'n' },
        { Current: 'Arr', Next: 'Delimiter', Possible: 'y' },
        { Current: 'Arr', Next: 'Constant', Possible: 'n' },
        { Current: 'Arr', Next: 'Comparision', Possible: 'y' },
        { Current: 'Arr', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'Arr', Next: 'CodeCave', Possible: 'n' },
        { Current: 'Arr', Next: 'Assignment', Possible: 'y' },
        { Current: 'Arr', Next: 'Arr', Possible: 'y' },
        // macro -> just skip rules checks
        { Current: 'Macro', Next: 'Variable', Possible: 'y' },
        { Current: 'Macro', Next: 'UnaryOperator', Possible: 'y' },
        { Current: 'Macro', Next: 'SetUnaryOperator', Possible: 'y' },
        { Current: 'Macro', Next: 'SetOperator', Possible: 'y' },
        { Current: 'Macro', Next: 'Operator', Possible: 'y' },
        { Current: 'Macro', Next: 'Terminator', Possible: 'y' },
        { Current: 'Macro', Next: 'end', Possible: 'y' },
        { Current: 'Macro', Next: 'Keyword', Possible: 'y' },
        { Current: 'Macro', Next: 'Delimiter', Possible: 'y' },
        { Current: 'Macro', Next: 'Constant', Possible: 'y' },
        { Current: 'Macro', Next: 'Comparision', Possible: 'y' },
        { Current: 'Macro', Next: 'CodeDomain', Possible: 'y' },
        { Current: 'Macro', Next: 'CodeCave', Possible: 'y' },
        { Current: 'Macro', Next: 'Assignment', Possible: 'y' },
        { Current: 'Macro', Next: 'Arr', Possible: 'y' },
        { Current: 'Macro', Next: 'Macro', Possible: 'y' },
        { Current: 'Variable', Next: 'Macro', Possible: 'y' },
        { Current: 'UnaryOperator', Next: 'Macro', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'Macro', Possible: 'y' },
        { Current: 'SetOperator', Next: 'Macro', Possible: 'y' },
        { Current: 'Operator', Next: 'Macro', Possible: 'y' },
        { Current: 'Terminator', Next: 'Macro', Possible: 'y' },
        { Current: 'begin', Next: 'Macro', Possible: 'y' },
        { Current: 'Keyword', Next: 'Macro', Possible: 'y' },
        { Current: 'Delimiter', Next: 'Macro', Possible: 'y' },
        { Current: 'Constant', Next: 'Macro', Possible: 'y' },
        { Current: 'Comparision', Next: 'Macro', Possible: 'y' },
        { Current: 'CodeDomain', Next: 'Macro', Possible: 'y' },
        { Current: 'CodeCave', Next: 'Macro', Possible: 'y' },
        { Current: 'Assignment', Next: 'Macro', Possible: 'y' },
        { Current: 'Arr', Next: 'Macro', Possible: 'y' },
        // endmacro
        // member
        { Current: 'Member', Next: 'Variable', Possible: 'y' },
        { Current: 'Member', Next: 'UnaryOperator', Possible: 'n' },
        { Current: 'Member', Next: 'SetUnaryOperator', Possible: 'n' },
        { Current: 'Member', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Member', Next: 'Operator', Possible: 'n' },
        { Current: 'Member', Next: 'Terminator', Possible: 'n' },
        { Current: 'Member', Next: 'end', Possible: 'n' },
        { Current: 'Member', Next: 'Keyword', Possible: 'n' },
        { Current: 'Member', Next: 'Delimiter', Possible: 'n' },
        { Current: 'Member', Next: 'Constant', Possible: 'n' },
        { Current: 'Member', Next: 'Comparision', Possible: 'n' },
        { Current: 'Member', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'Member', Next: 'CodeCave', Possible: 'n' },
        { Current: 'Member', Next: 'Assignment', Possible: 'n' },
        { Current: 'Member', Next: 'Arr', Possible: 'n' },
        { Current: 'Member', Next: 'Macro', Possible: 'n' },
        { Current: 'Member', Next: 'Member', Possible: 'n' },
        { Current: 'Variable', Next: 'Member', Possible: 'y' },
        { Current: 'UnaryOperator', Next: 'Member', Possible: 'n' },
        { Current: 'SetUnaryOperator', Next: 'Member', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Member', Possible: 'n' },
        { Current: 'Operator', Next: 'Member', Possible: 'n' },
        { Current: 'Terminator', Next: 'Member', Possible: 'n' },
        { Current: 'begin', Next: 'Member', Possible: 'n' },
        { Current: 'Keyword', Next: 'Member', Possible: 'n' },
        { Current: 'Delimiter', Next: 'Member', Possible: 'n' },
        { Current: 'Constant', Next: 'Member', Possible: 'n' },
        { Current: 'Comparision', Next: 'Member', Possible: 'n' },
        { Current: 'CodeDomain', Next: 'Member', Possible: 'n' },
        { Current: 'CodeCave', Next: 'Member', Possible: 'y' },
        { Current: 'Assignment', Next: 'Member', Possible: 'n' },
        { Current: 'Arr', Next: 'Member', Possible: 'y' },
        { Current: 'Macro', Next: 'Member', Possible: 'n' },
        // endmember
        // Function
        { Current: 'Function', Next: 'Variable', Possible: 'n' },
        { Current: 'Function', Next: 'UnaryOperator', Possible: 'n' },
        { Current: 'Function', Next: 'SetUnaryOperator', Possible: 'n' },
        { Current: 'Function', Next: 'SetOperator', Possible: 'n' },
        { Current: 'Function', Next: 'Operator', Possible: 'n' },
        { Current: 'Function', Next: 'Terminator', Possible: 'n' },
        { Current: 'Function', Next: 'end', Possible: 'n' },
        { Current: 'Function', Next: 'Keyword', Possible: 'n' },
        { Current: 'Function', Next: 'Delimiter', Possible: 'n' },
        { Current: 'Function', Next: 'Constant', Possible: 'n' },
        { Current: 'Function', Next: 'Comparision', Possible: 'n' },
        { Current: 'Function', Next: 'CodeDomain', Possible: 'n' },
        { Current: 'Function', Next: 'CodeCave', Possible: 'y' },
        { Current: 'Function', Next: 'Assignment', Possible: 'n' },
        { Current: 'Function', Next: 'Arr', Possible: 'n' },
        { Current: 'Function', Next: 'Macro', Possible: 'n' },
        { Current: 'Function', Next: 'Member', Possible: 'n' },
        { Current: 'Function', Next: 'Function', Possible: 'n' },
        { Current: 'Variable', Next: 'Function', Possible: 'n' },
        { Current: 'UnaryOperator', Next: 'Function', Possible: 'y' },
        { Current: 'SetUnaryOperator', Next: 'Function', Possible: 'n' },
        { Current: 'SetOperator', Next: 'Function', Possible: 'y' },
        { Current: 'Operator', Next: 'Function', Possible: 'y' },
        { Current: 'Terminator', Next: 'Function', Possible: 'y' },
        { Current: 'begin', Next: 'Function', Possible: 'y' },
        { Current: 'Keyword', Next: 'Function', Possible: 'y' },
        { Current: 'Delimiter', Next: 'Function', Possible: 'y' },
        { Current: 'Constant', Next: 'Function', Possible: 'n' },
        { Current: 'Comparision', Next: 'Function', Possible: 'y' },
        { Current: 'CodeDomain', Next: 'Function', Possible: 'y' },
        { Current: 'CodeCave', Next: 'Function', Possible: 'n' },
        { Current: 'Assignment', Next: 'Function', Possible: 'y' },
        { Current: 'Arr', Next: 'Function', Possible: 'n' },
        { Current: 'Macro', Next: 'Function', Possible: 'y' },
        { Current: 'Member', Next: 'Function', Possible: 'n' }
        // endFunction
    ]

    function checkRules (value: TOKEN, index:number, array: TOKEN[]) {
        let search: LANG_RULES | undefined

        if (index === 0) {
            search = tokenRules.find(rules => rules.Current === 'begin' && rules.Next === value.type)
            if (search === undefined) {
                throw new SyntaxError(`At line: ${value.line}. Combination not found on verifier rules: 'begin' and '${value.type}'. Missing ';'?`)
            }
            if (search.Possible === 'n') {
                throw new SyntaxError(`At line: ${value.line}. Forbidden combination during rules verification: '${search.Current}' and '${search.Next}'. Missing ';'?`)
            }
        }

        let tokentype: TOKEN_TYPES|'end' = 'end'
        if (index !== array.length - 1) {
            tokentype = array[index + 1].type
        }
        search = tokenRules.find(rules => rules.Current === value.type && rules.Next === tokentype)
        if (search === undefined) {
            throw new SyntaxError(`At line: ${value.line}. Combination not found on verifier rules: 'begin' and '${tokentype}'. Missing ';'?`)
        }
        if (search.Possible === 'n') {
            throw new SyntaxError(`At line: ${value.line}. Forbidden combination during rules verification: '${search.Current}' and '${search.Next}'. Missing ';'?`)
        }

        if (value.type === 'Arr' || value.type === 'CodeCave' || value.type === 'CodeDomain') {
            verify(value.params)
        }
    }

    /* * * Main function! * * */
    if (ast === undefined) {
        throw new SyntaxError('Undefined ast reached verify() function.')
    }
    ast.forEach(checkRules)
    return (ast)
}
