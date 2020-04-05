<template>
  <div>
    <div class="product">
      <div>
        <Kinput v-model="Product.lhs" @input="$emit('productChanged',Product)"></Kinput>
      </div>
      <div class="arrow">
        →
      </div>
      <div>
        <Symbols v-model="Product.rhs" @></Symbols>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'product',
  model: {
    prop: 'product',
    event: 'productChanged'
  },
  props: {
    product:Object,
  },
  data(){
    return {
    Product:this.$props.product
    }
  },
  components: {
    Kinput: () => import("../components/Kinput"),
    Symbols: () => import("../components/Symbols")
  }
};
</script>

<style scoped>
.product {
  display: flex;
  align-items: center;
}
.arrow{
    font-size: 24px;
    margin:0px 10px 0px 10px ;
}
</style>