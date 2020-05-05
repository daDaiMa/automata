<template>
  <div>
    <div class="title">{{title}}</div>
    <table>
      <th v-for="header in headers" v-bind:key="header">{{header}}</th>
      <tr v-for="(data,index) in tabledata" v-bind:key="index">
        <td v-for="(value,key,index) in data" v-bind:key="key">{{data[headers[index]]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "autotable",
  props: ["title", "headers", "tabledata"],
  methods: {}
};
</script>

<style lang="less" scoped>
.title {
  padding: 5px;
  font-size: 18px;
  font-weight: 900;
  text-align: left;
  // height: 35px;
  box-sizing: border-box;
  padding: 5px;
  font-size: 18px;
  font-weight: 900;
  text-align: left;
  // height: 35px;
  box-sizing: border-box;
}
table {
  // border: 1px solid whitesmoke;
  font-size: 18px;
  font-weight: 900;
  tr > :first-child {
    background: whitesmoke;
  }
  td {
    border: 2px solid whitesmoke;
    border-radius: 5px;
    padding: 5px;
  }
  th:first-child {
    background: none;
  }
  th {
    background: whitesmoke;
    border-radius: 5px;
    border: 2px solid whitesmoke;
    padding: 5px;
  }
}
</style>