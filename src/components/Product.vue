<template>
  <div>
    <div class="product">
      <slot></slot>
      <div>
        <Kinput
          ref="lhs"
          v-model="Product.lhs"
          @input="$emit('productChanged',Product)"
          @delete-key="lhsDeleteKeyDown"
        ></Kinput>
      </div>
      <div class="arrow">→</div>
      <div v-for="(rhs,index) in Product.rhs" v-bind:key="rhs._id" class="spilt-and-symbols">
        <div class="or" v-if="index">⎮</div>
        <Symbols
          :ref="'symbols_'+rhs._id"
          v-model="rhs.symbols"
          @tab-key="tabKeyDown"
          @delete-key="deleteKeyDown"
          @enter-key="$emit('enter-key',id)"
          @input="$emit('productChanged',Product)"
          :id="rhs._id"
        ></Symbols>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  model: {
    prop: "product",
    event: "productChanged"
  },
  props: {
    product: Object,
    id: Number
  },
  data() {
    return {
      Product: JSON.parse(JSON.stringify(this.$props.product))
    };
  },
  components: {
    Kinput: () => import("../components/Kinput"),
    Symbols: () => import("../components/Symbols")
  },
  methods: {
    focusLhs() {
      this.$refs.lhs.focus();
    },
    foucusRhs() {
      this.$refs["symbols_0"].focusFirst();
    },
    tabKeyDown(e) {
      if (e + 1 === this.Product.rhs.length) {
        this.$set(
          this.Product,
          "rhs",
          this.Product.rhs
            .concat({ symbols: [{ literal: "", _id: 0 }] })
            .map((item, _id) => {
              return { ...item, _id };
            })
        );
        let vm = this;
        setTimeout(() => {
          console.log(vm.$refs);
          vm.$refs[`symbols_${e + 1}`][0].focusFirst();
        }, 100);
      }
    },
    deleteKeyDown(e) {
      let vm = this;
      if (!e) {
        setTimeout(() => {
          vm.$refs.lhs.focus();
        }, 50);
        return;
      }
      setTimeout(() => {
        vm.$set(
          vm.Product,
          "rhs",
          vm.Product.rhs.slice(0, e).concat(vm.Product.rhs.slice(e + 1))
        );
        vm.$refs[`symbols_${e - 1}`][0].focusLast();
      }, 50);
    },
    lhsDeleteKeyDown() {
      if (!this.Product.lhs.length) {
        this.$emit("lhs-delete-key", this.id);
      }
    }
  }
};
</script>

<style scoped>
.product {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.arrow {
  font-size: 24px;
  margin: 0px 10px 0px 10px;
}
.spilt-and-symbols {
  display: flex;
  align-items: center;
  margin: 5px 0px 5px 0px;
}

.or {
  color: white;
  font-size: 25px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 2px;
}
</style>