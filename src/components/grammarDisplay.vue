<template>
  <div class="grammar-box">
    <div class="grammar-calcu-box">
      <div>
        <!-- 终止符 -->
        <div class="label-and-content">
          <div class="label">Terminal:</div>
          <symbolList :symbolList="Grammar.Terminal"></symbolList>
        </div>
        <!-- 变量 -->
        <div class="label-and-content">
          <div class="label">Variable:</div>
          <symbolList class="line" :symbolList="Grammar.Variables"></symbolList>
        </div>
        <!-- 产生式 -->
        <div class="label-and-content">
          <div class="label product-label">Products:</div>
          <div>
            <div class="line" v-for="product in Grammar.Products" v-bind:key="product._id">
              <product :product="product.product"></product>
            </div>
          </div>
        </div>
        <button class="copy-to-calcu" @click="copy2calcu">拷贝到计算器</button>
      </div>
      <!-- first -->
      <div v-if="Object.keys(Grammar.first).length">
        <div class="first-label">FIRST</div>
        <div
          class="label-and-content line"
          v-for="variable in Grammar.Variables"
          v-bind:key="variable"
        >
          <div class="label">{{variable}}: {</div>
          <symbolList :symbolList="Grammar.first[variable]"></symbolList>
          <div class="label">}</div>
        </div>
      </div>
      <!-- follow -->
      <div v-if="Object.keys(Grammar.follow).length">
        <div class="first-label">FOLLOW</div>
        <div
          class="label-and-content line"
          v-for="variable in Grammar.Variables"
          v-bind:key="variable"
        >
          <div class="label">{{variable}}: {</div>
          <symbolList :symbolList="Grammar.follow[variable]"></symbolList>
          <div class="label">}</div>
        </div>
      </div>
      <!-- product first -->
      <div v-if="Object.keys(Grammar.ProductFirst).length">
        <div class="label">Product FIRST</div>
        <div
          class="label-and-content line"
          v-for="product in Grammar.ProductFirst"
          v-bind:key="product.id"
        >
          <div class="product-id">{{product.id}}</div>
          <div>
            <product :product="product.product"></product>
          </div>
          <div class="label">: {</div>
          <symbolList :symbolList="product.first"></symbolList>
          <div class="label">}</div>
        </div>
      </div>
      <div v-if="Object.keys(Grammar.LL1).length">
        <div class="label">LL(1) Table</div>
        <table class="ll1-table">
          <th v-for="terminal in ['',...Grammar.Terminal]" v-bind:key="terminal">{{terminal}}</th>
          <tr v-for=" variable in Grammar.Variables" v-bind:key="variable">
            <td>{{variable}}</td>
            <td
              v-for="terminal in Grammar.Terminal"
              v-bind:key="terminal"
            >{{Grammar.LL1[variable][terminal].join()}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="Grammar.SingleProduct">
      <div class="label">Product Identify</div>
      <div class="single-product-box">
        <div
          class="label-and-content line item"
          v-for="product in Grammar.SingleProduct.ProductsInOrder"
          v-bind:key="product.id"
        >
          <div class="product-id">{{product.id}}</div>
          <div>
            <product :product="product"></product>
          </div>
        </div>
      </div>
    </div>
    <div v-if="Grammar.I&&Grammar.I.length">
      <div class="label">项集族</div>
      <div class="Items-box">
        <div v-for="I in Grammar.I" v-bind:key="I.id" class="item">
          <closure :closure="I"></closure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "loadsh";
import { SendGrammarToCalcu } from "@/store/actions";
export default {
  name: "grammarDisplay",

  props: {
    grammar: {
      type: Object
    }
  },
  computed: {
    Grammar() {
      if (
        !this.grammar ||
        !this.grammar.Products ||
        !this.grammar.Terminal ||
        !this.grammar.Variables
      ) {
        return {
          Terminal: [],
          Variables: [],
          Products: []
        };
      }
      return {
        ...this.grammar,
        Products: this.grammar.Products.map((product, _id) => {
          return { _id, product };
        })
      };
    }
  },
  components: {
    symbolList: () => import("../components/symbolsDisplay"),
    product: () => import("../components/productDisplay"),
    closure: () => import("../components/closureDisPlay")
  },
  methods: {
    copy2calcu() {
      let g = {
        terminal: _.cloneDeep(this.Grammar.Terminal).map((literal, _id) => {
          return {
            _id,
            literal
          };
        }),
        variable: _.cloneDeep(this.Grammar.Variables).map((literal, _id) => {
          return {
            _id,
            literal
          };
        }),
        products: _.cloneDeep(this.Grammar.Products).map((product, _id) => {
          console.log(product);
          return {
            _id,
            lhs: product.product.lhs,
            rhs: product.product.rhs.map((rhs, _id) => {
              return {
                _id,
                symbols: rhs.map((literal, _id) => {
                  return { _id, literal };
                })
              };
            })
          };
        })
      };
      SendGrammarToCalcu(this.$store, g);
    }
  }
};
</script>

<style lang="less" scoped>
.ll1-table {
  // border: 1px solid whitesmoke;
  font-size: 18px;
  font-weight: 900;
  tr > :first-child {
    background: whitesmoke;
  }
  td {
    border: 2px solid whitesmoke;
    border-radius: 5px;
    padding: 5px;
  }
  th:first-child {
    background: none;
  }
  th {
    background: whitesmoke;
    border-radius: 5px;
    border: 2px solid whitesmoke;
    padding: 5px;
  }
}
.grammar-calcu-box {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.line {
  margin-top: 5px;
}
.product-id {
  height: 22px;
  border-radius: 22px;
  min-width: 22px;
  font-size: 18px;
  font-weight: 900;
  background: whitesmoke;
  // line-height: 22px;
  text-align: center;
  margin-right: 5px;
  box-sizing: border-box;
}
.label {
  padding: 5px;
  font-size: 18px;
  font-weight: 900;
  text-align: left;
  // height: 35px;
  box-sizing: border-box;
}
.label-and-content {
  display: flex;
  align-items: center;
  .product-label {
    align-self: start;
  }
}
.first-label {
  .label();
  // font-weight: 900;
  text-align: left;
}
.grammar-box {
  padding: 5px;
  box-shadow: 0 0px 3px rgba(218, 220, 224, 0.8);
  border-radius: 5px;
}
.disable-selection {
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer */
  -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
  -webkit-user-select: none; /* Chrome, Safari, and Opera */
  -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
}
.copy-to-calcu {
  background: whitesmoke;
  border-radius: 5px;
  margin: 15px auto;
  font-weight: 900;
  font-size: 18px;
  width: 140px;
  .disable-selection();
}
.Items-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    margin: 1px;
  }
}

.single-product-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    margin: 3px;
    border: 1px dotted whitesmoke;
    padding: 2px;
    border-radius: 2px;
  }
}
</style>