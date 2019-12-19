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
                <div class="card-body div-table dark">

                    <div class="row div-thead" v-if="showTable">
                        <div class="col-1"></div>
                        <div class="col-1">Erişilebilir</div>
                        <div class="col-8 col-sm-4">Başlık</div>
                        <div class="col-3 col-sm-4 d-none d-sm-block">Kelimeler</div>
                        <div class="col-2 d-none d-sm-block">Son İşlem</div>
                    </div>

                    <div class="row div-tr"
                         v-if="showTable"
                         v-for="(item, key) in list" :for="'chk_+(key)'">
                        <div class="col-1">
                            <input type="checkbox" :id="'chk_'+(key)" :value="item.id" v-model="selectedRows">
                        </div>
                        <div class="col-1">
                            <Status :param="item.active"></Status>
                        </div>
                        <div class="col-8 col-sm-4">
                            <a href="javascript:void(0)" @click="editMe(item)">
                                {{item.title}}
                            </a>
                        </div>
                        <div class="col-3 col-sm-4 d-none d-sm-block">{{item.keyw}}</div>
                        <div class="col-2 d-none d-sm-block">{{item.modifiedDate}}</div>
                    </div>
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
