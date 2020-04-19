<template>
    <div id="app" class="container-fluid h-100" :class='fullHeight()'>

        <div v-if="!token" class="row h-100 justify-content-center align-items-center">
            <div class="col-12">
                <router-view/>
            </div>
        </div>


        <div v-if="token" class="row h-100">
            <Sidebar />

            <div class="content col-10 mt-3 mb-3">
                <router-view/>
            </div>

            <!--Notify plugin template-->
            <notifications position="right bottom"/>
        </div>

    </div>
</template>

<script>
    import Sidebar from '@/components/Sidebar'
    import Header from '@/components/Header'
    import auth from '@/controller/authentication'

    export default {
        name: 'App',
        created: function () {
            auth.isLogged();
        },
        methods: {
            fullHeight() {
                const path = (this.$route.path).substring(1);
                return (path === 'login') ? 'login-bg' : '';
            }
        },
        computed: {
            token() {
                return this.$store.getters.getToken;
            }
        },
        components: {
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
