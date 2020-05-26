<template>

    <b-card no-body>
        <b-card-header>
            <MainTitle></MainTitle>
        </b-card-header>

        <b-card-body>
            <b-form-row>
                <b-form-group label="Link Tipleri">
                    <b-form-radio-group
                            v-model="dto.type"
                            :options="urlTypes"
                            buttons
                            button-variant="outline-primary"
                    ></b-form-radio-group>
                </b-form-group>
            </b-form-row>




            <b-form-row>
                <b-col>
                    <b-form-group label="Referans">
                        <b-select v-model="reference" @change="updateURL()">
                            <b-select-option value="0">----- Seçiniz -----</b-select-option>
                            <b-select-option v-for="i in referenceList" :value="i">
                                {{i.title}}
                            </b-select-option>
                        </b-select>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="URL">
                        <b-input type="text" v-model="dto.path" disabled />
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-row>
                <b-col>
                    <b-form-group label="Başlık">
                        <b-input type="text" v-model="dto.title" />
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-row>
                <b-col md="6">
                    <b-form-group label="Üst Öğe">
                        <b-form-select
                                :select-size="selectSize"
                                :options="navList"
                                text-field="title"
                                value-field="id"
                        >
                            <b-form-select-option value="0">
                                --- Üst Öğe Yok ---
                            </b-form-select-option>

                        </b-form-select>
                        <!--<b-select select-size="7" v-model="dto.parent">
                            <b-select-option value="0">Üst öğe yok</b-select-option>
                            <b-select-option v-for="(n, k) in navList" :value="n.id">
                                {{n.title}}
                            </b-select-option>
                        </b-select>-->
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Pencere hedefi">
                        <b-form-checkbox
                                id="target"
                                name="target"
                                switch
                                size="lg"
                                :value="true"
                                :unchecked-value="false"
                                @change="targetInputF"
                                >
                            Yeni Pencere
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Sıra">
                        <b-form-input type="number" min="1" />
                    </b-form-group>
                </b-col>
            </b-form-row>

            <!--META-->
            <b-form-row>
                <b-col>
                    <b-form-group label="Meta Tanım">
                        <b-input type="text" v-model="dto.metaDescription" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Anahtar Kelime">
                        <b-input type="text" v-model="dto.metaKeyword" />
                    </b-form-group>
                </b-col>
            </b-form-row>

            <div class="row">

                <!--

                <div class="form-group col-6">
                    <label class="form-label">Üst Öğe</label>
                    <select size="7" class="form-control" v-model="dto.parent">
                        <option value="0" selected>Üst öğe yok</option>
                        <option v-for="(n, k) in navList" v-if="parseInt(n.parent, 10) === 0" :value="n.id">{{n.title}}</option>
                    </select>
                </div>

                <div class="form-group col-2">
                    <label class="form-label">
                        Yeni pencerede açılsın
                    </label>
                    <ToggleSwitch :id="'target'"
                                  @get-toggle="setTarget"
                                  :value="targetInput"></ToggleSwitch>
                </div>

                <div class="form-group col-1">
                    <label class="form-label">Sıra</label>
                    <input type="number" class="form-control" v-model="dto.menuOrder">
                </div>

                -->
            </div>
        </b-card-body>
        <b-card-footer>
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
        </b-card-footer>
    </b-card>

</template>

<script>
    import CommonModule from "../controller/commonModule";
    import store from '@/store/index'
    import router from '@/router'
    import MainTitle from '@/components/MainTitle'
    import NotifyMe from '@/controller/notifier'
    import ToggleSwitch from '@/components/ToggleSwitch'

    const module = "table_navigation";
    const path = 'navigation';

    const moduleContents = 'table_contents';
    const pathContents = 'contents';

    const moduleProducts = "table_products";
    const pathProducts = 'products'; // store path

    const moduleContacts = "table_contacts";
    const pathContacts = 'contacts'; // store path

    export default {
        name: 'NavigationForm',
        props: ['item'],
        components: {
            MainTitle,
            ToggleSwitch
        },
        data() {
            return {
                controllerNavigation: new CommonModule('navigation'),
                controllerPages: new CommonModule('pages'),
                dto: {
                    title: "",
                    path: "",
                    target: "_self",
                    parent: 0,
                    type: 0,
                    metaDescription: '',
                    metaKeyword: '',
                    queue: 0,
                    referenceId: ""
                },
                update: false,
                reference: 0,
                selectSize: 7
            }
        },
        mounted(){
            /*controller.fetchData(pathContents, moduleContents);
            controller.fetchData(pathProducts, moduleProducts);
            controller.fetchData(pathContacts, moduleContacts);*/
            //this.controllerPages.getAll()
            store.getters.getList('pages')
        },
        methods: {
            save() {

                this.controllerNavigation.save(false, this.dto).then(() => {

                    //router.push(`/${path}`)
                    router.push("/navigation")

                }).catch((error) => {
                    console.log(error);
                    NotifyMe.notifier('error', `Hata oluştu !`);
                });
            },
            setUrlType(type) {
                this.dto.type = +type;
            },
            setTarget(val) {
                this.targetInput = val;
            },
            updateURL() {

                this.dto.path = `/${this.reference.id}`;
                this.dto.referenceId = this.reference.id;
                this.dto.title = this.reference.title;
                /*this.dto.title = this.reference.title;
                const t = controller.sefTitleCreator(this.dto.title)
                const id = this.reference.id;

                this.dto.href = `/${t}/${id}`;*/
            },
            targetInputF(value) {
                this.dto.target = value ? "_blank" : "_self"
            },
        },
        computed: {
            navList() {
                // üst öğe seçerken kullanılacak
                //console.log(store.getters.getList('navigation'));
                return store.getters.getList('navigation');
            },
            referenceList() {
                switch (this.dto.type) {
                    case 0: return store.getters.getList('pages');
                    case 2: {
                        const r = store.getters.getList(pathProducts);
                        return r.filter((item) => {
                            return +item.parent === 0
                        })
                    }
                    case 3: return store.getters.getList(pathContacts);
                    default: return store.getters.getList('pages');
                }
            },
            urlTypes() {
                return store.getters.getUrlTypes(undefined)
            }
        }
    };
</script>