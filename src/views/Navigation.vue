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
                <template v-slot:cell(title)="row">
                    {{row.item.title}}
                    <b-icon-trash v-if="row.item.deleted"/>
                </template>
            </b-table>

            <EmptyList :list="list"></EmptyList>
        </b-card-body>
    </b-card>
</template>

<script>
    //import controller from '@/controller/navigation'
    import store from '@/store'
    import modal from '@/components/Modal'
    import MainTitle from '@/components/MainTitle'
    import EmptyList from '@/components/EmptyList'
    import Status from '@/components/Status'
    import NotifyMe from '@/controller/notifier'
    import ActionButtons from '@/components/ActionButtons'
    import NavigationList from '@/components/NavigationList'

    import NavigationModule from "../controller/navigation";

    const module = "table_navigation";
    const path = 'navigation';

    export default {
        name: 'Navigation',
        data() {
            return {
                controller: new NavigationModule(),
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
            this.controller.getAll();
        },
        methods: {
            editMe(item) {

                //$("#modal").modal("show");
            },
            onRowSelected(items) {
                this.selectedRows = items;
            },
            checkSelectedRowCount() {
                if (this.selectedRows.length === 0) {
                    NotifyMe.notifier("warn", "Lütfen en az bir öğe seçin...")
                    return;
                }
            },
            activeToggle() {

                this.checkSelectedRowCount();

                this.controller.activeToggle(this.selectedRows).then(countS => {
                    NotifyMe.notifier('success', `${countS} adet öğenin durumu değiştirildi !`);
                })
            },
            trash() {
                this.checkSelectedRowCount();

                this.controller.moveToTrash(this.selectedRows).then(countS => {
                    NotifyMe.notifier('success', `${countS} adet öğe çöpe atıldı !`);
                })
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
