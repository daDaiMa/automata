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
export default {
  model: {
    prop: "grammar",
    event: "grammarChanged"
  },
  props: {
    grammar: {
      type: Object
    }
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

      // 如果产生式rhs还有的话 就不要删除这产生式
      for (let rhs of this.grammar.products[e].rhs) {
        for (let symbol of rhs.symbols) {
          if (symbol.literal) return;
        }
      }

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
