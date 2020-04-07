<template>
  <div class="symbols">
    <slot></slot>
    <div class="spilt-and-symbols" v-for="(symbol,index) in symbols" v-bind:key="symbol.id">
      <div class="or" v-if="index&&separator!==''">{{separator}}</div>
      <div>
        <Kinput
          v-model="symbol.literal"
          @input="$emit('symbolsChanged',symbols)"
          @tab-key="$emit('tab-key',id)"
          @space-key="spaceKeyDown"
          @enter-key="$emit('enter-key',id)"
          @delete-key="deleteDown"
          :id="symbol._id"
          :ref="'input_'+symbol._id"
        ></Kinput>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "loadsh";
export default {
  props: {
    symbols: Array,
    id: Number,
    separator: {
      default: "",
      type: String
    }
  },
  model: {
    prop: "symbols",
    event: "symbolsChanged"
  },
  components: {
    Kinput: () => import("../components/Kinput")
  },
  methods: {
    focusFirst() {
      this.$refs[`input_0`][0].focus();
    },
    focusLast() {
      this.$refs[`input_${this.symbols.length - 1}`][0].focus();
    },
    spaceKeyDown(e) {
      let vm = this;
      this.$emit(
        "symbolsChanged",
        vm.symbols
          .slice(0, e + 1)
          .concat({ literal: "" })
          .concat(vm.symbols.slice(e + 1))
          .map((item, _id) => {
            return { ...item, _id };
          })
      );

      setTimeout(() => {
        // 加个延迟 确保组件ref已经更新了
        vm.$refs[`input_${e + 1}`][0].focus();
      }, 50);
    },

    async deleteDown(e, event) {
      if (!this.symbols[e].literal) {
        event.preventDefault();
        let vm = this;
        if (e) {
          let newSymbols = _.cloneDeep(vm.symbols);
          vm.$emit(
            "symbolsChanged",
            newSymbols
              .filter(item => {
                return item._id !== e;
              })
              .map((item, _id) => {
                return { ...item, _id };
              })
          );
          vm.$refs[`input_${e - 1}`][0].focus();
        } else {
          if (this.symbols.length > 1) {
            this.$emit(
              "symbolsChanged",
              vm.symbols.slice(1).map((item, _id) => {
                return { ...item, _id };
              })
            );
          } else {
            this.$emit("delete-key", this.id);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.symbols {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.or {
  color: white;
  font-size: 25px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 2px;
}
.spilt-and-symbols {
  display: flex;
  align-items: center;
  margin: 5px 0px 5px 0px;
}
</style>