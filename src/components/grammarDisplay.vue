<template>
  <div class="grammar-box">
    <div class="label-and-content">
      <div class="label">Terminal:</div>
      <symbolList :symbolList="Grammar.Terminal"></symbolList>
    </div>
    <div class="label-and-content">
      <div class="label">Variable:</div>
      <symbolList class="line" :symbolList="Grammar.Variables"></symbolList>
    </div>
    <div class="label-and-content">
      <div class="label product-label">Products:</div>
      <div>
        <div class="line" v-for="product in Grammar.Products" v-bind:key="product._id">
          <product :product="product.product"></product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    product: () => import("../components/productDisplay")
  }
};
</script>

<style lang="less" scoped>
.line {
  margin-top: 5px;
}
.label-and-content {
  display: flex;
  align-items: center;
  .label {
    padding: 5px;
    font-size: 18px;
    font-weight: 900;
    // height: 35px;
    box-sizing: border-box;
  }
  .product-label {
    align-self: start;
  }
}
.grammar-box {
  padding: 5px;
  box-shadow: 0 0px 3px rgba(218, 220, 224, 0.8);
  border-radius: 5px;
}
</style>