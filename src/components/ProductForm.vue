<template>
    <div class="col-4">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-2">
                    <i class="fas fa-angle-double-right"></i>
                    Ürün Formu
                </h5>
            </div>
            <div class="card-body div-table dark">


                <div class="form-group">
                    <label>Başlık</label>
                    <input type="text" class="form-control form-control-sm" v-model="dto.title">
                </div>

                <div class="form-group">
                    <label>Sıra</label>
                    <input type="number" class="form-control form-control-sm" v-model.number="maxNumber">
                </div>

                <div class="form-group">
                    <label class="form-label">Üst Öğe</label>
                    <select class="form-control" v-model="dto.parent" size="6">
                        <option value="0" selected>----</option>
                        <option v-for="i in list"
                                :value="i.id"
                                v-if="list.length > 0 && parseInt(i.parent, 10) === 0">
                            {{i.title}}</option>
                    </select>
                </div>

                <div class="from-group">
                    <button class="btn btn-sm btn-primary" @click="save()">
                        <i class="fas fa-arrow-right"></i>
                        Kaydet
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import controller from '@/controller/controller'
    import store from '@/store'
    import Status from '@/components/Status'
    import NotifyMe from '@/controller/notifier'

    const module = 'table_products';
    const path = 'products';

    export default {
        name: "ProductsForm",
        components: {
            Status
        },
        data() {
            return {
                dto: {
                    title: "",
                    queue: 0,
                    parent: 0
                }
            }
        },
        mounted() {

            //controller.fetchData(path, module);
        },
        methods: {
            save() {
                controller.save(this.dto, module).then((response) => {

                    controller.fetchData(path, module);
                    this.dto.title = "";
                    this.dto.queue = this.maxNumber;
                    this.dto.parent = 0;

                    NotifyMe.notifier('success', 'Ürün eklendi.');

                }).catch((error) => {
                    console.log(error);
                    NotifyMe.notifier('success', 'Ürün eklerken hata oluştur.');

                });
            }
        },
        computed: {
            list() {
                return store.getters.getList(path)
            },
            maxNumber() {
                this.dto.queue = this.list.length + 1;
                return this.list.length + 1;

            }
        }
    }
</script>