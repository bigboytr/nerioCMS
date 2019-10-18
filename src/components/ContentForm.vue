<template>
    <div class="row">

        <div class="col-md-12">
            <div class="form-group">
                <label class="form-label">Başlık</label>
                <input type="text" class="form-control" v-model="dto.title">
            </div>
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