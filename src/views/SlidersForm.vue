<template>
    <b-row>
        <b-col>
            <b-card no-body variant="light">
                <b-card-header>
                    <MainTitle />
                </b-card-header>

                <b-card-body>
                    <b-form-row>
                        <b-col cols="4">
                            <b-form-group label="Kategori">
                                <b-form-select
                                        :options="categories"
                                        text-field="title"
                                        value-field="title"
                                        v-model="dto.category"
                                >
                                    <template v-slot:first>
                                        <b-form-select-option :value="0">
                                            -- Kategori Seçiniz --
                                        </b-form-select-option>
                                    </template>

                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col cols="2">
                            <b-form-group label="Slider Sırası">
                                <b-input type="number" v-model.number="dto.queue" min="1" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="6">
                            <b-form-group label="Link (Opsiyonel)">
                                <b-input type="text" v-model.trim="dto.link" />
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="6">
                            <b-form-group label="Başlık (Opsiyonel)">
                                <b-input type="text" v-model.trim="dto.title" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="6">
                            <b-form-group label="Alt Yazı (Opsiyonel)">
                                <b-input type="text" v-model.trim="dto.caption" />
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col>
                            <b-form-group label="Slider Resmi">
                                <label class="btn btn-sm btn-secondary" v-show="!file" for="file">
                                    <i class="fas fa-image mr-3"></i>
                                    Slider resmi seç
                                </label>
                            </b-form-group>

                            <div v-if="file">
                                <button class="btn btn-sm btn-danger"
                                        @click="removeSelectedFile()">
                                    <i class="fas fa-times"></i>
                                </button>
                                {{file.name}}
                                <div class="btn-group pull-right">

                                </div>
                            </div>

                            <input type="file" id="file"
                                   accept="application/png, application/jpeg"
                                   class="hidden"
                                   ref="file" v-on:change="handleFileUpload()"/>
                        </b-col>
                    </b-form-row>

                </b-card-body>
                <b-card-footer>
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
                </b-card-footer>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import MainTitle from '@/components/MainTitle'
    import router from '@/router'
    import store from '@/store'
    import NotifyMe from '@/controller/notifier'
    import CommonModule from "../controller/commonModule";


    const collection = 'sliders';
    const collection_categories = "sliderCategories";

    export default {
        name: 'SlidersForm',
        props: ['item'],
        components: {
            MainTitle
        },
        data() {
            return {
                controller: new CommonModule(collection),
                file: false,
                update: false,
                dto: {
                    // this should only handle form elements which want to add to db
                    category: '',
                    title: '',
                    caption: '',
                    queue: 1,
                    link: '',
                    path: ''
                }
            }
        },
        methods: {
            save() {

                if (this.file !== null) {

                    this.controller.uploadFile(this.file).then((path) => {

                        this.dto.path = path

                        this.controller.save(false, this.dto).then(() => {

                            router.push("/slider")

                        }).catch((error) => {
                            console.log(error);
                            NotifyMe.notifier('error', `Hata oluştu !`);
                        });
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
                return store.getters.getList(collection_categories)
            }
        }
    };
</script>
