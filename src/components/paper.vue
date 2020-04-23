<template>
  <div>hello</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    instruction() {
      return this.$store.state.calcuInstruction;
    }
  },
  watch: {
    instruction() {
      console.log(JSON.stringify(this.instruction));
    }
  }
};
</script>

<style lang="less" scoped>
</style>