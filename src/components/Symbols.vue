<template>
  <div class="symbols">
    <div class="spilt-and-symbols" v-for="(symbol,index) in Symbols" v-bind:key="symbol.id">
      <div class="or" v-if="index">⎮</div>
      <div>
        <Kinput
          v-model="symbol.literal"
          @input="inputChanged"
          @tab-key="tabkeyDown"
          @delete-key="deleteDown"
          :id="symbol._id"
          :ref="'input_'+symbol._id"
        ></Kinput>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    symbols: Array
  },
  model: {
    prop: "symbols",
    event: "symbolsChanged"
  },
  data() {
    return {
      Symbols: [...this.$props.symbols]
    };
  },
  components: {
    Kinput: () => import("../components/Kinput")
  },
  methods: {
    tabkeyDown(e) {
      if (e === this.Symbols.length - 1) {
        // this.$emit(
        //   "symbolsChanged",
        //   this.symbols.concat({ literal: "" }).map((item, _id) => {
        //     return { ...item, _id };
        //   })
        // );

        this.$set(
          this,
          "Symbols",
          this.Symbols.concat({ literal: "" }).map((item, _id) => {
            return { ...item, _id };
          })
        );
      }
    },

    deleteDown(e) {
      if (!this.Symbols[e].literal.length && e) {
        this.$refs[`input_${e - 1}`][0].focus();
        // this.$emit('symbolsChanged',this.symbols.filter(item=>{
        //   return item._id !==0
        // }).map((item,_id)=>{return {...item,_id}}))
        this.$set(
          this,
          "Symbols",
          this.Symbols.filter(item => {
            return item._id !== e;
          }).map((item, _id) => {
            return { ...item, _id };
          })
        );
      }
    },
    inputChanged() {
      this.$emit("symbolsChanged", this.Symbols);
    }
  }
};
</script>

<style scoped>
.symbols {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px 0px 10px 0px;
}
.or {
  color: white;
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 2px;
}
.spilt-and-symbols {
  display: flex;
  align-items: center;
  margin: 5px 0px 5px 0px;
}
</style>