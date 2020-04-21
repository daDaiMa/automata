<template>
  <div class="app">
    <calcu></calcu>
    <paper class="paper"></paper>
  </div>
</template>

<script>
import {testParserGrammar} from '@/automata/grammar'
export default {
  data() {
    return {};
  },
  components: {
    calcu: () => import("../components/calcu"),
    paper: () => import("../components/paper")
  },
  mounted(){
    testParserGrammar()
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.app {
  display: flex;
  justify-content: space-between;
}
.paper{
  flex: 1;
}
</style>
