<template>
  <div class="container">
    <symbolList :symbolList="Product.lhs"></symbolList>
    <div class="arrow">→</div>
    <symbolsGroup :symbolsGroup="Product.rhs"></symbolsGroup>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    //   default: () => {
    //     return { lhs: "A2", rhs: [["A3", "A1"], ["b"]] };
    //   }
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
.container {
  display: flex;
  .arrow {
    font-size: 18px;
    font-weight: 900;
    padding: 5px;
    color: whitesmoke;
    margin: 0px 2px 0px 2px;
  }
}
</style>