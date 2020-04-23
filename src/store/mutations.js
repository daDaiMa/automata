import * as type from './mutation-type'

export default {
    [type.INSTRUCTION](state, { data }) {
        state.calcuInstruction = data
    },
    [type.OUTPUT](state, { data }) {
        state.calcuOutput = data
    }
}