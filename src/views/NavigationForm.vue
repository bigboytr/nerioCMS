<template>
    <div class="row">

        <div class="col-12">

            <div class="card card-light">

                <div class="card-header">
                    <MainTitle></MainTitle>
                </div>

                <div class="card-body">

                    <div class="row">
                        <div class="col-12">
                            <label>Link Tipi</label>
                            <div class="form-group">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label class="btn btn-primary" :class="(index === 0) ? 'active' : ''"
                                           v-for="(type, index) in urlTypes" @click="setUrlType(index)">
                                        <input type="radio" :value="index" v-model="dto.type"> {{type}}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group col-6" v-show="dto.type != 1">
                            <label class="form-label">Referans</label>
                            <select class="form-control" v-model="reference" @change="updateURL()">
                                <option value="0" selected>----</option>
                                <option v-show="dto.type == 0"
                                        v-for="i in contentList" :value="i">{{i.title}}</option>
                                <!--<option v-show="dto.type == 2"
                                        v-for="i in productList" :value="i.id">{{i.title}}</option>-->
                            </select>
                        </div>

                        <div class="form-group col-6">
                            <label class="form-label">URL</label>
                            <input type="text" class="form-control" v-model="dto.href" v-if="dto.type == 1">
                            <input type="text" class="form-control" v-model="dto.href" v-else disabled>
                        </div>

                        <div class="form-group col-12">
                            <div class="form-group">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" v-model="dto.title">
                            </div>
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Üst Öğe</label>
                            <select size="7" class="form-control" v-model="dto.parent">
                                <option value="0" selected>Üst öğe yok</option>
                                <option v-for="(n, k) in navList" :value="k">{{n.title}}</option>
                            </select>
                        </div>

                        <div class="form-group col-6">
                            <label class="form-label">Meta Tanım</label>
                            <input type="text" class="form-control" v-model="dto.desci">
                        </div>

                        <div class="form-group col-6">
                            <label class="form-label">Meta Kelimeler</label>
                            <input type="text" class="form-control" v-model="dto.keyw">
                        </div>

                        <div class="form-group col-2">
                            <input class="form-control" type="checkbox" id="yeni_p" v-model="targetInput">
                            <label class="form-label" for="yeni_p">
                                Yeni pencerede açılsın
                            </label>
                        </div>

                        <div class="form-group col-1">
                            <label class="form-label">Sıra</label>
                            <input type="number" class="form-control" v-model="dto.menuOrder">
                        </div>


                    </div>

                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <router-link to="/navigation" tag="button" class="btn btn-warning">
                            <i class="fas fa-times fa-fw"></i>
                            Vazgeç
                        </router-link>
                        <button type="button" class="btn btn-primary" @click="save()">
                            <i class="fas fa-arrow-circle-right fa-fw"></i>
                            Kaydet
                        </button>
                    </div>
                </div>



            </div>

        </div>



    </div>
</template>

<script>
    import controller from '@/controller/controller'
    import store from '@/store/index'
    import router from '@/router'
    import MainTitle from '@/components/MainTitle'
    import NotifyMe from '@/controller/notifier'

    const module = "table_navigation";

    export default {
        name: 'NavigationForm',
        props: ['item'],
        components: {
            MainTitle
        },
        data() {
            return {
                targetInput: false,
                dto: {
                    // it's only has db table fields
                    title: "",
                    href: "",
                    target: "_self",
                    parent: 0,
                    type: 0,
                    desci: '',
                    keyw: '',
                    menuOrder: 0
                },
                update: false,
                reference: 0
            }
        },
        methods: {
            save() {

                controller.save(this.dto, module).then(function (response) {
                    router.push("/navigation")
                }).catch((error) => {
                    console.log(error);
                    NotifyMe.notifier('error', `Hata oluştu !`);
                });
            },
            setUrlType(type) {
                this.dto.type = type;
            },
            updateURL(){
                this.dto.title = this.reference.title;
                const t = controller.sefTitleCreator(this.dto.title)
                const id = this.reference.id;

                this.dto.href = `/${t}/${id}`;
            }
        },
        computed: {
            navList() {
                // üst öğe seçerken kullanılacak
                return store.getters.getList('navigation')
            },
            contentList() {
                return store.getters.getList('contents')
            },
            targetInputF() {
                this.dto.target = this.targetInput ? "_blank" : "_self"
            },
            urlTypes() {
                return store.getters.getUrlTypes(undefined)
            }
        }
    };
</script>