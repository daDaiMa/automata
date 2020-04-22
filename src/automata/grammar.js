import _ from 'loadsh'
import { example_indirect_left_recursion } from '@/grammar-example'

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

export function testGrammar() {
    // console.log(ParserGrammar(example))
    let grammar = ParserGrammar(example_indirect_left_recursion)
    grammar.removeLeftRecursion()
    console.log(JSON.stringify(grammar))
}

