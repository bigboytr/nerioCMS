<template>
    <div class="col-4">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-2">
                    <i class="fas fa-angle-double-right"></i>
                    Slider Kategorileri
                </h5>

                <ActionButtons :showAdd="false"
                               @trash="trash"
                               @activeToggle="activeToggle"></ActionButtons>
            </div>
            <div class="card-body div-table dark">
                <div class="row div-thead" v-if="showTable">
                    <div class="col-1"></div>
                    <div class="col-3">Aktif</div>
                    <div class="col-8 col-sm-4">Başlık</div>
                </div>

                <div class="row div-tr"
                     v-if="showTable"
                     v-for="(item, key) in list" :for="'chk_+(key)'">
                    <div class="col-1">
                        <input type="checkbox" :id="'chk_'+(key)" :value="item.id" v-model="selectedRows">
                    </div>
                    <div class="col-3">
                        <Status :param="item.active"></Status>
                    </div>
                    <div class="col-8 col-sm-4">
                        <a href="javascript:void(0)" >
                            {{item.title}}
                        </a>
                    </div>
                </div>

                <div class="form-row mt-3">
                    <div class="col-8">
                        <input type="text" class="form-control form-control-sm" v-model="dto.title">
                    </div>
                    <div class="col-4">
                        <button class="btn btn-sm btn-primary" @click="save()">
                            <i class="fas fa-arrow-right"></i>
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ActionButtons from '@/components/ActionButtons'
    import controller from '@/controller/controller'
    import store from '@/store'
    import Status from '@/components/Status'
    import NotifyMe from '@/controller/notifier'

    const module = 'table_slidersCategories';
    const path = 'slidersCategories';

    export default {
        name: "SliderCategories",
        components: {
            ActionButtons,
            Status
        },
        data() {
            return {
                selectedRows: [],
                dto: {
                    title: ""
                }
            }
        },
        mounted() {

            controller.fetchData(path, module);
        },
        methods: {
            save() {
                controller.save(this.dto, module).then((response) => {

                    controller.fetchData(path, module);
                    this.dto.title = "";

                }).catch((error) => {
                    console.log(error);
                });
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
                    this.selectedRows = [];
                    if (res !== undefined) {
                        NotifyMe.notifier('success', `${res} adet öğe çöpe atıldı !`);

                        controller.fetchData(path, module);
                    }
                });

            }
        },
        computed: {
            list() {
                return store.getters.getList(path)
            },
            showTable() {
                return this.list.length > 0
            }
        }
    }
</script>