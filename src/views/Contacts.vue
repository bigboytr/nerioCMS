<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                </div>
                <div class="card-body">

                    <div class="row">
                        <div class="col-3 mb-3" v-if="list.length > 0" v-for="(item, key) in list" :key="key">

                            <div class="card">
                                <div class="delete-button" @click="trash(item.id)">
                                    <i class="fas fa-times right"></i>
                                </div>
                                <div class="card-body">
                                    <h3>{{item.title}}</h3>
                                    <p>
                                        <strong>Adres: </strong>
                                        {{item.address}}
                                    </p>
                                    <p v-if="item.map_embed">
                                        <button class="btn btn-sm btn-warning">
                                            <i class="fas fa-map-marker-alt"></i>
                                            Harita
                                        </button>
                                    </p>
                                    <hr>
                                    <p v-for="(detailItem, k) in details"
                                       v-if="item.id === detailItem.contactID">
                                        <i class="fas fa-times text-danger pointer"
                                           @click="trashDetail(detailItem.id)"></i>
                                        {{detailItem.type}}: {{detailItem.content}}
                                    </p>
                                    <hr>
                                    <div class="form-inline" v-show="item.showForm">

                                        <label class="form-label">{{formTypeText}}</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control input-sm" v-model="dto.content">
                                            <div class="input-group-append">
                                                <button class="btn btn-sm btn-success" @click="save()">
                                                    <i class="fas fa-plus fa-fw"></i>
                                                </button>
                                                <button class="btn btn-sm btn-dark" @click="selectedItem = item; closeForm()">
                                                    <i class="fas fa-times fa-fw"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p v-show="!item.showForm">
                                        <button class="btn btn-sm btn-primary" @click="selectedItem = item; openForm('Telefon')">
                                            <i class="fas fa-plus-circle"></i>
                                            Telefon
                                        </button>
                                        <button class="btn btn-sm btn-primary" @click="selectedItem = item; openForm('E-Mail')">
                                            <i class="fas fa-plus-circle"></i>
                                            Posta
                                        </button>
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div class="col-3">
                            <router-link to="/contact-form" tag="button"
                                         class="btn btn-block btn-outline-dark full-height">
                                <i class="fas fa-plus-circle fa-3x mb-4"></i>
                                <br> Yeni Adres Ekle
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import controller from '@/controller/controller'
    import store from '@/store'
    import MainTitle from '@/components/MainTitle'
    import NotifyMe from '@/controller/notifier'


    const module = 'table_contacts';
    const path = 'contacts';

    const moduleDetails = 'table_contactDetails';
    const pathDetails = 'contactDetails';

    export default {
        name: 'Contacts',
        data() {
            return {
                dto: {
                    title: null,
                    type: '',
                    contactID: 0,
                    content: ''
                },
                selectedItem: null
            }
        },
        components: {
            MainTitle
        },
        mounted() {
            controller.fetchData(path, module);
            controller.fetchData(pathDetails, moduleDetails);
        },
        methods: {
            trash(id) {
                controller.moveToTrash([...[], id], module).then((res) => {
                    if (res !== undefined) {
                        NotifyMe.notifier('success', `${res} adet öğe çöpe atıldı !`);

                        controller.fetchData(path, module);
                    }
                });
            },
            trashDetail(id) {
                controller.moveToTrash([...[], id], moduleDetails).then((res) => {
                    if (res !== undefined) {
                        NotifyMe.notifier('success', `${res} adet öğe çöpe atıldı !`);

                        controller.fetchData(pathDetails, moduleDetails);
                    }
                });
            },
            openForm(type) {
                this.selectedItem.showForm = true;
                this.dto.type = type;
                this.dto.contactID = parseInt(this.selectedItem.id, 10);
            },
            closeForm() {
                this.resetForm()
            },
            save() {
                // Contact detail save method
                if (this.dto.contactID > 0) {
                    controller.save(this.dto, moduleDetails).then(() => {
                        NotifyMe.notifier('success', `Adres'e ${this.dto.type} kayıt edildi.`);

                        this.resetForm();
                        controller.fetchData(pathDetails, moduleDetails);

                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    NotifyMe.notifier('warn', `Bağlantı kurulamadı !`);

                }
            },
            resetForm() {
                //item.showForm = false;
                this.selectedItem.showForm = false;
                this.dto.type = '';
                this.dto.content = '';
                this.dto.contactID = 0;
            }
        },
        computed: {
            list() {
                const main = store.getters.getList(path);
                if (main.length > 0) {

                    const r = main.map((item) => ({...item, showForm: false}));
                    return r;
                }
            },
            details() {
                return store.getters.getList(pathDetails)
            },
            formTypeText() {
                return this.dto.type;
            }
        }
    }
</script>

<style scss scoped>
    .full-height {
        height: 100%;
    }

    .pointer {
        cursor: pointer;
    }

    .delete-button {
        cursor: pointer;
        background-color: #dc3545;
        color: white;
        text-align: right;
        padding-right: 10px;
        height: 20px;
        -webkit-border-radius: .25rem .25rem 0 0;
        -moz-border-radius: .25rem .25rem 0 0;
        border-radius: .25rem .25rem 0 0;
    }

    .delete-button:hover {
         background-color: #cc3545;
     }
</style>