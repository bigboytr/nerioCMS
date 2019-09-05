<template>
    <div id="app" class="container-fluid">

        <Header v-if="token"></Header>
        <Sidebar v-if="token"></Sidebar>

        <div class="col-md-12 margin-t-50" v-if="!token">
            <router-view/>
        </div>
        <div class="content col-md-10 col-md-push-2 margin-t-50" v-if="token">
            <router-view/>
        </div>
    </div>
</template>

<script>
import store from '@/store/index';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import auth from '@/controller/authentication'


export default {
  name: 'App',
  created: function () {

    auth.isLogged();

  },
  computed: {
    token() {
      return store.getters.getToken;
    },
  },
  components: {
    Header,
    Sidebar,
  },
};
</script>
