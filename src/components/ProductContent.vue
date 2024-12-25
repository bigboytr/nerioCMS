<template>
<div>
    <div class="form-group col-12">
        <label class="form-label">Başlık</label>
        <input type="text" class="form-control" v-model="dto.title">
    </div>

    <div class="form-group col-12">
        <label class="form-label">Özet İçerik</label>
        <vue-editor v-model="dto.spot_contents" ></vue-editor>
    </div>

    <div class="form-group col-12">
        <label class="form-label">İçerik</label>
        <vue-editor v-model="dto.contents"></vue-editor>
    </div>

    <div class="form-group col-12">
        <button type="button" class="btn btn-primary" @click="save()">
            <i class="fas fa-arrow-circle-right fa-fw"></i>
            Kaydet
        </button>
    </div>
</div>
</template>

<script>
    import store from "@/store";
    import controller from '@/controller/controller'
    import Status from '@/components/Status'
    import NotifyMe from '@/controller/notifier'
    import {VueEditor} from "vue2-editor";

    const module = "table_productsContents";
    const path = "productsContents";

    export default {
        name: "ProductList",
        props: {
            prodId: {
                type: Number
            }
        },
        data() {
            return {
                dto: {
                    id: 0,
                    title: "",
                    spot_contents: "",
                    contents: "",
                    productID: this.$props.prodId,
                    update: false
                }
            }
        },
        components: {
            Status,
            VueEditor
        },
        mounted() {
            //contents.getAll(); // get content list from firebase
            //controller.fetchData(path, module);
            /*this.item = store.getters.getListOfItem(path, this.$props.prodId, 'productID');

            if (this.item) {
                this.dto = {...this.dto, ...this.item};
            }*/

            this.dto = {...this.dto, ...store.getters.getListOfItem(path, this.$props.prodId, 'productID')}
        },
        methods: {
            save() {
                controller.save(this.dto, module).then(() => {

                    NotifyMe.notifier('success', `Ürün bilgisi kaydedildi...`);
                    controller.fetchData(path, module)

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
            /*list() {
                //return store.getters.getList(path);

            },*/
            /*title() {
                return this.dto.title = this.item.title;
                //return this.item.title;
            },
            spot() {
                return this.dto.spot_contents = this.item.spot_contents;
                //return this.item.spot_contents;
            },
            main() {
                return this.dto.contents = this.item.contents;
                //return this.item.contents;
            }*/
        }
    }
</script>