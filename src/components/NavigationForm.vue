<template>
    <div class="row">

        <div class="col-md-12">

            <div class="form-group">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">

                    <label class="btn btn-primary" :class="(index === 0) ? 'active' : ''"
                           v-for="(type, index) in urlTypes">
                        <input type="radio" :value="index" v-model="dto.type"> {{type}}
                    </label>

                    <!--<label class="btn btn-primary active">
                        <input type="radio" id="option1" value="1" v-model="dto.type" checked> İçerik
                    </label>
                    <label class="btn btn-primary">
                        <input type="radio" id="option2" value="2" v-model="dto.type"> Ürün
                    </label>
                    <label class="btn btn-primary">
                        <input type="radio" id="option3" value="3" v-model="dto.type"> İletişim
                    </label>-->
                </div>
            </div>


        </div>

        <div class="col-md-8">
            <div class="form-group">
                <label class="form-label">Başlık</label>
                <input type="text" class="form-control" v-model="dto.title">
            </div>
        </div>

        <div class="form-check col-md-4">
            <label class="form-label">&nbsp;</label>
            <input class="form-check-input" type="checkbox" value="_blank" id="yeni_p" v-model="targetInput">
            <label class="form-check-label" for="yeni_p">
                Yeni pencerede açılsın
            </label>
        </div>

        <div class="form-group col-md-6">
            <label class="form-label">URL</label>
            <input type="text" class="form-control" v-model="dto.url">
        </div>

        <div class="form-group col-md-6">
            <label class="form-label">Sayfalar</label>
            <select class="form-control" v-model="dto.page">
                <option value="0" selected>----</option>
            </select>
        </div>

        <div class="form-group col-md-12">
            <label class="form-label">Üst Öğe</label>
            <select size="7" class="form-control" v-model="dto.parent">
                <option value="0" selected>Üst öğe yok</option>
            </select>
        </div>


        <div class="form-group col-md-12">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="save()">Save changes</button>
        </div>
    </div>
</template>

<script>
    import controller from '@/controller/navigation'
    import store from '@/store/index'

    export default {
        name: 'NavigationForm',
        props: ['item'],
        data() {
            return {
                targetInput: false,
                dto: {
                    title: "",
                    url: "",
                    page: "",
                    target: this.targetInputF,
                    parent: 0,
                    type: 0
                }

            }
        },
        methods: {
            save() {
                controller.save(this.dto).then(function () {
                    alert("başarılı");
                });
            }
        },
        computed: {
            targetInputF() {
                this.dto.target = this.targetInput ? "_blank" : "_self"
            },
            urlTypes() {
                return store.getters.getUrlTypes
            }
        }
    };
</script>