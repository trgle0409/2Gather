
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="bg">
    <main>
      <router-view></router-view>
    </main>
  </div>

  <NavBar></NavBar>
</template>


<style >
* {
  margin: 0px;
}

</style>
