<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header">
                    <MainTitle></MainTitle>

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
                    <table class="table table-hover" v-show="list">
                        <thead class="thead-dark">
                        <tr>
                            <th width="10%"></th>
                            <th width="20%">Başlık</th>
                            <th width="20%">Kelimeler</th>
                            <th width="20%">Hedef</th>
                            <!--<th width="10%">Son İşlem</th>-->
                            <th width="10%">Aktif</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, key) in list" :for="'chk_+(key)'">
                            <td>

                                <input type="checkbox" :id="'chk_'+(key)" :value="key">

                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="editMe(item)">
                                    {{item.title}}
                                </a>
                            </td>
                            <td>{{item.metaKeyw}}</td>
                            <td>{{item.target}}</td>
                            <!--<td>{{item.modified}}</td>-->
                            <td>
                                <Status :param="item.active"></Status>
                            </td>

                        </tr>
                        </tbody>
                    </table>
                    <h3 v-show="!list">Henüz eklenmiş veri bulunamadı !</h3>
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

    export default {
        name: 'Contents',
        data() {
            return {
                //list: null,
                item: null
            }
        },
        components: {
            modal,
            MainTitle,
            Status
        },
        methods: {
            /*editMe(item) {
                this.item = item;
                $("#modal").modal("show");
            },*/
            activate(id) {

                controller.activate(id, "table_pages").then((resp) => {
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
            }
        }
    };
</script>
