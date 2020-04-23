import * as type from './mutation-type'
export const Calculate = ({ commit }, data) => {
    commit(type.INSTRUCTION, { data })
}
export const StroeOutput = ({ commit }, data) => {
    commit(type.OUTPUT, { data })
}