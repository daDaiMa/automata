<template>
  <div class="container">
    <div class="body">
      <div
        class="separator-symbols-group"
        v-for="(symbols,index) in sym_G"
        v-bind:key="symbols._id"
      >
        <div class="separator" v-if="index">|</div>
        <symbolList :symbolList="symbols.list"></symbolList>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "symbolsGroup",
  props: {
    symbolsGroup: {
      // default: () => [
      //   ["if", "(", "expr", ")", "stmt"],
      //   ["while", "(", "expr", ")"]
      // ],
      type: Array
    }
  },
  computed: {
    sym_G() {
      // console.log('symbolsGroup',this.symbolsGroup)
      let res = this.symbolsGroup.map((item, _id) => {
        return { list: item, _id };
      });
      // console.log('transform symbolsGroup',res)
      return res;
    }
  },
  components: {
    symbolList: () => import("./symbolsDisplay")
  }
};
</script>

<style lang="less" scoped>
.container {
  display: inline-block;
  .body {
    display: flex;
    flex-wrap: wrap;
    .separator-symbols-group {
      display: flex;
      .separator {
        color: whitesmoke;
        font-weight: 900;
        font-size: 18px;
        padding: 5px;
        margin: 0px 2px 0px 2px;
      }
    }
  }
}
</style>