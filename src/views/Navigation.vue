<template>
    <div class="row">
        <div class="col-12">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                    <button type="button" @click="load()">Load</button>

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

                    <NavigationList
                            v-if="showTable"
                            v-for="(item, key) in list" :for="key"
                            :item="item" :depth="0"></NavigationList>

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
    import NavigationList from '@/components/NavigationList'

    import firebase from 'firebase';

    const module = "table_navigation";
    const path = 'navigation';

    export default {
        name: 'Navigation',
        data() {
            return {
                //selectedRows: [],
                item: null
            }
        },
        components: {
            MainTitle,
            Status,
            EmptyList,
            ActionButtons,
            NavigationList,
            modal
        },
        mounted() {
            //contents.getAll(); // get content list from firebase
            //controller.fetchData(path, module);

        },
        methods: {

            load() {

                /*const self = this;

                let list = [];
                firebase.firestore().collection('navigation').get().then((snapshot) => {

                    snapshot.docs.map((item) => {
                        list.push({
                            title: item.data().title,
                            path: item.data().path,
                            queue: item.data().queue
                        })
                    })
                }).then(() =>{

                    this.$store.dispatch('setSelectedRowsEmpty', {
                        path: 'navigation',
                        list: list
                    });
                })*/
            },
            editMe(item) {
                this.item = item;
                //$("#modal").modal("show");
            },
            /*getId(id) {
                alert(id);
                this.selectedRows.push(parseInt(id, 10));
            },*/
            activeToggle() {
                if (this.selectedRows.length === 0) {
                    NotifyMe.notifier("warn", "Lütfen en az bir öğe seçin...")
                    return;
                }

                controller.toggleActive(this.selectedRows, module).then((res) => {
                    //this.selectedRows = [];
                    if (res !== undefined) {
                        NotifyMe.notifier('success', `${res} adet öğenin durumu değiştirildi !`);

                        controller.fetchData(path, module);
                    }
                });
            },
            trash() {
                if (this.selectedRows.length === 0) {
                    NotifyMe.notifier("warn", "Lütfen en az bir öğe seçin...")
                    return;
                }

                controller.moveToTrash(this.selectedRows, module).then((res) => {
                    //this.selectedRows = [];
                    if (res !== undefined) {
                        NotifyMe.notifier('success', `${res} adet öğe çöpe atıldı !`);

                        controller.fetchData(path, module);
                        store.dispatch('setSelectedRowsEmpty');
                    }
                });
            },
        },
        computed: {
            list() {
                //const fullList = store.getters.getList(path); // full list
                const topLevel = store.getters.getRecursiveList(path); // level 0

                return topLevel

                //return
            },
            showTable() {
                return this.list.length > 0
            },
            selectedRows() {
                return store.getters.getSelectedRows;
            }
        }
    };
</script>
