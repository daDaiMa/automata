<template>
  <div class="paper-box">
    <grammarTag :grammar="grammar"></grammarTag>
  </div>
</template>

<script>
import { ParserGrammar, RunGrammarTest } from "../automata/grammar";
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
    },
    testGrammar() {
      return this.$store.state.testGrammar;
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
      console.log("instruction", JSON.stringify(this.instruction));
      let grammar = ParserGrammar(this.instruction.grammar);
      switch (this.instruction.operation) {
        case "消除左递归":
          grammar.removeLeftRecursion();
          break;
        case "提取左公因子":
          grammar.extracLeftCommonFactor();
          break;
        default:
          break;
      }
      this.$set(this, "grammar", grammar);
    },
    testGrammar(curr) {
      this.$set(this, "grammar", curr);
    }
  },
  mounted() {
    RunGrammarTest();
  }
};
</script>

<style lang="less" scoped>
.paper-box {
  padding: 5px;
}
</style>