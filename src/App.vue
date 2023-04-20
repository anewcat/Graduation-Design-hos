<template>
  <div id="app">
    <Header v-if="$route.meta.redirectAlreadyLogin == true"></Header>
      <router-view>
      </router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Header from './components/Header.vue'
import { useRouter } from 'vue-router'
// const router = useRouter()
// const redirectAlreadyLogin:string = router.currentRoute.value.fullPath
// const redirectAlreadyLogin = router.getRoutes()
// console.log(redirectAlreadyLogin)

</script>

<style scoped>
#app{
  font-family:"仓耳渔阳体 W04";
  background-color: #fef9ed;
}

</style>
