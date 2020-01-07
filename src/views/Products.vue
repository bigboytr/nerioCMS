<template>
    <div class="row">
        <div class="col-md-8">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                    <ActionButtons :showAdd="false"
                                   @trash="trash"
                                   @activeToggle="activeToggle"></ActionButtons>
                </div>
                <div class="card-body div-table dark">

                    <div class="row div-thead" v-if="showTable">
                        <div class="col-1"></div>
                        <div class="col-2">Erişilebilir</div>
                        <div class="col-8">Başlık</div>
                        <div class="col-1"></div>
                    </div>

                    <ProductList
                            v-if="showTable"
                            v-for="(item, key) in list" :for="key"
                            :item="item" :depth="0"
                            @sendId="getId"
                    ></ProductList>

                    <EmptyList :list="list"></EmptyList>
                </div>
            </div>
        </div>

        <ProductForm></ProductForm>
    </div>
</template>

<script>

    import controller from '@/controller/controller'
    import store from "@/store";
    import EmptyList from '@/components/EmptyList'
    import MainTitle from '@/components/MainTitle'
    import ProductList from '@/components/ProductList'
    import ProductForm from '@/components/ProductForm'
    import ActionButtons from '@/components/ActionButtons'
    import NotifyMe from '@/controller/notifier'

    const module = "table_products";
    const path = 'products'; // store path

    export default {
        name: 'Products',
        components: {
            EmptyList,
            MainTitle,
            ProductList,
            ProductForm,
            ActionButtons
        },
        data() {
            return {
                selectedRows: []
            }
        },
        methods: {
            getId(id) {
                this.selectedRows.push(parseInt(id, 10));
            },
            trash() {
                if (this.selectedRows.length === 0) {
                    NotifyMe.notifier("warn", "Lütfen en az bir öğe seçin...")
                    return;
                }

                controller.moveToTrash(this.selectedRows, module).then((res) => {
                    if (res !== undefined) {
                        this.selectedRows = [];
                        NotifyMe.notifier('success', `${res} adet öğe çöpe atıldı !`);

                        controller.fetchData(path, module);
                    }
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
            }
        },
        computed: {
            list() {
                return store.getters.getRecursiveList(path)
            },
            showTable() {
                return this.list.length > 0
            }
        }
    }
</script>