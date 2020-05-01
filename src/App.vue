<template>
  <div id="app">
  <Navbar />
  <div id="container">
    <router-view />
  </div>
  <div style="background-color: #E0E0E0;" ></div>
  <v-footer
      class="justify-center"
      color="white"
      height="100"
    >
      <div
        style="margin: 0 auto;
              text-align: center;
              font-weight:bold"
      >
        Copyright &copy; {{ (new Date()).getFullYear() }} Accel. All Rights reserved.
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
  padding: 40px 40px 40px 40px;
  background: #E0E0E0;

}


</style>

