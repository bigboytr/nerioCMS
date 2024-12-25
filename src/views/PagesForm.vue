<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card card-light">
                <div class="card-header">
                    <MainTitle></MainTitle>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label class="form-label">Başlık</label>
                            <input type="text" class="form-control" v-model="dto.title">
                        </div>

                        <div class="form-group col-12">
                            <vue-editor v-model="dto.contents"></vue-editor>
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Sayfa Tanımı</label>
                            <input type="text" class="form-control" v-model="dto.desci">
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Anahtar Kelimeler</label>
                            <input type="text" class="form-control" v-model="dto.keyw">
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <!--<button type="button" class="btn btn-warning">
                            <i class="fas fa-times fa-fw"></i>
                            Vazgeç
                        </button>-->
                        <router-link to="/content" tag="button" class="btn btn-warning">
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
    import MainTitle from '@/components/MainTitle'
    import router from '@/router'
    import {VueEditor} from "vue2-editor";

    const module = "table_contents";

    export default {
        name: 'ContentForm',
        props: ['item'],
        components: {
            MainTitle,
            VueEditor
        },
        data() {
            return {
                targetInput: false,
                update: false,
                dto: {
                    // this should only handle form elements which want to add to db
                    title: '',
                    contents: '',
                    desci: '',
                    keyw: '',
                    area: 1,
                }
                /*
                Firebase structure
                dto: {
                    sefLink: '',
                    title: '',
                    content: '',
                    metaDesc: '',
                    metaKeyw: '',
                    update: false
                }*/

            }
        },
        methods: {
            save() {
                controller.save(this.dto, 'table_contents').then(() => {
                    router.push("/content")
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        computed: {
            sefTitle() {
                // this will use for sef links
                //this.dto.sefLink = controller.sefTitleCreator(this.dto.title);
            }
        }
    };
</script>
