<template>
  <div class="symbols-container">
    <div class="body">
      <div v-for="(symbol ,index) in symbols" v-bind:key="symbol._id">
        <div style="display:flex;margin-left:2px">
          <div v-if="index===readIndex" class="dot-flag">🌕</div>
          <div class="symbol-box">{{symbol.literal}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "symbolsDisplay",
  props: {
    symbolList: {
      type: Array
    },
    readIndex: {
      type: Number,
      default: -1
    }
  },
  computed: {
    symbols() {
      return this.symbolList.map((symbol, _id) => {
        if (symbol) return { _id, literal: symbol };
      });
    }
  }
};
</script>
<style lang="less" scoped>
.dot-flag {
  padding: 2px;
  display: flex;
  align-items: center;
}
.symbols-container {
  display: inline-block;
  box-shadow: none;
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