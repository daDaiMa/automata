<template>
  <div style="width:800px;margin:auto">
    <Container>
      <div class="screen">
        <div class="status-bar">
          <div class="status-item">{{timestamp}}</div>
          <div class="status-item">🔋100%</div>
        </div>
        <Grammar v-model="grammar"></Grammar>
      </div>
      <div>
        <div class="key-board">
          <div class="other-key">
              <div class="key-common">
                ε
              </div>
              <div class="key-common">
                消除左递归
              </div>
              <div class="key-common">
                提取左公因式
              </div>
              <div class="key-common">
                FIRST 
              </div>
              <div class="key-common">
                FOLLOW 
              </div>
          </div>
          <div>
          <div class="clear disable-selection" @click="clearGrammar">
            <div style="width:100%">归零</div>
          </div>
          <div class="action">=</div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
const defaultGrammar = {
  terminal: [{ literal: "ε", _id: 0 }],
  variable: [{ literal: "S", _id: 0 }],
  products: [
    {
      lhs: "S",
      rhs: [{ symbols: [{ literal: "", _id: 0 }], _id: 0 }],
      _id: 0
    }
  ]
};
import _ from "loadsh";
export default {
  data() {
    return {
      grammar: _.cloneDeep(defaultGrammar),
      timestamp: ""
    };
  },
  components: {
    Container: () => import("../components/Container"),
    Grammar: () => import("../components/Grammar")
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    clearGrammar() {
      console.log("clicked");
      this.$set(this, "grammar", _.cloneDeep(defaultGrammar));
    },
    getNow() {
      let fix = num => {
        if (num > 9) return `${num}`;
        return `0${num}`;
      };
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        fix(today.getMonth() + 1) +
        "-" +
        fix(today.getDate());
      const time =
        fix(today.getHours()) +
        ":" +
        fix(today.getMinutes()) +
        ":" +
        fix(today.getSeconds());
      const dateTime = date + " " + time;
      this.$set(this, "timestamp", dateTime);
    }
  }
};
</script>

<style scoped>
.screen {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: rgb(0, 0, 0.5);
  border-radius: 10px;
}
.status-bar {
  font-weight: 500;
  display: flex;
  justify-content: flex-end;
  line-height: 30px;
}
.status-item {
  margin: 0px 5px 0px 5px;
}
.key-board {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0px 0px 0px;
}
.clear {
  width: 100px;
  height: 150px;
  background: #e35b08;
  text-align: center;
  align-items: center;
  display: flex;
  font-size: 40px;
  font-weight: 900;
  border-radius: 5px;
  -webkit-box-shadow: 10px 10px 300px -15px rgba(2, 3, 4, 1);
  -moz-box-shadow: 10px 10px 300px -15px rgba(2, 3, 4, 1);
  box-shadow: 10px 10px 300px -15px rgba(2, 3, 4, 1);
}
.clear:active {
  background-color: #c64b2b;
  font-size: 45px;
}
.disable-selection {
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer */
  -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
  -webkit-user-select: none; /* Chrome, Safari, and Opera */
  -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
}
.key-common{
  background: #2f5c85;
  font-size:20px;
  margin-right: 10px;
  box-sizing: border-box;
  padding: 0px 20px 0px 20px;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer */
  -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
  -webkit-user-select: none; /* Chrome, Safari, and Opera */
  -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
}
.other-key{
  /* padding-left:10px ; */
  display: flex;
  flex:1;
  flex-wrap: wrap;
}

.key-common:active{
  background: #7ba1c7;
  font-size: 25px;
}
.action{
  margin-top: 10px;
  width: 100px;
  height: 70px;
  line-height: 70px;
  font-weight: 900;
  font-size: 50px;
  color: #020304;
  border-radius: 5px;
  background: white;
}
.action:active{
  font-size: 55px;
}
</style>
