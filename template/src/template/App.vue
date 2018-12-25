<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App'
}
</script>

<style lang="scss">
@import "./styles/index.scss"; // global css
@import '~normalize.css/normalize.css'; // A modern alternative to CSS resets
@import '~element-ui/lib/theme-chalk/index.css' ;
@import '~font-awesome/css/font-awesome.min.css';

</style>
