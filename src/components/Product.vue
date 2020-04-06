<template>
  <div>
    <div class="product">
      <slot></slot>
      <div>
        <Kinput
          ref="lhs"
          v-model="product.lhs"
          @input="$emit('productChanged',product)" 
          @delete-key="lhsDeleteKeyDown"
        ></Kinput>
      </div>
      <div class="arrow">→</div>
      <div v-for="(rhs,index) in product.rhs" v-bind:key="rhs._id" class="spilt-and-symbols">
        <div class="or" v-if="index">⎮</div>
        <Symbols
          :ref="'symbols_'+rhs._id"
          v-model="rhs.symbols"
          @tab-key="tabKeyDown"
          @delete-key="deleteKeyDown"
          @enter-key="$emit('enter-key',id)"
          @input="$emit(modelEvent,product)"
          :id="rhs._id"
        ></Symbols>
      </div>
    </div>
  </div>
</template>

<script>
const modelEvent = "productChanged";  // html中直接用好像不行，会出错
export default {
  name: "product",
  model: {
    prop: "product",
    event: modelEvent
  },
  props: {
    product: Object,
    id: Number
  },
  components: {
    Kinput: () => import("../components/Kinput"),
    Symbols: () => import("../components/Symbols")
  },
  data(){
    return {
      eventName:{
        productChanged:'productChanged' // todo  把所有的事件挪到一起统一管理 
      }
    }
  },
  methods: {
    focusLhs() {
      this.$refs.lhs.focus();
    },
    foucusRhs() {
      this.$refs["symbols_0"].focusFirst();
    },
    tabKeyDown(e) {
      if (e + 1 === this.product.rhs.length) {
        let vm = this;
        let newProduct = this.product;
        newProduct.rhs = newProduct.rhs
          .concat({ symbols: [{ literal: "", _id: 0 }] })
          .map((item, _id) => {
            return { ...item, _id };
          });
        this.$emit(modelEvent, newProduct);
        setTimeout(() => {
          vm.$refs[`symbols_${e + 1}`][0].focusFirst();
        }, 50);
      }
    },
    async deleteKeyDown(e) {
      let vm = this;
      if (!e) {
        setTimeout(() => {
          vm.$refs.lhs.focus();
        }, 50);
        return;
      }

      let newProduct = this.product;
      newProduct.rhs = newProduct.rhs
        .slice(0, e)
        .concat(newProduct.rhs.slice(e + 1));
      this.$emit(modelEvent, newProduct);
      setTimeout(() => {
        vm.$refs[`symbols_${e - 1}`][0].focusLast();
      }, 50);
    },

    lhsDeleteKeyDown() {
      if (!this.product.lhs.length) {
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