import * as type from './mutation-type'
export const Calculate = ({ commit }, data) => {
    commit(type.INSTRUCTION, { data })
}
export const StroeOutput = ({ commit }, data) => {
    commit(type.OUTPUT, { data })
}

export const TestGrammarOut = ({ commit }, data) => {
    commit(type.TESTOUT, { data })
}

export const SendGrammarToCalcu = ({ commit }, data) => {
    commit(type.GRAMMAR_FROM_RES, { data })
}