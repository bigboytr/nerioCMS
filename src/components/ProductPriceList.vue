<template>
    <div class="div-table dark">



        <div class="row div-thead">

            <div class="col-6">Başlık</div>
            <div class="col-1">Kod</div>
            <div class="col-2">Fiyat</div>
            <!--<div class="col-2">Kampanyalı</div>-->
            <div class="col-1">Vitrin</div>
            <!--<div class="col-1">Aktif</div>-->
            <div class="col-1"></div>
        </div>



        <hr>

        <div class="row div-tr" v-for="item in list"
             v-if="parseInt(item.productID, 10) === parseInt($props.prodId, 10)">


            <div class="col-6">
                <a href="javascript:void(0)">
                    {{item.title}}
                </a>
            </div>
            <div class="col-1">{{item.code}}</div>
            <div class="col-2">{{item.price_list}} TL</div>
            <!--<div class="col-2">{{item.price_campaing}}</div>-->
            <div class="col-1">

                <button type="button" v-show="parseInt(item.showcase, 10) === 0"
                        class="btn btn-light btn-sm" @click="showcase(item.id)">
                    <i class="fas fa-eye"></i>
                </button>
            </div>

            <!--<div class="col-1">
                <Status :param="item.active"></Status>
            </div>-->
            <div class="col-1">
                <button type="button" class="btn btn-danger btn-sm" @click="trash(item.id)">
                    <i class="fas fa-times"></i>
                </button>

            </div>
        </div>

        <div class="row mt-2">
            <div class="col-6">
                <input type="text" class="form-control form-control-sm" v-model="dto.title">
            </div>
            <div class="col-1">
                <input type="text" class="form-control form-control-sm" v-model="dto.code">
            </div>
            <div class="col-2">
                <input type="number" class="form-control form-control-sm" v-model="dto.price_list">
            </div>
            <!--<div class="col-2">
                <input type="number" class="form-control form-control-sm" v-model="dto.price_campaing">
            </div>-->
            <div class="col-1">
                <input type="checkbox" v-model="dto.showcase">
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-sm btn-primary btn-block" @click="save()">
                    <i class="fas fa-arrow-circle-right fa-fw"></i>
                    Kaydet
                </button>
            </div>
        </div>
    </div>


</template>

<script>
    import store from "@/store";
    import controller from '@/controller/controller'
    import Status from '@/components/Status'
    import NotifyMe from '@/controller/notifier'

    const module = "table_productsPricing";
    const path = "productsPrice";

    export default {
        name: "ProductList",
        props: {
            prodId: {
                type: Number
            }
        },
        data() {
            return {
                selectedRows: [],
                dto: {
                    title: "",
                    code: "",
                    price_list: 0.00,
                    price_campaing: 0.00,
                    showcase: false,
                    productID: this.$props.prodId
                },
                dtoBackup: {}
            }
        },
        components: {
            Status
        },
        mounted() {
            //contents.getAll(); // get content list from firebase
            //controller.fetchData(path, module);
            this.dtoBackup = {...this.dto};
        },
        methods: {
            save() {
                controller.save(this.dto, module).then(() => {
                    NotifyMe.notifier('success', `Fiyat eklendi...`);
                    controller.fetchData(path, module);
                    this.dto = this.dtoBackup;
                }).catch((error) => {
                    console.log(error);
                    NotifyMe.notifier('error', `Hata oluştu !`);
                });
            },
            trash(id) {

                controller.moveToTrash([...id], module).then((res) => {

                    if (res !== undefined) {
                        NotifyMe.notifier('success', `${res} adet öğe çöpe atıldı !`);

                        controller.fetchData(path, module);
                    }
                });
            }
        },
        computed: {
            list() {
                return store.getters.getList(path);
            },
        }
    }
</script>