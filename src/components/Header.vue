<template>
    <header class="row">

        <div class="col-xs-12 col-sm-3 col-md-2 padding-l-0 padding-r-0">
            <router-link to="/" tag="a" class="btn btn-block logo">
                Nerio CMS
            </router-link>
        </div>

        <div class="col-xs-6 col-sm-6 col-md-6">
            <h4 class="title pt-1">
                <i class="fas fa-angle-double-right"></i>
                {{mainTitle}}
            </h4>
        </div>

    </header>
</template>
<script>
  import store from '@/store/index';
  //import router from '@/router';
  //import auth from '@/controller/authentication'

  export default {
    name: 'Header',
    methods: {
      /*logout() {
        auth.logout();
      },*/
    },
    computed: {
      mainTitle() {
        return store.getters.getMainTitle;
      }
    }
  };
</script>
