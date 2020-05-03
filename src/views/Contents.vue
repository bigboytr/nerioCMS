<template>

    <b-card no-body>
        <b-card-header>
            <MainTitle class="mb-2"></MainTitle>

            <ActionButtons :url="'/content-form'"
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
    import MainTitle from '@/components/MainTitle'
    import store from '@/store/index'
    import Status from '@/components/Status'
    import EmptyList from '@/components/EmptyList'
    import ActionButtons from '@/components/ActionButtons'
    import CommonModule from "../controller/commonModule";

    export default {
        name: 'Contents',
        data() {
            return {
                controller: new CommonModule('pages'),
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
                        key: 'metaKeyword',
                        label: 'Kelimeler'
                    },
                    {
                        key: 'metaDescription',
                        label: 'Sayfa Tanımı'
                    },
                    {
                        key: 'active',
                        label: 'Aktif'
                    }
                ],
                selectedRows: []
            }
        },
        components: {
            MainTitle,
            EmptyList,
            Status,
            ActionButtons
        },
        mounted() {
            this.controller.getAll([
                "title",
                "spot",
                "fulltext",
                "created",
                "modified",
                "metaDescription",
                "metaKeyword",
                "active",
                "deleted"
            ]); // get content list from firebase
            //controller.fetchData('contents', module);
        },
        methods: {
            editMe() {
                //this.item = item;
                this.$router.push('/content-form');
            },
            onRowSelected(items) {
                this.selectedRows = items;
            },
            activeToggle() {
                this.controller.activeToggle(this.selectedRows)
            },
            trash() {
                this.controller.moveToTrash(this.selectedRows)
            }
        },
        computed: {
            list() {
                return store.getters.getList('pages');
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
