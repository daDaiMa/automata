import _ from 'loadsh'
import {
    // example_indirect_left_recursion,
    example_left_common_factor
} from '@/grammar-example'
import { TestGrammarOut } from '../store/actions'
import store from '../store'

export const EPSILON = 'ε'
export const END = '$'

function Grammar() {
    this.Terminal = []
    this.Variables = []
    this.Products = []
    this.Entry = null
    let NewVariable = (variable) => {
        let base = variable.split('-')[0]
        let number = parseInt(variable.split('-')[1]) || 0
        while (this.Variables.includes(base + '-' + number))
            base++
        this.Variables = this.Variables.concat(base + '-' + number)
        return base + '-' + number
    }
    let removeDirectLeftRecursion = (product) => {
        let isDirRec = (p) => {
            return Boolean(p.rhs.filter(rhs => rhs[0] === p.lhs).length)
        }
        if (!isDirRec(product)) return
        let new_lhs = NewVariable(product.lhs)
        let new_product = _.cloneDeep(product)
        new_product.lhs = new_lhs
        product.rhs = product.rhs.filter(item => item[0] != product.lhs).map(item => {
            return item.concat(new_lhs)
        })
        new_product.rhs = new_product.rhs.filter(item => item[0] === product.lhs).map(item => {
            return item.slice(1).concat(new_lhs)
        }).concat([[EPSILON]])
        this.Products = this.Products.concat(new_product)
    }
    this.removeLeftRecursion = () => {
        for (let i in this.Variables) {
            let Ai = this.Variables[i]
            let Pi = this.Products.filter(item => item.lhs === Ai)[0] || null
            if (!Pi) continue
            for (let j in this.Variables.slice(0, i)) {
                let Aj = this.Variables[j]
                let Pj = this.Products.filter(item => item.lhs === Aj)[0] || null
                if (!Pi) continue
                let new_rhs = Pi.rhs.filter(item => item[0] === Aj).reduce((acc, curr) => {
                    return acc.concat(Pj.rhs.map(item => {
                        return item.concat(curr.slice(1))
                    }))
                }, [])
                Pi.rhs = Pi.rhs.filter(item => item[0] !== Aj).concat(new_rhs)
            }
            removeDirectLeftRecursion(Pi)
        }
    }
    let findLeftCommonFactor = (product) => {
        let symbolsList = [...product.rhs]
        // 先排序
        let sortedIndex = symbolsList.map((symbols, idx) => {
            return {
                str: symbols.join(),
                idx
            }
        }).sort((a, b) => (a.str > b.str) ? 1 : -1).map(item => item.idx)

        // 然后找公共最长子前缀,并且给出区间
        let left = -1
        let right = - 1
        let maxItemNumber = 0

        // todo: 优化 如果有两个最长公因子 可以一起提取
        for (const [i] of sortedIndex.entries()) {
            if (i === sortedIndex.length - 1) break
            let symbolsA = symbolsList[sortedIndex[i]]
            let symbolsB = symbolsList[sortedIndex[i + 1]]
            let k = 0
            for (k = 0; k < symbolsA.length && k < symbolsB.length; k++) {
                if (symbolsA[k] !== symbolsB[k]) break;
            }
            if (!k) continue;
            if (maxItemNumber === k) {
                i === right ? right += 1 : (left = i, right = i + 1)
            } else if (maxItemNumber < k) {
                maxItemNumber = k
                left = i
                right = left + 1
            }
        }


        if (left >= 0) {
            let target = sortedIndex.slice(left, right + 1)
            let commonPrefix = symbolsList[target[0]].slice(0, maxItemNumber)
            let new_variable = NewVariable(product.lhs)
            let new_product = { lhs: new_variable, rhs: [] }
            for (const idx of target) {
                let left = symbolsList[idx].slice(maxItemNumber)
                left.length || (left = [EPSILON])
                new_product.rhs = new_product.rhs.concat([left])
            }
            product.rhs = product.rhs.filter((_, idx) => !target.includes(idx))
            product.rhs = product.rhs.concat([[...commonPrefix, new_variable]])
            this.Products = this.Products.concat(new_product)
            return {
                left,
                right,
                maxItemNumber,
                new_product
            }
        }
        return null
    }

    this.extracLeftCommonFactor = () => {
        let queue = [...this.Products]
        while (queue && queue.length) {
            let res = findLeftCommonFactor(queue.pop())
            res && queue.push(res.new_product)
        }
    }

}

export function ParserGrammar(obj) {
    let grammar = new Grammar()
    obj = _.cloneDeep(obj)
    grammar.Terminal = obj.terminal.map(item => item.literal)
    grammar.Variables = obj.variable.map(item => item.literal)
    grammar.Entry = grammar.Variables[0]
    grammar.Products = obj.products.map(item => {
        return {
            lhs: item.lhs,
            rhs: item.rhs.map(rhs => {
                return rhs.symbols.map(sym => sym.literal)
            })
        }
    })
    // 拆开一个一个
    // grammar.products = obj.products.reduce((acc, curr) => {
    //     return acc.concat(curr.rhs.map(rhs => {
    //         return {
    //             lhs: curr.lhs,
    //             rhs: rhs.symbols.map(sym => sym.literal)
    //         }
    //     }))
    // }, [])
    return grammar
}

export function RunGrammarTest() {
    // console.log(ParserGrammar(example))
    let grammar = ParserGrammar(example_left_common_factor)
    grammar.extracLeftCommonFactor()
    console.log('[TEST LOG]:', JSON.stringify(grammar))
    TestGrammarOut(store, grammar)
}

