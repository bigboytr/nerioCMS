<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                    <router-link to="/content-form" tag="button" class="btn btn-sm btn-dark">
                        <i class="fas fa-plus"></i>
                        Ekle
                    </router-link>

                    <button class="btn btn-sm btn-danger ml-1" @click="trash()">
                        <i class="fas fa-trash"></i>
                        Çöpe At
                    </button>

                    <button class="btn btn-sm btn-primary ml-1" @click="getAll()">
                        <i class="fas fa-check-circle"></i>
                        Aktif
                    </button>

                </div>
                <div class="card-body">
                    <table class="table table-hover" v-if="showTable">
                        <thead class="thead-dark">
                        <tr>
                            <th width="5%"></th>
                            <th width="5%">Aktif</th>
                            <th width="20%">Başlık</th>
                            <th width="30%">Kelimeler</th>
                            <th width="15%">Son İşlem</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, key) in list" @click="selectRow(item.id)">
                            <td>

                                <input type="checkbox" :value="item.id" v-model="selectedItems">

                            </td>
                            <td>
                                <Status :param="item.active"></Status>
                            </td>
                            <td>
                                <!--<router-link to="/content-form" tag="a" class="btn btn-sm btn-link">
                                    {{item.title}}
                                </router-link>-->
                                <a href="javascript:void(0)" @click="editMe(item)">
                                    {{item.title}}
                                </a>
                            </td>
                            <td>{{item.keyw}}</td>
                            <td>{{item.modifiedDate}}</td>

                        </tr>
                        </tbody>
                    </table>
                    <EmptyList :list="list"></EmptyList>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import controller from '@/controller/controller'
    import modal from '@/components/Modal'
    import MainTitle from '@/components/MainTitle'
    import store from '@/store/index'
    import Status from '@/components/Status'
    import router from '@/router'
    import EmptyList from '@/components/EmptyList'

    export default {
        name: 'Contents',
        data() {
            return {
                //list: null,
                item: null,
                selectedItems: []
            }
        },
        components: {
            modal,
            MainTitle,
            EmptyList,
            Status
        },
        methods: {
            editMe(item) {
                event.stopPropagation();
                alert('link');
                this.item = item;
                router.push('/content-form');
                //$("#modal").modal("show");
            },
            selectRow(id) {


                if (this.selectedItems.indexOf(id)) {
                    // delete
                } else {
                    this.selectedItems.push(id);
                    console.log(id);
                }

                //if (this.selectedItems.length === 0)
                    //this.selectedItems.push(id);

                /*this.selectedItems.filter((v, i) => {

                    if (v === id) {
                        delete this.selectedItems[i]
                    } else {
                        this.selectedItems.push(id);
                    }
                })*/
                //this.selectedItems.push(id)
            },
            activate(id) {

                controller.activate(id, "table_contents").then((resp) => {
                    console.log(resp);
                    alert("Başarılı");
                }).catch((e) => {
                    console.log(e);
                    alert("Başarısız");
                })
            }
        },
        computed: {
            list() {
                return store.getters.getList('contents');
            },
            showTable() {
                return this.list.length > 0
            }
        }
    };
</script>
