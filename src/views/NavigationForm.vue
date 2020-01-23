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

                        <div class="form-group col-6">
                            <label class="form-label">Referans</label>
                            <select class="form-control"
                                    v-model="reference"
                                    @change="updateURL()">
                                <option value="0" selected>----</option>
                                <option v-for="i in referenceList" :value="i">{{i.title}}</option>
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

                        <div class="form-group col-6">
                            <label class="form-label">Meta Tanım</label>
                            <input type="text" class="form-control" v-model="dto.desci">
                        </div>

                        <div class="form-group col-6">
                            <label class="form-label">Meta Kelimeler</label>
                            <input type="text" class="form-control" v-model="dto.keyw">
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
        mounted(){
            controller.fetchData(pathContents, moduleContents);
            controller.fetchData(pathProducts, moduleProducts);
            controller.fetchData(pathContacts, moduleContacts);
        },
        methods: {
            save() {

                controller.save(this.dto, module).then(() => {

                    router.push(`/${path}`)

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
                return store.getters.getList(path);
            },
            referenceList() {
                switch (this.dto.type) {
                    case 0: return store.getters.getList(pathContents);
                    case 2: {
                        const r = store.getters.getList(pathProducts);
                        return r.filter((item) => {
                            return +item.parent === 0
                        })
                    }
                    case 3: return store.getters.getList(pathContacts);
                    default: return store.getters.getList(pathContents);
                }
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