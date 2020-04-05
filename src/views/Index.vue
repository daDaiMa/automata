<template>
  <div>
    <Container>
      <Product v-model="productItem"></Product>
    </Container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productItem: {
        lhs: "",
        rhs: [{ literal: "", _id: 0 }]
      }
    };
  },
  components: {
    Container: () => import("../components/Container"),
    Product: () => import("../components/Product")
  },
  methods: {
    symbolsUpdated(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
</style>