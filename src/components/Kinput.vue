<template>
  <div class="wrapper">
    <input
      v-bind:value="value"
      ref="input"
      @keydown.tab="$emit('tab-key',id)"
      @keydown.delete="$emit('delete-key',id)"
      v-on:input="$emit('input',$event.target.value)"
      v-autowidth="{maxWidth: '960px', minWidth: '10px', comfortZone: 0}"
    />
  </div>
</template>

<script>
export default {
  props: ["value", "id"],
  computed: {},
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style scoped>
input {
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-weight: 900;
  height: 24px;
  padding: 5px;
  color: black;
  box-sizing: border-box;
  font-size: 18px;
  font-stretch: expanded;
  justify-self: center;
}
.wrapper {
  display: flex;
  width: auto;
  position: relative;
  align-items: center;
}
</style>