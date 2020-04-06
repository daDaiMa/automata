<template>
  <div>
    <Container>
      <div class="screen">
        <div class="status-bar">
          <div class="status-item">{{timestamp}}</div>
          <div class="status-item">🔋100%</div>
        </div>
        <Grammar v-model="grammar"></Grammar>
      </div>
      <div>
        <div class="key">
          <div class="clear" @click="clearGrammar">归零</div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grammar: {},
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
      this.$set(this, "grammar", {});
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
</style>
