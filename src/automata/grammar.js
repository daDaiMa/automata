import _ from 'loadsh'
import {
    // example_indirect_left_recursion,
    // example_left_common_factor
    // example_first
    // example_nullable
    example_closure
} from '@/grammar-example'
import { TestGrammarOut } from '../store/actions'
import store from '../store'

export const EPSILON = 'ε'
export const END = '$'
function Products(_GrammarProducts) {
    this.Products = {}
    this.ProductsInOrder = []
    /**
     *  this.Products = {
     *      A:[{id,lhs:A,rhs},{id,lhs:A,rhs}]
     *  } 
     */
    this.init = (_products) => {
        let id = 0
        let products = _.cloneDeep(_products)
        if (!Array.isArray(products)) products = [products] // 统一 方便处理
        products.forEach(product => {
            if (!product.rhs.length) return
            if (!Array.isArray(product.rhs[0])) product.rhs = [product.rhs] // 统一 方便处理
            product.rhs.forEach(rhs => {
                if (!this.Products[product.lhs]) this.Products[product.lhs] = []
                let _p = {
                    id,
                    lhs: product.lhs,
                    rhs
                }
                this.Products[product.lhs].push(_p)
                this.ProductsInOrder.push(_p)
                id++
            })
        })
    }
    this.init(_GrammarProducts)
}

function Item(_id = -1, _products = []) {
    this.products = []
    this.table = {}
    this.id = _id
    this.add = product => {
        if (product.id === undefined || product.id < 0) {
            console.error('产生式无id')
            return false
        }
        if (product.readIndex === undefined) {
            console.warn('产生式无readIndex,取默认值0')
        }
        if (this.table[product.id] !== undefined && this.table[product.id][product.readIndex || 0] !== undefined) return false
        this.table[product.id] = this.table[product.id] === undefined ? {} : this.table[product.id]
        this.table[product.id][product.readIndex || 0] = true
        this.products.push({ ...product, readIndex: product.readIndex === undefined ? 0 : product.readIndex })
        return true
    }
    !Array.isArray(_products) && (_products = [_products])
    _products.forEach(product => {
        this.add(product)
    })
    this.compare = (I) => {
        if (I.products.length !== this.products.length) return false
        return _.isEqual(I.table, this.table)
    }
    this.stepForward = (grammar) => {
        let Items = {}
        let count = 0
        this.products.forEach(product => {
            if (product.readIndex === product.rhs.length) {
                grammar.Terminal.forEach(terminal => {
                    // 计算LR(0) 陈火旺版本对所有的terminal都做r处理（如果有s处理 则不覆盖 保留s
                    // 更精确的做法是 只有 Follow(product.lhs) 才做r处理
                    if (grammar.ACTION[this.id] === undefined) grammar.ACTION[this.id] = {}
                    if (grammar.ACTION[this.id][terminal] === undefined) grammar.ACTION[this.id][terminal] = `r${product.id}`
                })
                return
            }
            let curr = product.rhs[product.readIndex]
            if (Items[curr] === undefined) {
                Items[curr] = new Item(count + grammar.I.length)
                count++
            }
            Items[curr].add({ ...product, readIndex: product.readIndex + 1 })
        })
        let res = []
        let fillTable = (symbol, state) => {
            if (grammar.Terminal.includes(symbol)) {
                if (grammar.ACTION[this.id] === undefined) grammar.ACTION[this.id] = {}
                grammar.ACTION[this.id][symbol] = symbol === END ? 'acc' : `s${state}`
            } else if (grammar.Variables.includes(symbol)) {
                if (grammar.GOTO[this.id] === undefined) grammar.GOTO[this.id] = {}
                grammar.GOTO[this.id][symbol] = `${state}`
            } else {
                console.error('unkonw symbols');
            }
        }
        Object.keys(Items).forEach(key => {
            Items[key].closure(grammar)
            for (let _I of grammar.I) {
                if (_I.compare(Items[key])) {
                    fillTable(key, _I.id)
                    return
                }
            }
            Items[key].id = grammar.I.length
            fillTable(key, Items[key].id)
            grammar.I.push(Items[key])
            res.push(Items[key])
        })
        return res
    }
    this.closure = (grammar) => {
        let changed = true
        while (changed) {
            changed = false
            this.products.forEach(product => {
                if (product.readIndex === product.rhs.length) return // 读取的符号(.) 已经在产生式rhs的最右端了
                let next = product.rhs[product.readIndex]
                if (grammar.Terminal.includes(next)) return // terminal 不管
                if (!grammar.Variables.includes(next)) {
                    console.error('非法符号', next)
                    return
                }
                grammar.SingleProduct.Products[next].forEach(sp => {
                    if (this.table[sp.id] && this.table[sp.id][sp.readIndex]) return
                    changed = this.add({ ...sp, readIndex: 0 })
                })
            })
        }
    }
}

