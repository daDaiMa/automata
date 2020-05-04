<template>
  <div style="min-width:700px;width:800px">
    <Container>
      <div class="screen">
        <div class="status-bar">
          <div class="tips" v-if="current_operation">当前选中操作:{{current_operation}}</div>
          <div class="status-item">{{timestamp}}</div>
          <div class="status-item">🔋100%</div>
        </div>
        <div class="input-box">
          <Grammar v-model="grammar"></Grammar>
        </div>
      </div>
      <div>
        <div class="key-board">
          <div class="other-key">
            <div class="key-null">ε</div>
            <div
              v-for="key in otherKey"
              v-bind:key="key.id"
              v-bind:class="key.class"
              @click="keyDown(key.id)"
            >{{key.value}}</div>
          </div>
          <div>
            <div class="clear disable-selection" @click="clearGrammar">
              <div style="width:100%">归零</div>
            </div>
            <div class="action" @click="fire">=</div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import { Calculate } from "../store/actions";
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
  name: "calcu",
  data() {
    return {
      grammar: _.cloneDeep(defaultGrammar),
      timestamp: "",
      otherKey: [
        { value: "消除左递归" },
        { value: "提取左公因子" },
        { value: "FIRST" },
        { value: "FOLLOW" },
        { value: "Product FIRST" },
        { value: "LL(1) TABLE" },
        { value: "LR(0)项集族" }
      ].map((item, id) => {
        return {
          ...item,
          id: id,
          class: { "key-common": true, "key-down": false }
        };
      })
    };
  },
  components: {
    Container: () => import("./Container"),
    Grammar: () => import("./Grammar")
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  computed: {
    current_operation() {
      let res = this.otherKey.filter(item => {
        return item.class["key-down"];
      });
      return res && res[0] ? res[0].value : "";
    },
    grammarFromRes() {
      return this.$store.state.grammarFromRes;
    }
  },
  watch: {
    grammarFromRes(curr) {
      this.$set(this, "grammar", curr);
    }
  },
  methods: {
    fire() {
      Calculate(this.$store, {
        grammar: this.grammar,
        operation: this.current_operation
      });
    },
    clearGrammar() {
      this.$set(this, "grammar", _.cloneDeep(defaultGrammar));
      this.$set(
        this,
        "otherKey",
        this.otherKey.map(item => {
          item.class["key-down"] = false;
          return item;
        })
      );
    },
    keyDown(id) {
      this.$set(
        this,
        "otherKey",
        this.otherKey.map(item => {
          item.class["key-down"] = item.id === id && !item.class["key-down"];
          return item;
        })
      );
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

<style lang="less" scoped>
.screen {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: rgb(0, 0, 0.5);
  border-radius: 10px;

  .input-box {
    height: 500px;
    overflow: scroll;
  }
  .status-bar {
    font-weight: 500;
    display: flex;
    justify-content: flex-end;
    line-height: 30px;
    padding-bottom: 10px;
  }
  .status-item {
    margin: 0px 5px 0px 5px;
  }
  .tips {
    color: white;
    text-align: left;
    flex: 1;
  }
}
.disable-selection {
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer */
  -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
  -webkit-user-select: none; /* Chrome, Safari, and Opera */
  -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
}
.key-board {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0px 0px 0px;
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
    box-shadow: 0 5px #c64b2b;
  }
  .clear:active {
    background-color: #e35b08;
    box-shadow: 0 5px #e35b08;
    transform: translateY(4px);
  }
  .key-common {
    background: #7ba1c7;
    font-size: 20px;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 0px 20px 0px 20px;
    height: 60px;
    line-height: 60px;
    border-radius: 5px;
    box-shadow: 0 5px #2f5c85;
    .disable-selection();
  }
  .key-common:active {
    background: #7ba1c7;
  }

  .key-null {
    .key-common();
  }

  .down {
    box-shadow: none;
    transform: translateY(4px);
  }
  .key-null:active {
    .down();
  }
  .other-key {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }
  .action {
    margin-top: 10px;
    width: 100px;
    height: 70px;
    line-height: 70px;
    font-weight: 900;
    font-size: 50px;
    color: #020304;
    border-radius: 5px;
    background: white;
    .disable-selection();
  }
  .action:active {
    transform: translateY(4px);
  }
  .key-down {
    .down();
  }
}
</style>
