<template>
    <div id="app" class="container-fluid">

        <Sidebar v-if="token"></Sidebar>

        <div class="col-md-12 margin-t-50" v-if="!token">
            <router-view/>
        </div>
        <div class="content col-10 offset-2 mt-3 mb-3" v-if="token">
            <router-view/>
        </div>

        <!--Notify plugin template-->
        <notifications position="right bottom"/>
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
