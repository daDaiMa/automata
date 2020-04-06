<template>
  <div>
    <Container>
      <Symbols v-model="terminal" separator=",">
        <h3 class="label">Terminal:</h3>
      </Symbols>
      <Symbols v-model="variable" separator=",">
        <h3 class="label">Varibale:</h3>
      </Symbols>
      <Product v-model="productItem"></Product>
    </Container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productItem: {
        lhs: "S",
        rhs: [{ symbols: [{ literal: "", _id: 0 }], _id: 0 }]
      },
      terminal: [{ literal: "ε", _id: 0 }],
      variable: [{ literal: "S", _id: 0 }]
    };
  },
  components: {
    Container: () => import("../components/Container"),
    Product: () => import("../components/Product"),
    Symbols: () => import("../components/Symbols")
  },
  methods: {
    symbolsUpdated(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
.label{
  margin-right: 20px;
}
</style>
