
export function conversion(grammar) {
    console.log(JSON.stringify(grammar))
    let res = {
        terminal: grammar.terminal.map(item => { return item.literal }),
        variable: grammar.variable.map(item => { return item.literal }),
        entry: grammar.variable[0].literal, // 第一个变量作为语法的入口
        products: grammar.products.reduce((accumulator,current)=>{
            return accumulator.concat(current.rhs.map(item=>{
                return [current.lhs].concat(item.symbols.map(symbol=>{return symbol.literal}))
            }))
        },[])
    }
    return res 
}