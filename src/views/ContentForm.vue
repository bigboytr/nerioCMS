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
                            <vue-editor v-model="dto.content"></vue-editor>
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Sayfa Tanımı</label>
                            <input type="text" class="form-control" v-model="dto.metaDesc">
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Anahtar Kelimeler</label>
                            <input type="text" class="form-control" v-model="dto.metaKeyw">
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
    import controller from '@/controller/contents'
    import store from '@/store/index'
    import MainTitle from '@/components/MainTitle'
    import {VueEditor} from "vue2-editor";

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
                dto: {
                    title: '',
                    content: '',
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
            }
        },
        computed: {}
    };
</script>
