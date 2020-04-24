<template>
  <div class="paper-box">
    <grammarTag :grammar="grammar"></grammarTag>
  </div>
</template>

<script>
import { ParserGrammar } from "../automata/grammar";
export default {
  name: "",
  data() {
    return {
      grammar: {}
    };
  },
  computed: {
    instruction() {
      return this.$store.state.calcuInstruction;
    }
  },
  components: {
    grammarTag: () => import("../components/grammarDisplay")
    // product: () => import("../components/productDisplay")
    // symbolsGroup: () => import("../components/symbolsGroupDisplay")
    // symbolList: () => import("../components/symbolsDisplay")
  },
  watch: {
    instruction() {
      console.log('instruction',JSON.stringify(this.instruction));
      let grammar = ParserGrammar(this.instruction.grammar);
      switch (this.instruction.operation) {
        case "消除左递归":
          grammar.removeLeftRecursion();
          break;
        default:
          break;
      }
      this.$set(this, "grammar", grammar);
    }
  }
};
</script>

<style lang="less" scoped>
.paper-box {
  padding: 5px;
}
</style>