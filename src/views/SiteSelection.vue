<template>
    <div class="row">
        <div class="col-md-4 col-md-push-4 margin-t-50">

            <div class="panel panel-default login-panel-shadow">
                <div class="panel-body">

                    <div class="logo margin-t-10 margin-b-20 text-center">
                        <img src="../assets/images/nerio.png" width="70">
                        <h2>Nerio CMS</h2>
                        <h5>Powered by FX Yazılım</h5>
                    </div>

                    <div class="alert alert-info">
                        Hoşgeldiniz ! <br/>
                        Yönetmek istediğiniz sitenizi seçiniz. Çıkmak isterseniz aşağıdaki kırmızı butonu kullanabilirsiniz.
                    </div>
                    <table class="table">
                        <tr>
                            <td>dnzpro.com</td>
                            <td>
                                <i class="far fa-arrow-alt-circle-right"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>akinsoftizmir.org</td>
                            <td>
                                <i class="fas fa-arrow-alt-right-circle"></i>
                            </td>
                        </tr>
                    </table>

                    <button type="button" class="btn btn-danger btn-block" @click="logout()">
                        <i class="fas fa-times"></i>
                        Çıkış
                    </button>
                </div>

                <div class="panel-footer text-center">
                    {{thisYear}} - &copy; FX Yazılım
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '@/controller/authentication'

    export default {
        name: "SiteSelection",
        data() {
            return {
                thisYear: new Date().getFullYear()
            }
        },
        methods: {
            logout() {
                auth.logout();
            },
        }
    }
</script>

<style scoped>

</style>