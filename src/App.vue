<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0px;
  background: rgb(114, 135,254);
  /* background-image: linear-gradient(
    to bottom right,
    rgb(114, 135, 254),
    rgb(130, 88, 186)
  ); */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
