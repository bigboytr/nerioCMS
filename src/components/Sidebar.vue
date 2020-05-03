<template>
    <div class="col-2 sidebar padding-l-0 padding-r-0">

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

        <button class="btn btn-block btn-danger logout" @click="logout()">
            <i class="fas fa-times"></i>
            Çıkış
        </button>
    </div>
</template>

<script>
    import auth from '@/controller/authentication'
    import nerioMenu from "../nerioMenu";

    export default {
        name: 'Sidebar',
        data() {
            return {
                list: {}
            }
        },
        mounted() {
            this.list = nerioMenu;
        },
        methods: {
            logout() {
                auth.logout();
            }
        }
    };
</script>
