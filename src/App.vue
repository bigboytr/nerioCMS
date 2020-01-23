<template>
    <div id="app" class="container-fluid" :class='fullHeight()'>

        <Sidebar v-if="token"></Sidebar>

        <div v-if="!token" class="row h-100 justify-content-center align-items-center">
            <div class="col-12">
                <router-view/>
            </div>
        </div>

        <div class="content col-10 offset-2 mt-3 mb-3" v-if="token">
            <router-view/>
        </div>

        <!--Notify plugin template-->
        <notifications position="right bottom"/>
    </div>
</template>

<script>
    import store from '@/store/index'
    import Sidebar from '@/components/Sidebar'
    import Header from '@/components/Header'
    import auth from '@/controller/authentication'
    import router from '@/router'

    export default {
        name: 'App',
        created: function () {
            auth.isLogged();
        },
        methods: {
            fullHeight() {
                const path = this.$route.path;
                return (path.substring(1) === 'login' || 'site-selection')
                    ? 'h-100'
                    : '';
            }
        },
        computed: {
            token() {
                return store.getters.getToken;
            }
        },
        components: {
            Header,
            Sidebar,
        },
    };
</script>
