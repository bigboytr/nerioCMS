<template>
    <b-col cols="4" class="p-0">

        <b-card no-body>
            <b-card-header>
                <h5 class="mb-2">
                    <i class="fas fa-angle-double-right"></i>
                    Slider Kategorileri
                </h5>

                <ActionButtons
                        :showAdd="false"
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


                    <template v-slot:cell(selector)="row">
                        <i class="fas fa-check" v-if="row.rowSelected"></i>
                    </template>
                    <template v-slot:cell(active)="row">
                        <Status :param="row.item.active"></Status>
                    </template>
                    <template v-slot:cell(title)="row">
                        {{row.item.title}}
                        <b-icon-trash v-if="row.item.deleted" title="Silinmiş !"/>
                    </template>
                </b-table>

                <EmptyList :list="list"></EmptyList>
            </b-card-body>
            <b-card-footer>

                <label>Başlık</label>
                <b-input-group>
                    <b-form-input type="text" v-model="dto.title"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="primary" size="sm" @click="save()">
                            <i class="fas fa-arrow-right"></i>
                            Kaydet
                        </b-button>
                    </b-input-group-append>
                </b-input-group>

            </b-card-footer>
        </b-card>
    </b-col>
</template>
<script>
    import ActionButtons from '@/components/ActionButtons'
    import store from '@/store'
    import Status from '@/components/Status'
    import EmptyList from "./EmptyList";

    import CommonModule from "../controller/commonModule";
    const module = 'table_slidersCategories';
    const collection = 'sliderCategories';
    const dataMap = [
        "title",
        "created",
        "modified",
        "active",
        "deleted"
    ];

    export default {
        name: "SliderCategories",
        components: {
            ActionButtons,
            Status,
            EmptyList
        },
        data() {
            return {
                controller: new CommonModule(collection, dataMap),
                selectedRows: [],
                dto: {
                    title: "",
                    active: true,
                    deleted: false,
                    created: new Date().toLocaleString(),
                    modified: null
                },
                fields: [
                    {
                        key: 'selector',
                        label: ''
                    },
                    {
                        key: "title",
                        label: "Kategori"
                    },
                    {
                        key: 'active',
                        label: 'Aktif'
                    }
                ]
            }
        },
        mounted() {
            this.controller.getAll();
        },
        methods: {
            save() {
                this.controller.save(false, this.dto).then((response) => {

                    if (response) {
                        this.dto.title = "";
                        this.dto.active = true;
                        this.dto.deleted = false;
                        this.dto.created = new Date().toLocaleString();
                    }

                }).catch((error) => {
                    console.log(error);
                });
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
                return store.getters.getList(collection)
            },
            showTable() {
                return this.list.length > 0
            },
            isActionsDisabled() {
                // selected row yoksa actionlar disable edilecek
                return !this.selectedRows.length > 0
            }
        }
    }
</script>