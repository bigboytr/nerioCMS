<template>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-push-2 col-md-4 offset-md-4 margin-t-50">

            <div class="card card-default login-panel-shadow">
                <div class="card-body">

                    <div class="logo margin-t-10 margin-b-20 text-center">
                        <img src="../assets/images/nerio.png" width="70">
                        <h2>Nerio CMS</h2>
                        <h5>Powered by FX Yazılım</h5>
                    </div>

                    <div class="row mb-1">
                        <div class="col-xs-8 col-sm-7 col-md-8">
                            <h4>Hoşgeldiniz !</h4>
                        </div>
                        <div class="col-xs-4 col-sm-5 col-md-4 text-right">
                            <button class="btn btn-primary" title="Profile oluştur"
                                    data-toggle="collapse"
                                    data-target="profile">
                                <i class="fas fa-plus"></i>
                            </button>

                            <button class="btn btn-danger" @click="logout()" title="Çıkış yap !">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div class="alert alert-info">
                        Yönetmek istediğiniz sitenizi seçiniz.
                    </div>

                    <div class="row" v-for="(title, key) in list">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <button class="btn btn-block btn-light text-l" @click="selectProfile(key, title)">
                                <i class="fas fa-arrow-right"></i>
                                {{title}}
                            </button>
                        </div>
                        <hr>
                    </div>


                    <div class="collapse" id="profile">

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

                    </div>

                </div>

                <div class="card-footer text-center">
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
            selectProfile(key, title) {
                siteSelection.siteSelected(key, title).then(() => {
                    router.push('/')
                })
            },
            logout() {
                auth.logout();
            },
        }
    }
</script>

<style scoped>

</style>