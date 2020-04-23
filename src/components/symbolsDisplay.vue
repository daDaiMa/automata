<template>
  <div class="container">
    <div class="body">
      <div v-for="symbol in symbols" v-bind:key="symbol._id" class="symbol-box">{{symbol.literal}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "symbolsDisplay",
  props: {
    symbolList: {
      // default: () => ["if", "(", "expr", ")", "stmt"],
      type: Array
    }
  },
  computed: {
    symbols() {
      console.log(this.symbolList)
      let res = this.symbolList.map((symbol, _id) => {
        return { _id, literal: symbol };
      });
      console.log('fuck',res)
      return res;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  display: inline-block;
  .body {
    display: flex;
    flex-wrap: wrap;
    //   background: brown;
    width: auto;
    padding: 0px;
    margin: 0px;
    div:first-child {
      margin-left: 0px;
    }
    .symbol-box {
      background: whitesmoke;
      font-weight: 900;
      font-size: 18px;
      padding: 5px;
      margin-left: 2px;
      border-radius: 5px;
    }
  }
}
</style>