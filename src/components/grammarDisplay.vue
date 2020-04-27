<template>
  <div class="grammar-box">
    <div class="scroll-box">
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
      <!-- first -->
      <div class="grammar-calcu-box">
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
            <div>
              <product :product="product.product"></product>
            </div>
            <div class="label">: {</div>
            <symbolList :symbolList="product.first"></symbolList>
            <div class="label">}</div>
          </div>
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
.grammar-calcu-box {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.line {
  margin-top: 5px;
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
  .scroll-box {
    overflow-x: scroll;
    // 没实现效果 todo:以后实现
  }
}
</style>