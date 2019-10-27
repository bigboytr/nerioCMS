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

                        <div class="form-group col-12">
                            <div class="form-group">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" v-model="dto.title">
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <label class="form-label">URL</label>
                            <input type="text" class="form-control" v-model="dto.url" v-if="dto.type == 1">
                            <input type="text" class="form-control" v-model="dto.url" v-else disabled>
                        </div>

                        <div class="form-group col-6" v-show="dto.type != 1">
                            <label class="form-label">Referans</label>
                            <select class="form-control" v-model="dto.page">
                                <option value="0" selected>----</option>
                            </select>
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
                            <input type="text" class="form-control" v-model="dto.metaDesc">
                        </div>

                        <div class="form-group col-6">
                            <label class="form-label">Meta Kelimeler</label>
                            <input type="text" class="form-control" v-model="dto.metaKeyw">
                        </div>

                        <div class="form-group col-4">
                            <input class="form-control" type="checkbox" id="yeni_p" v-model="targetInput">
                            <label class="form-label" for="yeni_p">
                                Yeni pencerede açılsın
                            </label>
                        </div>


                    </div>

                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <button type="button" class="btn btn-warning">
                            <i class="fas fa-times fa-fw"></i>
                            Vazgeç
                        </button>
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
    import controller from '@/controller/navigation'
    import store from '@/store/index'
    import MainTitle from '@/components/MainTitle'

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
                    title: "",
                    url: "",
                    page: "",
                    target: "_self",
                    parent: 0,
                    type: 0,
                    metaDesc: '',
                    metaKeyw: ''
                }

            }
        },
        methods: {
            save() {
                controller.save(this.dto).then(function () {
                    alert("başarılı");

                }).catch((error) => {
                    console.log(error);
                });
            },
            setUrlType(type) {
                this.dto.type = type;
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