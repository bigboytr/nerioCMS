<template>
  <div id="app" class="container-fluid h-100" :class="{'login-bg': loginBg}">

    <div v-if="!token" class="row h-100 justify-content-center align-items-center">
      <div class="col-12">
        <Login />
      </div>
    </div>

    <div v-if="token" class="row h-100">
      <Sidebar/>

      <div class="content col-10 mt-3 mb-3">
        <router-view/>
      </div>

      <!--Notify plugin template-->
      <notifications position="right bottom"/>
    </div>

  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Login from "./views/Login.vue";

export default {
  name: 'App',
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    loginBg() {
      const path = (this.$route.path).substring(1);
      return path === 'login';
    }
  },
  components: {
    Login,
    Header,
    Sidebar,
  },
};
</script>

<style scoped>
.login-bg {
  background: url('../src/assets/images/login_bg.png') no-repeat fixed center;
  background-size: contain;

}
</style>
