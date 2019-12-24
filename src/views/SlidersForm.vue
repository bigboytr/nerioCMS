<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card card-light">
                <div class="card-header">
                    <MainTitle></MainTitle>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-3">
                            <label class="form-label">Kategori</label>
                            <select class="form-control" v-model.number="dto.categoryID">
                                <option value="0" selected>----</option>
                                <option v-for="i in categories" :value="i.id">{{i.title}}</option>
                            </select>
                        </div>

                        <div class="form-group col-2">
                            <label class="form-label">Slider Sırası</label>
                            <input type="number" class="form-control" v-model.number="dto.queue" min="1">
                        </div>

                        <div class="form-group col-7">
                            <label class="form-label">Link (opsiyonel)</label>
                            <input type="text" class="form-control" v-model.trim="dto.href">
                        </div>


                        <div class="form-group col-12">
                            <label class="form-label">Başlık (opsiyonel)</label>
                            <input type="text" class="form-control" v-model.trim="dto.title">
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Alt Yazı (opsiyonel)</label>
                            <input type="text" class="form-control" v-model.trim="dto.caption">
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Slider Resmi</label><br>
                            <label class="btn btn-sm btn-secondary" v-show="!file" for="file">
                                <i class="fas fa-image mr-3"></i>
                                Slider resmi seç
                            </label>

                            <div v-if="file">
                                <button class="btn btn-sm btn-danger"
                                        @click="removeSelectedFile()">
                                    <i class="fas fa-times"></i>
                                </button>
                                {{file.name}}
                                <div class="btn-group pull-right">

                                </div>
                            </div>

                            <input type="file" id="file" accept="application/png, application/jpeg" class="hidden"
                                   ref="file" v-on:change="handleFileUpload()"/>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <router-link to="/slider" tag="button" class="btn btn-warning">
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
    import store from '@/store'
    import NotifyMe from '@/controller/notifier'


    const module = "table_sliders";
    const path = 'sliders';
    const path_categories = "slidersCategories";

    export default {
        name: 'SlidersForm',
        props: ['item'],
        components: {
            MainTitle
        },
        data() {
            return {
                file: false,
                update: false,
                dto: {
                    // this should only handle form elements which want to add to db
                    categoryID: 0,
                    title: '',
                    caption: '',
                    queue: 1,
                    href: '',
                    path: ''
                }
            }
        },
        methods: {
            save() {

                if (this.file !== null) {

                    controller.uploadFile(this.file).then((response) => {

                        console.log(response);
                        this.dto.path = response.data.filename;

                        NotifyMe.notifier("success", "Dosya yüklendi...");

                        controller.save(this.dto, module).then((response) => {

                            router.push(path.substring(0, path.length - 1))

                        }).catch((error) => {

                            console.log(error);
                        });

                        this.removeSelectedFile();

                    }).catch((errors) => {
                        NotifyMe.notifier("error", errors.data.error)

                    });
                }


            },
            removeSelectedFile() {
                this.file = null;
                this.$refs.file.value = '';
            },
            handleFileUpload() {
                if (this.$refs &&
                    this.$refs.file &&
                    this.$refs.file.files.length &&
                    this.$refs.file.files[0]) {
                    this.file = this.$refs.file.files[0];
                } else {
                    this.file = null;
                }
            }
        },
        computed: {
            categories() {
                return store.getters.getList(path_categories)
            }
        }
    };
</script>
