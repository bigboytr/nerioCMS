<template>
    <div class="row">
        <div class="col-md-2 sidebar padding-l-0 padding-r-0">

            <router-link to="/" tag="a" class="btn btn-block logo">
                Nerio CMS
            </router-link>

            <ul class="nav flex-column">
                <li class="nav-item" v-for="(item, key) in list">
                    <router-link tag="a" class="nav-link" :to="item.path">
                        <i class="fas" :class="item.icon"></i> {{item.title}}
                    </router-link>

                </li>
            </ul>

            <button class="btn btn-block btn-light" @click="siteSel()">
                <i class="fas fa-change"></i>
                Site Değiştir
            </button>
            <button class="btn btn-block btn-danger logout" @click="logout()">
                <i class="fas fa-times"></i>
                Çıkış
            </button>
        </div>

    </div>
</template>

<script>
    import auth from '@/controller/authentication'
    import controller from '@/controller/config'
    import router from '@/router';
    import store from '@/store/index'

    export default {
        name: 'Sidebar',
        data() {
            return {
                list: {}
            }
        },
        mounted() {
            const self = this;
            controller.getNerioMeu().then(function (response) {

                self.list = response;
            });
        },
        methods: {
            logout() {
                auth.logout();
            },
            siteSel() {
                store.dispatch('setSelectedSite', {});
                router.push('/site-selection');
            }
        }
    };
</script>
