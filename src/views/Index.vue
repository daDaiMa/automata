<template>
  <div>
    <Container>
      <Grammar v-model="grammar"></Grammar>
    </Container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grammar: {}
    };
  },
  components: {
    Container: () => import("../components/Container"),
    Grammar: () => import("../components/Grammar")
  },
  methods: {}
};
</script>

<style scoped>
</style>
