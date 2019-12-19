<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                    <ActionButtons :url="'/navigation-form'"
                                   @trash="trash"
                                   @activeToggle="activeToggle"></ActionButtons>
                </div>
                <div class="card-body div-table dark">


                    <div class="row div-thead" v-if="showTable">
                        <div class="col-1"></div>
                        <div class="col-1">Erişilebilir</div>
                        <div class="col-8 col-sm-3">Başlık</div>
                        <div class="col-3 d-none d-sm-block">URL</div>
                        <div class="col-2 d-none d-sm-block">Hedef</div>
                        <div class="col-2 d-none d-sm-block">Link Tip</div>
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
                        <div class="col-8 col-sm-3">
                            <a href="javascript:void(0)" @click="editMe(item)">
                                {{item.title}}
                            </a>
                        </div>
                        <div class="col-3 d-none d-sm-block">{{item.href}}</div>
                        <div class="col-2 d-none d-sm-block">{{item.target}}</div>
                        <div class="col-2 d-none d-sm-block">{{typeOfLink(item.type)}}</div>
                    </div>

                    <EmptyList :list="list"></EmptyList>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import controller from '@/controller/controller'
    import store from '@/store'
    import modal from '@/components/Modal'
    import MainTitle from '@/components/MainTitle'
    import EmptyList from '@/components/EmptyList'
    import Status from '@/components/Status'
    import NotifyMe from '@/controller/notifier'
    import ActionButtons from '@/components/ActionButtons'
    const module = "table_navigation";

    export default {
        name: 'Navigation',
        data() {
            return {
                selectedRows: [],
                item: null
            }
        },
        components: {
            MainTitle,
            Status,
            EmptyList,
            ActionButtons,
            modal
        },
        mounted() {
            //contents.getAll(); // get content list from firebase
            controller.fetchData('navigation', module);
        },
        methods: {

            editMe(item) {
                this.item = item;
                //$("#modal").modal("show");
            },
            typeOfLink(type) {
                return store.getters.getUrlTypes(type);
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

                        controller.fetchData('navigation', module);
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

                        controller.fetchData('navigation', module);
                    }
                });
            },
        },
        computed: {
            list() {
                const fullList = store.getters.getList('navigation'); // full list
                const topLevel = store.getters.getNavigationList(0); // level 0

                return topLevel

                //return
            },
            showTable() {
                return this.list.length > 0
            }
        }
    };
</script>
