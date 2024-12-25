<template>
    <div class="row">



        <div class="col-3" v-for="item in shortcuts">
            <div class="card">
                <div class="card-body">
                    <router-link tag="button" class="btn btn-light btn-block" :to="item.path">
                        <i class="fas fa-plus fa-2x"></i><br>
                        {{item.title}}
                    </router-link>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from "@/controller/authentication";

    export default {
        name: 'Dashboard',
        data() {
            return {
                shortcuts: [
                    {
                        title: "Link Ekle",
                        path: "/navigation"
                    },
                    {
                        title: "İçerik Ekle",
                        path: "/content-form"
                    }
                ]
            }
        },
        methods: {
            logout() {
                auth.logout();
            },
        }
    };
</script>
