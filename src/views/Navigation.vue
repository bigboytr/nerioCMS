<template>

    <b-card no-body>
        <b-card-header>
            <MainTitle class="mb-2"></MainTitle>

            <ActionButtons :url="'/navigation-form'"
                           :isActionsDisabled="isActionsDisabled"
                           @trash="trash"
                           @activeToggle="activeToggle"/>
        </b-card-header>
        <b-card-body>
            <b-table v-if="showTable"
                     selectable
                     striped hover
                     :fields="fields"
                     :items="list"
                     @row-selected="onRowSelected"
            >

                <template v-slot:cell(selector)="row">
                    <i class="fas fa-check" v-if="row.rowSelected"></i>
                </template>
                <template v-slot:cell(active)="row">
                    <Status :param="row.item.active"></Status>
                </template>
            </b-table>

            <EmptyList :list="list"></EmptyList>
        </b-card-body>
    </b-card>
</template>

<script>
    import controller from '@/controller/navigation'
    import store from '@/store'
    import modal from '@/components/Modal'
    import MainTitle from '@/components/MainTitle'
    import EmptyList from '@/components/EmptyList'
    import Status from '@/components/Status'
    import NotifyMe from '@/controller/notifier'
    import ActionButtons from '@/components/ActionButtons'
    import NavigationList from '@/components/NavigationList'

    const module = "table_navigation";
    const path = 'navigation';

    export default {
        name: 'Navigation',
        data() {
            return {
                fields: [
                    {
                        key: 'selector',
                        label: ''
                    },
                    {
                        key: 'title',
                        label: 'Başlık'
                    },
                    {
                        key: 'path',
                        label: 'URL'
                    },
                    {
                        key: 'queue',
                        label: 'Sıra'
                    },
                    {
                        key: 'active',
                        label: 'Aktif'
                    },
                    {
                        key: 'type',
                        label: 'Tip',
                        formatter: (value) => {
                            return store.getters.getUrlTypes(value);
                        }
                    }
                ],
                selectedRows: []
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
            //controller.fetchData(path, module);
            controller.getAll();
        },
        methods: {
            editMe(item) {

                //$("#modal").modal("show");
            },
            onRowSelected(items) {
                this.selectedRows = items;
            },
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
                    }
                });
            },
        },
        computed: {
            list() {
                return store.getters.getList('navigation');
                //return []

                /*const topLevel = store.getters.getRecursiveList(path); // level 0

                return topLevel*/

                //return
            },
            showTable() {
                return this.list.length > 0
            },
            isActionsDisabled() {
                // selected row yoksa actionlar disable edilecek
                return !this.selectedRows.length > 0
            }
        }
    };
</script>
