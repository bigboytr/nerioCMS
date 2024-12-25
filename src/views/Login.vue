<template>
  <div class="row">
    <div class="col-xs-8 offset-xs-2 col-sm-8 col-sm-3 col-md-4 offset-md-4 margin-t-50">

      <div class="card card-default login-panel-shadow">
        <div class="card-body">

          <div class="logo margin-t-10 margin-b-20 text-center">
            <img src="../assets/images/nerio.png" width="70">
            <h2>Nerio CMS</h2>
            <h5>Powered by FX Yazılım</h5>
          </div>

          <div class="input-group mb-1">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Kullancı Adı" v-model.trim="email">
          </div>


          <div class="input-group mb-1">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
            </div>
            <input type="password" class="form-control" placeholder="Şifre" v-model.trim="password">
          </div>

          <div class="form-group">
            <button type="button" class="btn btn-success btn-block" @click="login()">
              <i class="fas fa-check"></i>
              Giriş
            </button>
          </div>

        </div>
        <div class="card-footer text-center">
          {{ thisYear }} - &copy; FX Yazılım
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {authentication} from "../controller/authentication";

export default {
  name: 'Login',
  data() {
    return {
      thisYear: new Date().getFullYear(),
      email: 'yasin@gencpro.com',
      password: '123456',
    };
  },
  methods: {
    login() {
      authentication.login(this.email, this.password);
    },
  },
};
</script>

<style>
.login-panel-shadow {
  box-shadow: #ddd 0 0 80px;
}
</style>
