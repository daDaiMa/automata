<template>
  <div class="closure-box">
    <div class="closure-header">I-{{closure.id}}</div>
    <div
      v-for="product in closure.products"
      v-bind:key="`${product.id}-${product.readIndex}`"
      style="margin-top:5px"
    >
      <div style="display:flex">
        <symbols :symbolList="[product.lhs]"></symbols>
        <div class="arrow">
          <span>→</span>
        </div>
        <symbols :symbolList="product.rhs" :readIndex="product.readIndex"></symbols>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "closureDisplay",
  props: {
    closure: {
      type: Object
    }
  },
  components: {
    symbols: () => import("@/components/symbolsDisplay")
  }
};
</script>

<style lang="less" scoped>
.arrow {
  display: flex;
  align-items: center;
  color: whitesmoke;
  margin-left: 4px;
}
.closure-box {
  padding: 5px;
  border-radius: 5px;
  border: 1px dotted whitesmoke;
}

.closure-header {
  font-weight: 900;
}
</style>