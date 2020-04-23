<template>
  <div class="app">
    <calcu></calcu>
    <paper class="paper"></paper>
  </div>
</template>

<script>
import { testGrammar } from "@/automata/grammar";
export default {
  data() {
    return {};
  },
  components: {
    calcu: () => import("../components/calcu"),
    paper: () => import("../components/paper")
  },
  computed: {
    instruction() {
      return this.$store.state.calcuInstruction;
    }
  },
  watch: {
    instruction(){
      console.log(this.instruction)
    }
  },
  mounted() {
    testGrammar();
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.app {
  display: flex;
  justify-content: space-between;
}
.paper {
  flex: 1;
}
</style>
