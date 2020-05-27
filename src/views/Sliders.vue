<template>
    <b-row>
        <div class="col-md-8">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                    <ActionButtons :url="'/slider-form'"
                                   @trash="trash"
                                   @activeToggle="activeToggle"></ActionButtons>
                </div>
                <div class="card-body div-table dark">

                    <div class="row div-thead" v-if="showTable">
                        <div class="col-1"></div>
                        <div class="col-2">Erişim</div>
                        <div class="col-5 col-sm-4">Banner</div>
                        <div class="col-2 col-sm-3 d-none d-sm-block">Kategori</div>
                        <div class="col-2 d-none d-sm-block">Sıra</div>
                    </div>

                    <div class="row div-tr"
                         v-if="showTable"
                         v-for="(item, key) in list" :for="'chk_+(key)'">
                        <div class="col-1">
                            <input type="checkbox" :id="'chk_'+(key)" :value="item.id" v-model="selectedRows">
                        </div>
                        <div class="col-2">
                            <Status :param="item.active"></Status>
                        </div>
                        <div class="col-5 col-sm-4">
                            <a :href="'./uploads/sliders/' + item.path" target="_blank">
                                {{ (item.title) ? item.title : item.path }}
                            </a>
                        </div>
                        <div class="col-2 col-sm-3 d-none d-sm-block">{{findCategoryName(item.categoryID)}}</div>
                        <div class="col-2 col-sm-2 d-none d-sm-block">{{item.queue}}</div>
                    </div>

                    <EmptyList :list="list"></EmptyList>
                </div>
            </div>
        </div>

        <SliderCategories></SliderCategories>

    </b-row>
</template>

<script>
    import controller from '@/controller/controller'
    import MainTitle from '@/components/MainTitle'
    import store from '@/store/index'
    import Status from '@/components/Status'
    import EmptyList from '@/components/EmptyList'
    import ActionButtons from '@/components/ActionButtons'
    import NotifyMe from '@/controller/notifier'
    import SliderCategories from '@/components/SliderCategories'

    const module = "table_sliders";
    const path = 'sliders'; // vuex path

    const moduleCategories = 'table_slidersCategories';
    const pathCategories = 'slidersCategories'; // vuex path


    export default {
        name: 'Sliders',
        data() {
            return {
                item: null,
                selectedRows: []
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
            //contents.getAll(); // get content list from firebase
            controller.fetchData(path, module);
            controller.fetchData(pathCategories, moduleCategories);
        },
        methods: {
            editMe(item) {
                event.stopPropagation();
                alert('link');
                this.item = item;
                //router.push('/content-form');
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

            },
            findCategoryName(catId) {

                const item = store.getters.getListOfItem(pathCategories, parseInt(catId, 10), 'id');
                return item.title;
            }
        },
        computed: {
            list() {
                return store.getters.getList(path);
            },
            showTable() {
                return this.list.length > 0
            }
        }
    };
</script>
