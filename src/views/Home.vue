<template>
    <div class="row">
        <div class="col-md-12">


            <h1>Dashboard</h1>
            <h3>Welcome to Nerio CMS</h3>

            <button type="button" class="btn btn-danger btn-block" @click="logout()">
                <i class="fas fa-times"></i>
                Çıkış
            </button>
        </div>
    </div>
</template>

<script>
    import auth from "@/controller/authentication";

    export default {
        name: 'Dashboard',

        methods: {
            logout() {
                auth.logout();
            },
        }
    };
</script>
