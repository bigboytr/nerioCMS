<template>
    <b-row>
        <b-col cols="8">
            <b-card no-body>
                <b-card-header>
                    <MainTitle class="mb-2"></MainTitle>

                    <ActionButtons
                            :url="'/slider-form'"
                            :isActionsDisabled="isActionsDisabled"
                            @trash="trash"
                            @activeToggle="activeToggle"/>
                </b-card-header>
                <b-card-body>
                    <b-table
                            v-if="showTable"
                            selectable
                            striped hover
                            :fields="fields"
                            :items="list"
                            @row-selected="onRowSelected">


                        <template v-slot:cell(path)="row">
                            <a :href="row.item.path" target="_blank">Slider</a>
                        </template>
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
        </b-col>

        <SliderCategories />

    </b-row>
</template>

<script>
    import MainTitle from '@/components/MainTitle'
    import store from '@/store/index'
    import Status from '@/components/Status'
    import EmptyList from '@/components/EmptyList'
    import ActionButtons from '@/components/ActionButtons'
    import SliderCategories from '@/components/SliderCategories'
    import CommonModule from "../controller/commonModule";

    const collection = 'sliders'; // vuex path
    const collectionCategories = 'sliderCategories'; // vuex path

    const dataMap = [
        "active",
        "deleted",
        "created",
        "modified",
        "caption",
        "link",
        "slider",
        "category",
        "queue",
        "title"
    ];
    export default {
        name: 'Sliders',
        data() {
            return {
                controller: new CommonModule(collection, dataMap),
                item: null,
                selectedRows: [],
                fields: [
                    {
                        key: 'selector',
                        label: ''
                    },
                    {
                        key: "title",
                        label: "Başlık"
                    },
                    {
                        key: "category",
                        label: "Kategori"
                    },
                    {
                        key: "path",
                        label: "Slider Resim"
                    },
                    {
                        key: "queue",
                        label: "Sıra"
                    },
                    {
                        key: 'active',
                        label: 'Aktif'
                    }
                ]
            }
        },
        components: {
            MainTitle,
            EmptyList,
            Status,
            ActionButtons,
            SliderCategories
        },
        mounted() {
            this.controller.getAll();
        },
        methods: {
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
                return store.getters.getList(collection);
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
