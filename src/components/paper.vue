<template>
  <div class="paper-box">
    <grammarTag :grammar="grammar"></grammarTag>
  </div>
</template>

<script>
// import { ParserGrammar } from "../automata/grammar";
export default {
  name: "",
  data() {
    return {
      grammar: {
        Terminal: ["ε", "a", "b"],
        Variables: ["A1", "A2", "A3", "A3-0"],
        Products: [
          { lhs: "A1", rhs: [["A2", "A3"]] },
          { lhs: "A2", rhs: [["A3", "A1"], ["b"]] },
          {
            lhs: "A3",
            rhs: [
              ["a", "A3-0"],
              ["b", "A3", "A1", "A3-0"]
            ]
          },
          { lhs: "A3-0", rhs: [["A1", "A3", "A1", "A3-0"], ["ε"]] }
        ],
        Entry: "A1"
      }
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
      console.log(JSON.stringify(this.instruction));
      // let g = ParserGrammar(this.instruction);
    }
  }
};
</script>

<style lang="less" scoped>
.paper-box {
  padding: 5px;
}
</style>