import _ from 'loadsh'
import { example } from '@/grammar-example'

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
        return base + '-' + number
    }
    this.removeDirectLeftRecursion = () => {
        let rm = (product) => {
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
            isDirRec(new_product) && rm(new_product)
        }
        let isDirRec = (product) => {
            for (let rhs of product.rhs) {
                if (rhs[0] === product.lhs) return true
            }
            return false
        }
        for (let product of this.Products) {
            console.log(product)
            if (isDirRec(product)) {
                rm(product)
            }
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

export function testParserGrammar() {
    // console.log(ParserGrammar(example))
    let grammar = ParserGrammar(example)
    grammar.removeDirectLeftRecursion()
    console.log(JSON.stringify(grammar.Products))
}

export function testRemoveDirectLeftRecursion() {
    let grammar = ParserGrammar(example)
    grammar.removeDirectLeftRecursion()
    console.log(grammar.Products)
}
