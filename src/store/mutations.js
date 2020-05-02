import * as type from './mutation-type'

export default {
    [type.INSTRUCTION](state, { data }) {
        state.calcuInstruction = data
    },
    [type.OUTPUT](state, { data }) {
        state.calcuOutput = data
    },
    [type.TESTOUT](state, { data }) {
        state.testGrammar = data
    },
    [type.GRAMMAR_FROM_RES](state, { data }) {
        state.grammarFromRes = data
    }
}