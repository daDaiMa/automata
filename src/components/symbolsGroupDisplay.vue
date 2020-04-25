<template>
  <div class="container">
    <div class="body">
      <div
        class="separator-symbols-group"
        v-for="(symbols,index) in sym_G"
        v-bind:key="symbols._id"
      >
        <div class="separator" v-if="index&&symbols.list.length">|</div>
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
      type: Array
    }
  },
  computed: {
    sym_G() {
      return this.symbolsGroup.map((item, _id) => {
        return { list: item.filter(i => i), _id };
      });
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