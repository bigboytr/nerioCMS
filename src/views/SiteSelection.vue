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
                        Yönetmek istediğiniz sitenizi seçiniz.
                    </div>
                    <table class="table">
                        <tr v-for="(title, key) in list">
                            <td>{{title}}</td>
                            <td>
                                <button class="btn btn-default">
                                    <i class="far fa-arrow-alt-circle-right"></i>
                                </button>
                            </td>
                        </tr>
                    </table>

                    <div class="alert alert-info">
                        Yeni bir profil yaratmak için alttaki kutuyu kullanabilirsiniz.
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control input-sm" v-model="dto.title">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success btn-block" @click="createProfile()">
                            <i class="fas fa-check"></i> Profil oluştur
                        </button>
                    </div>


                    <div class="alert alert-danger">
                        Çıkmak isterseniz aşağıdaki kırmızı butonu kullanabilirsiniz.
                    </div>

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
    import siteSelection from '@/controller/siteSelection'
    import router from '@/router'

    export default {
        name: "SiteSelection",
        data() {
            return {
                thisYear: new Date().getFullYear(),
                list: null,
                dto: {
                    title: ""
                }
            }
        },
        beforeMount() {

            siteSelection.getProfiles(this).then((response) => {
                this.list = response;
            })

        },
        methods: {

            createProfile() {
                siteSelection.createProfile(this.dto).then((response) => {

                    siteSelection.siteSelected(response.key).then(() => {

                        router.push('/');

                    }).catch(() => {

                        alert("Site seçilmedi.");
                    })
                });
            },
            logout() {
                auth.logout();
            },
        }
    }
</script>

<style scoped>

</style>