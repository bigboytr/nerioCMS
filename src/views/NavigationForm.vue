<template>
    <div class="row">

        <div class="col-12">

            <div class="card card-light">

                <div class="card-header">
                    <MainTitle></MainTitle>
                </div>

                <div class="card-body">

                    <div class="row">
                        <div class="col-12">
                            <label>Link Tipi</label>
                            <div class="form-group">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label class="btn btn-primary" :class="(index === 0) ? 'active' : ''"
                                           v-for="(type, index) in urlTypes">
                                        <input type="radio" :value="index" v-model="dto.type"> {{type}}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group col-8">
                            <div class="form-group">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" v-model="dto.title">
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <label class="form-label">URL</label>
                            <input type="text" class="form-control" v-model="dto.url">
                        </div>

                        <div class="form-group col-6">
                            <label class="form-label">Sayfalar</label>
                            <select class="form-control" v-model="dto.page">
                                <option value="0" selected>----</option>
                            </select>
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Üst Öğe</label>
                            <select size="7" class="form-control" v-model="dto.parent">
                                <option value="0" selected>Üst öğe yok</option>
                            </select>
                        </div>

                        <div class="form-check col-4">
                            <input class="form-check-input" type="checkbox" id="yeni_p" v-model="targetInput">
                            <label class="form-check-label" for="yeni_p">
                                Yeni pencerede açılsın
                            </label>
                        </div>


                    </div>

                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <button type="button" class="btn btn-warning">Close</button>
                        <button type="button" class="btn btn-primary" @click="save()">Save changes</button>
                    </div>
                </div>



            </div>

        </div>



    </div>
</template>

<script>
    import controller from '@/controller/navigation'
    import store from '@/store/index'
    import MainTitle from '@/components/MainTitle'

    export default {
        name: 'NavigationForm',
        props: ['item'],
        components: {
            MainTitle
        },
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