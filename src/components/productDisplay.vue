<template>
  <div class="product-container">
    <symbolList :symbolList="Product.lhs"></symbolList>
    <div class="arrow">→</div>
    <symbolsGroup :symbolsGroup="Product.rhs"></symbolsGroup>
  </div>
</template>

<script>
export default {
  name:"productDisplay",
  props: {
    product: {
      type: Object,
    }
  },
  computed: {
    Product() {
      return { ...this.product, lhs: [this.product.lhs] };
    }
  },
  components: {
    symbolsGroup: () => import("../components/symbolsGroupDisplay"),
    symbolList: () => import("../components/symbolsDisplay")
  }
};
</script>

<style lang="less" scoped>
.product-container {
  display: flex;
  box-shadow: none;
  .arrow {
    font-size: 18px;
    font-weight: 900;
    padding: 5px;
    color: whitesmoke;
    margin: 0px 2px 0px 2px;
  }
}
</style>