
export const example_direct_left_recursion = { "terminal": [{ "literal": "ε", "_id": 0 }, { "literal": "number", "_id": 1 }, { "literal": "string", "_id": 2 }], "variable": [{ "literal": "S", "_id": 0 }, { "literal": "expr", "_id": 1 }], "products": [{ "lhs": "S", "rhs": [{ "symbols": [{ "literal": "expr", "_id": 0 }], "_id": 0 }], "_id": 0 }, { "lhs": "expr", "rhs": [{ "symbols": [{ "literal": "expr", "_id": 0 }, { "literal": "+", "_id": 1 }, { "literal": "expr", "_id": 2 }], "_id": 0 }, { "symbols": [{ "literal": "number", "_id": 0 }], "_id": 1 }, { "symbols": [{ "literal": "string", "_id": 0 }], "_id": 2 }] }] }
export const example_indirect_left_recursion = { "terminal": [{ "literal": "ε", "_id": 0 }, { "literal": "a", "_id": 1 }, { "literal": "b", "_id": 2 }], "variable": [{ "literal": "A1", "_id": 0 }, { "literal": "A2", "_id": 1 }, { "literal": "A3", "_id": 2 }], "products": [{ "lhs": "A1", "rhs": [{ "symbols": [{ "literal": "A2", "_id": 0 }, { "literal": "A3", "_id": 1 }], "_id": 0 }], "_id": 0 }, { "lhs": "A2", "rhs": [{ "symbols": [{ "literal": "A3", "_id": 0 }, { "literal": "A1", "_id": 1 }], "_id": 0 }, { "symbols": [{ "literal": "b", "_id": 0 }], "_id": 1 }] }, { "lhs": "A3", "rhs": [{ "symbols": [{ "literal": "A1", "_id": 0 }, { "literal": "A1", "_id": 1 }], "_id": 0 }, { "symbols": [{ "literal": "a", "_id": 0 }], "_id": 1 }] }] }
export const example_left_common_factor = { "terminal": [{ "literal": "ε", "_id": 0 }, { "literal": "if", "_id": 1 }, { "literal": "then", "_id": 2 }, { "literal": "else", "_id": 3 }], "variable": [{ "literal": "expr", "_id": 1 }, { "literal": "stmt", "_id": 2 }], "products": [{ "lhs": "stmt", "rhs": [{ "symbols": [{ "literal": "if", "_id": 0 }, { "literal": "expr", "_id": 1 }, { "literal": "then", "_id": 2 }, { "literal": "stmt", "_id": 3 }, { "literal": "else", "_id": 4 }, { "literal": "stmt", "_id": 5 }], "_id": 0 }, { "symbols": [{ "literal": "if", "_id": 0 }, { "literal": "expr", "_id": 1 }, { "literal": "then", "_id": 2 }, { "literal": "stmt", "_id": 3 }], "_id": 1 }], "_id": 0 }] }
export const example_first = { "terminal": [{ "literal": "ε", "_id": 0 }, { "literal": "s", "_id": 1 }, { "literal": "t", "_id": 2 }, { "literal": "g", "_id": 3 }, { "literal": "w", "_id": 4 }, { "literal": "e", "_id": 5 }, { "literal": "d", "_id": 6 }], "variable": [{ "literal": "S", "_id": 0 }, { "literal": "N", "_id": 1 }, { "literal": "V", "_id": 2 }], "products": [{ "lhs": "S", "rhs": [{ "symbols": [{ "literal": "N", "_id": 0 }, { "literal": "V", "_id": 1 }, { "literal": "N", "_id": 2 }], "_id": 0 }], "_id": 0 }, { "lhs": "N", "rhs": [{ "symbols": [{ "literal": "s", "_id": 0 }], "_id": 0 }, { "symbols": [{ "literal": "t", "_id": 0 }], "_id": 1 }, { "symbols": [{ "literal": "g", "_id": 0 }], "_id": 2 }, { "symbols": [{ "literal": "w", "_id": 0 }], "_id": 3 }] }, { "lhs": "V", "rhs": [{ "symbols": [{ "literal": "e", "_id": 0 }], "_id": 0 }, { "symbols": [{ "literal": "d", "_id": 0 }], "_id": 1 }] }] }
export const example_nullable = { "terminal": [{ "literal": "a", "_id": 0 }, { "literal": "c", "_id": 1 }, { "literal": "d", "_id": 2 }, { "literal": "ε", "_id": 3 }], "variable": [{ "literal": "X", "_id": 0 }, { "literal": "Y", "_id": 1 }, { "literal": "Z", "_id": 2 }], "products": [{ "lhs": "Z", "rhs": [{ "symbols": [{ "literal": "d", "_id": 0 }], "_id": 0 }, { "symbols": [{ "literal": "X", "_id": 0 }, { "literal": "Y", "_id": 1 }, { "literal": "Z", "_id": 2 }], "_id": 1 }], "_id": 0 }, { "lhs": "Y", "rhs": [{ "symbols": [{ "literal": "c", "_id": 0 }], "_id": 0 }, { "symbols": [{ "literal": "ε", "_id": 0 }], "_id": 1 }] }, { "lhs": "X", "rhs": [{ "symbols": [{ "literal": "Y", "_id": 0 }], "_id": 0 }, { "symbols": [{ "literal": "a", "_id": 0 }], "_id": 1 }] }] }
export const example_closure = { "terminal": [{ "literal": "ε", "_id": 0 }, { "literal": "*", "_id": 1 }, { "literal": "+", "_id": 2 }, { "literal": "(", "_id": 3 }, { "literal": ")", "_id": 4 }, { "literal": "id", "_id": 5 }], "variable": [{ "literal": "E", "_id": 0 }, { "literal": "T", "_id": 1 }, { "literal": "F", "_id": 2 }], "products": [{ "lhs": "E", "rhs": [{ "symbols": [{ "literal": "E", "_id": 0 }, { "literal": "+", "_id": 1 }, { "literal": "T", "_id": 2 }], "_id": 0 }, { "symbols": [{ "literal": "T", "_id": 0 }], "_id": 1 }], "_id": 0 }, { "lhs": "T", "rhs": [{ "symbols": [{ "literal": "T", "_id": 0 }, { "literal": "*", "_id": 1 }, { "literal": "F", "_id": 2 }], "_id": 0 }, { "symbols": [{ "literal": "F", "_id": 0 }], "_id": 1 }] }, { "lhs": "F", "rhs": [{ "symbols": [{ "literal": "(", "_id": 0 }, { "literal": "E", "_id": 1 }, { "literal": ")", "_id": 2 }], "_id": 0 }, { "symbols": [{ "literal": "id", "_id": 0 }], "_id": 1 }] }] }