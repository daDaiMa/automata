<template>
  <div class="symbols">
    <slot></slot>
    <div class="spilt-and-symbols" v-for="(symbol,index) in Symbols" v-bind:key="symbol.id">
      <div class="or" v-if="index&&separator!==''">{{separator}}</div>
      <div>
        <Kinput
          v-model="symbol.literal"
          @input="$emit('symbolsChanged',Symbols)"
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
  data() {
    return {
      Symbols: JSON.parse(JSON.stringify(this.$props.symbols))
    };
  },
  components: {
    Kinput: () => import("../components/Kinput")
  },
  methods: {
    focusFirst() {
      this.$refs[`input_0`][0].focus();
    },
    focusLast() {
      this.$refs[`input_${this.Symbols.length - 1}`][0].focus();
    },
    spaceKeyDown(e) {
      let vm = this;
      vm.$set(
        vm,
        "Symbols",
        vm.Symbols.slice(0, e + 1)
          .concat({ literal: "" })
          .concat(vm.Symbols.slice(e + 1))
          .map((item, _id) => {
            return { ...item, _id };
          })
      );
      setTimeout(() => {
        // 加个延迟 确保组件已经更新了
        vm.$refs[`input_${e + 1}`][0].focus();
      }, 100);
    },

    deleteDown(e) {
      if (!this.Symbols[e].literal.length) {
        let vm = this;
        if (e) {
          setTimeout(() => {
            vm.$set(
              vm,
              "Symbols",
              vm.Symbols.filter(item => {
                return item._id !== e;
              }).map((item, _id) => {
                return { ...item, _id };
              })
            );
            vm.$refs[`input_${e - 1}`][0].focus();
          }, 50);
        } else {
          if (this.Symbols.length > 1) {
            setTimeout(() => {
              vm.$set(
                vm,
                "Symbols",
                vm.Symbols.slice(1).map((item, _id) => {
                  return { ...item, _id };
                })
              );
            }, 50);
          } else {
            this.$emit("delete-key", this.id);
          }
        }
      }
      this.$emit("symbolsChanged", this.Symbols);
    }
  }
};
</script>

<style scoped>
.symbols {
  display: flex;
  align-items: center;
  /* margin: 10px 0px 10px 0px; */
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