<template>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-push-2 col-md-4 offset-md-4">

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
                                    @click="profileForm = !profileForm">
                                <i class="fas fa-plus" v-show="!profileForm"></i>
                                <i class="fas fa-minus" v-show="profileForm"></i>
                            </button>

                            <button class="btn btn-danger" @click="logout()" title="Çıkış yap !">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div v-show="!profileForm">
                        <div class="alert alert-primary">
                            Yönetmek istediğiniz sitenizi seçiniz.
                        </div>

                        <div class="row">
                            <div class="col-12" v-for="(item, key) in profileList">
                                <div class="btn-group">
                                    <button class="btn btn-light text-l btn-block"
                                            @click="selectProfile(key, title)">
                                        <i class="fas fa-arrow-right"></i>
                                        {{item.title}}
                                    </button>
                                    <button class="btn btn-light" @click="setEdit(item)">
                                        <i class="fas fa-pen fa-fw text-warning"></i>
                                    </button>
                                    <button class="btn btn-light" @click="removeProfile(key)">
                                        <i class="fas fa-times fa-fw text-danger"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div v-show="profileForm">

                        <div class="alert alert-primary">
                            Yeni bir profil yaratmak için alttaki kutuyu kullanabilirsiniz.
                        </div>

                        <div class="form-group">
                            <label for="title">Site ismi :</label>
                            <input type="text" id="title" class="form-control input-sm" v-model="dto.title">
                        </div>
                        <div class="form-group">
                            <label for="dbname">MySQL DB :</label>
                            <input type="text" id="dbname" class="form-control input-sm" v-model="dto.dbName">
                        </div>
                        <div class="form-group">
                            <label for="dbuser">MySQL Username :</label>
                            <input type="text" id="dbuser" class="form-control input-sm" v-model="dto.dbUser">
                        </div>
                        <div class="form-group">
                            <label for="dbpass">MySQL Password :</label>
                            <input type="password" id="dbpass" class="form-control input-sm" v-model="dto.dbPass">
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
                    title: "",
                    dbName: '',
                    dbUser: '',
                    dbPass: ''
                },
                profileForm: false
            }
        },
        beforeMount() {
            this.getAllProfiles();
        },
        mounted() {
            this.getAllProfiles();

        },
        methods: {
            getAllProfiles() {
                siteSelection.getProfiles(this)
                    .then((response) => {
                        this.list = response;
                        this.profileForm = (this.list === null);

                    })
            },
            createProfile() {
                siteSelection.createProfile(this.dto)
                    .then(() => {

                        this.getAllProfiles();
                        this.profileForm = false;

                    }).catch((err) => {
                    // err => boolean = false
                    // give info to user
                });
            },
            selectProfile(key, title) {
                siteSelection.siteSelected(key, title).then(() => {
                    router.push('/')
                })
            },
            removeProfile(id) {
                siteSelection.removeProfile(id).then(() => {

                    this.getAllProfiles();

                }).catch((err) => {
                    // err => boolean = false
                    // give info to user
                });
            },
            setEdit(item) {

                /* this.dto = {...this.dto,
                 {title: item.title,
                         dbName: item.dbConfig.dbName, }}*/

                this.dto.title = item.title
                this.dto.dbName = item.dbConfig.dbName
                this.dto.dbUser = item.dbConfig.dbUser
                this.dto.dbPass = item.dbConfig.dbPass
            },
            logout() {
                auth.logout();
            },
        },
        computed: {
            profileList() {
                return this.list;
            },

        }
    }
</script>

<style scoped>
    .btn-group {
        display: flex;
    }
</style>