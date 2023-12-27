<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
 <div class="header">
  <Header />
 </div>

 <div class="content">

   <RouterView />
 </div>
</template>

<style lang="scss" scoped>
body{
  background-color: #B8BB9A;
}
.header{
  width: 100%;
  height: 15vh;
}

.content{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  // background-color: #FBF1B4;
}
</style>