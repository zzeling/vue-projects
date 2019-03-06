<template xmlns="http://www.w3.org/1999/html">
  <div id="app"> <!--设置id，用于绑定 style 里面的样式-->  <!--设置id，用于绑定 style 里面的样式-->

    <router-link to="/Hello"><img src="./assets/logo.png"></router-link>
  </br>
    <router-link to="/todolist">Make the to do list</router-link>
    <router-view></router-view>

  </div>
</template>

<script>

</script>

<style>
  .isStudent {
	color: red;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