function Grammar() {
    this.Terminal = []
    this.Variables = []
    this.Products = []
    this.SingleProduct = null // 单个产生式 非连写 === !(A--->B|C) ===> [A--->B,A--->C]
    this.ProductFirst = [] // todo:把这个融合到SingleProduct中去 
    this.first = {}
    this.follow = {}
    this.LL1 = {}
    this.ACTION = {}
    this.GOTO = {}
    this.nullable = new Set()
    this.I = []
    this.Entry = null
    const NewVariable = (variable) => {
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
    const findLeftCommonFactor = (product) => {
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
    this.calcuNullable = () => {
        let setChange = true
        while (setChange) {
            setChange = false
            for (const p of this.Products) {
                if (this.nullable.has(p.lhs)) continue
                for (const rhs of p.rhs) {
                    if (rhs.length === 0 || rhs.length === 1 && rhs[0] === EPSILON) {
                        this.nullable.add(p.lhs)
                        setChange = true
                        break
                    }
                    let idx = 0
                    for (idx = 0; idx < rhs.length; idx++) {
                        let symbol = rhs[idx]
                        if (!this.Variables.includes(symbol) || !this.nullable.has(symbol))
                            break
                    }
                    if (idx === rhs.length) {
                        this.nullable.add(p.lhs)
                        setChange = true
                        break
                    }
                }
            }
        }
    }
    this.calcuFirst = () => {
        let setChange = true
        let productMap = {}
        this.calcuNullable()
        for (const v of this.Variables) {
            this.first[v] = new Set()
            productMap[v] = this.Products.filter(p => p.lhs === v)
            productMap[v] = productMap[v].length ? productMap[v][0] : null
        }
        while (setChange) {
            setChange = false
            for (const v of this.Variables) {
                let rhsGroup = productMap[v] ? productMap[v].rhs : null
                if (!rhsGroup) continue
                for (const rhs of rhsGroup) {
                    // 1.terminal 
                    if (this.Terminal.includes(rhs[0]) && !this.first[v].has(rhs[0]) && rhs[0] !== EPSILON) {
                        this.first[v].add(rhs[0])
                        setChange = true
                    }
                    // 2.variable处理
                    for (const symbol of rhs) {
                        for (let item of this.first[symbol] || []) {
                            if (!this.first[v].has(item)) {
                                this.first[v].add(item)
                                setChange = true
                            }
                        }
                        if (!this.nullable.has(symbol)) break
                    }
                }
            }
        }
    }
    this.calcuFollow = () => {
        let setChange = true
        this.calcuNullable()
        this.calcuFirst()
        for (const variable of this.Variables) this.follow[variable] = new Set()
        while (setChange) {
            setChange = false
            for (const p of this.Products) {
                for (const rhs of p.rhs) {
                    let tmp = this.follow[p.lhs] || new Set()
                    for (let index = rhs.length - 1; index >= 0; index--) {
                        let currsymbol = rhs[index]
                        if (this.Terminal.includes(currsymbol)) {
                            tmp = new Set([currsymbol])
                        } else if (this.Variables.includes(currsymbol)) {
                            let ori_size = this.follow[currsymbol].size
                            for (const follow of tmp) {
                                this.follow[currsymbol].add(follow)
                            }
                            if (ori_size !== this.follow[currsymbol].size)
                                setChange = true
                            if (this.nullable.has(currsymbol)) {
                                for (const first of this.first[currsymbol]) tmp.add(first)
                            } else {
                                tmp = this.first[currsymbol]
                            }
                        }
                    }
                }
            }
        }
    }

    /***
     * 计算单个产生式的FIRST eg. p -> ⍺ 
     * 注意😯是 单！个！
     * 其实就是计算产生式rhs(右部)串的FIRST啦 
     * 计算这个主要是为了制作LL(1)预测表
     */
    this.calcuProductFisrt = () => {
        let res = []
        let id = 0
        this.calcuFollow()
        for (const product of this.Products) {
            for (const rhs of product.rhs) {
                let single = {
                    id,
                    first: new Set(),
                    product: { lhs: product.lhs, rhs: rhs }
                }
                let productNullable = true
                for (const symbol of rhs) {
                    if (this.Terminal.includes(symbol)) {
                        productNullable = false
                        symbol !== EPSILON && single.first.add(symbol)
                        symbol === EPSILON && (productNullable = true)
                        break
                    }
                    for (const first of this.first[symbol] || []) single.first.add(first)
                    if (!this.nullable.has(symbol)) {
                        productNullable = false
                        break
                    }
                }
                if (productNullable)
                    for (const follow of this.follow[product.lhs]) single.first.add(follow)
                id++
                // 数据处理 方便展示
                single.product.rhs = [single.product.rhs]
                single.first = Array.from(single.first).sort()
                res.push(single)
            }
        }
        this.ProductFirst = res
    }
    this.calcuLL1 = () => {
        // 依赖
        this.calcuProductFisrt()
        // 初始化
        this.LL1 = {}
        this.Variables.forEach(variable => {
            this.LL1[variable] = {}
            this.Terminal.forEach(terminal => {
                this.LL1[variable][terminal] = []
            })
        })
        // 开始计算
        this.ProductFirst.forEach(product => {
            product.first.forEach(terminal => {
                this.LL1[product.product.lhs][terminal] =
                    this.LL1[product.product.lhs][terminal].concat(product.id)
            })
        })
    }

    this.cacluItem = () => {
        // 准备工作
        this.Products.unshift({
            lhs: `${this.Entry}⬆️`,
            rhs: [[this.Entry, END]],
        })
        this.Variables.unshift(`${this.Entry}⬆️`)
        this.Terminal.push(END)
        this.SingleProduct = new Products(this.Products)
        this.I = [
            new Item(0, this.SingleProduct.Products[`${this.Entry}⬆️`])
        ]
        this.I[0].closure(this)
        let queue = [...this.I]
        while (queue.length) {
            let I = queue.shift()
            let newI = I.stepForward(this)
            Object.keys(newI).forEach(key => {
                queue.push(newI[key])
            })
        }
    }

    this.format = () => {
        for (const key of this.Variables) {
            this.first[key] && (this.first[key] = Array.from(this.first[key]).sort())
            this.follow[key] && (this.follow[key] = Array.from(this.follow[key]).sort())
        }
        this.nullable = Array.from(this.nullable).sort()
    }
}
export function ParserGrammar(inputGrammar) {
    let grammar = new Grammar()
    inputGrammar = _.cloneDeep(inputGrammar)
    grammar.Terminal = inputGrammar.terminal.map(item => item.literal)
    grammar.Variables = inputGrammar.variable.map(item => item.literal)
    grammar.Entry = grammar.Variables[0]
    // :todo 处理一下lhs相同的产生式 然后合并
    // :todo 在合适的地方(不一定要在这里) 做一些语法合法性的检测
    // :其实这个函数主要是转换，  从 用户输入 ===> 方便处理的语法
    grammar.Products = inputGrammar.products.map(item => {
        return {
            lhs: item.lhs,
            rhs: item.rhs.map(rhs => {
                return rhs.symbols.map(sym => sym.literal)
            })
        }
    })
    return grammar
}
export function RunGrammarTest() {
    let grammar = ParserGrammar(example_closure)
    // grammar.extracLeftCommonFactor()
    // grammar.calcuFollow()
    // grammar.calcuProductFisrt()
    // grammar.calcuLL1()
    grammar.cacluItem()
    // grammar.calcuNullable()
    // stringify 不能直接处理set
    // console.log('[TEST LOG]:', JSON.stringify(grammar))
    grammar.format()
    console.log('[TEST LOG]:', grammar)
    TestGrammarOut(store, grammar)
}

