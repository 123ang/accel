<template>
  <div id="app">
  <Navbar />
  <div id="container">
    <router-view />
  </div>
  <v-footer
      class="justify-center foot"
      color="#292929"
    >
      <div class="title font-weight-light grey--text text--lighten-5 text-center" style="color:white;">
        &copy; {{ (new Date()).getFullYear() }} Accel
      </div>
    </v-footer>
  </div>

</template>

<script>
import Navbar from '@/views/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#container {
  min-height: calc(100vh - 200px);
  padding: 40px 40px 0 40px;
}

.foot {
  height: 100px;
}
</style>

