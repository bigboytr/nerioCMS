<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                    <ActionButtons :url="'/content-form'"
                                   @trash="trash"
                                   @activeToggle="activeToggle"></ActionButtons>
                </div>
                <div class="card-body">
                    <table class="table table-hover" v-if="showTable">
                        <thead class="thead-dark">
                        <tr>
                            <th width="5%"></th>
                            <th width="5%">Erişilebilir</th>
                            <th width="20%">Başlık</th>
                            <th width="30%">Kelimeler</th>
                            <th width="15%">Son İşlem</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, key) in list" @click="selectRow(item.id)">
                            <td>

                                <input type="checkbox" :value="item.id" v-model="selectedRows">

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
    import ActionButtons from '@/components/ActionButtons'
    import NotifyMe from '@/controller/notifier'

    const module = "table_contents";


    export default {
        name: 'Contents',
        data() {
            return {
                //list: null,
                item: null,
                selectedRows: []
            }
        },
        components: {
            modal,
            MainTitle,
            EmptyList,
            Status,
            ActionButtons
        },
        mounted() {
            //contents.getAll(); // get content list from firebase
            controller.fetchData('contents', module);
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


                if (this.selectedRows.indexOf(id)) {
                    // delete
                } else {
                    this.selectedRows.push(id);
                    console.log(id);
                }
            },

            activeToggle() {
                if (this.selectedRows.length === 0) {
                    NotifyMe.notifier("warn", "Lütfen en az bir öğe seçin...")
                    return;
                }

                controller.toggleActive(this.selectedRows, module).then((res) => {
                    this.selectedRows = [];
                    if (res !== undefined) {
                        NotifyMe.notifier('success', `${res} adet öğenin durumu değiştirildi !`);

                        controller.fetchData('contents', module);
                    }
                });
            },

            trash() {
                if (this.selectedRows.length === 0) {
                    NotifyMe.notifier("warn", "Lütfen en az bir öğe seçin...")
                    return;
                }

                controller.moveToTrash(this.selectedRows, module).then((res) => {
                    this.selectedRows = [];
                    if (res !== undefined) {
                        NotifyMe.notifier('success', `${res} adet öğe çöpe atıldı !`);

                        controller.fetchData('contents', module);
                    }
                });

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
