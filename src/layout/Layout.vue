<template>
  <div class="layout">
      <NavBar/>
      <div class="container mt-5">
          <slot/>
      </div>
  </div>
</template>

<script>
import NavBar from '../components/Navbar.vue'
export default {
    components:{
        NavBar
    }
}
</script>

<style>

</style>