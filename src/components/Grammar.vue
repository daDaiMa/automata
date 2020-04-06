<template>
  <div>
    <Symbols v-model="grammar.terminal" separator=",">
      <h3 class="label">Terminal:</h3>
    </Symbols>
    <Symbols v-model="grammar.variable" separator=",">
      <h3 class="label">Varibale:</h3>
    </Symbols>
    <div v-for="(product,index) in grammar.products" v-bind:key="product._id">
      <Product
        :ref="'product_'+index"
        v-model="grammar.products[index]"
        @enter-key="enterKeyDown"
        @lhs-delete-key="lhsDeleteKeyDown"
        :id="index"
      >
        <div class="indentation">
          <h3 v-if="!index">Products:</h3>
        </div>
      </Product>
    </div>
  </div>
</template>

<script>
import _ from "loadsh";
export default {
  model: {
    prop: "Grammar",
    event: "grammarChanged"
  },
  props: {
    Grammar: {
      type: Object
    }
  },
  data() {
    return {
      grammar: _.isEmpty(this.$props.Grammar)
        ? {
            terminal: [{ literal: "ε", _id: 0 }],
            variable: [{ literal: "S", _id: 0 }],
            products: [
              {
                lhs: "S",
                rhs: [{ symbols: [{ literal: "", _id: 0 }], _id: 0 }],
                _id: 0
              }
            ]
          }
        : JSON.parse(JSON.stringify(this.$props.Grammar))
    };
  },
  watch: {
    grammar: {
      handler: "grammarChanged", // 得这么写 不能写 this.grammarChanged
      immediate: true,
      deep: true
    }
  },
  components: {
    Product: () => import("../components/Product"),
    Symbols: () => import("../components/Symbols")
  },
  methods: {
    grammarChanged() {
      this.$emit("grammarChanged", this.grammar);
    },
    async enterKeyDown(e) {
      let vm = this;
      await this.$nextTick(() => {
        vm.$set(
          vm.grammar,
          "products",
          vm.grammar.products
            .slice(0, e + 1)
            .concat({
              lhs: "",
              rhs: [{ symbols: [{ literal: "", _id: 0 }], _id: 0 }]
            })
            .concat(
              vm.grammar.products.slice(e + 1).map((item, _id) => {
                return { ...item, _id };
              })
            )
        );
      });
      await this.$nextTick(() => {
        vm.$refs[`product_${e + 1}`][0].focusLhs();
      });
    },
    async lhsDeleteKeyDown(e) {
      if (this.grammar.products.length <= 1) {
        return;
      }
      console.log(e);
      let vm = this;
      await this.$nextTick(() => {
        vm.$set(
          vm.grammar,
          "products",
          vm.grammar.products
            .slice(0, e)
            .concat(vm.grammar.products.slice(e + 1))
            .map((item, _id) => {
              return { ...item, _id };
            })
        );
      });
      setTimeout(() => {
        // 发现 如果用 nextTick就是不行 …… 切换focus后会删掉目标的一个字符
        vm.$refs[`product_${e - 1}`][0].focusLhs();
      }, 50);
    }
  }
};
</script>

<style scoped>
.label {
  margin-right: 20px;
}
.indentation {
  width: 80px;
  margin-right: 20px;
}
h3 {
  text-align: left;
}
</style>
