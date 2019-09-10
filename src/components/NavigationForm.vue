<template>
    <div class="row">
        <div class="form-group col-md-12">
            <label class="form-label">Başlık</label>
            <input type="text" class="form-control" v-model="dto.title">
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
            <label class="form-label">Hedef</label>

            <select class="form-control" v-model="dto.target">
                <option value="_self">Kendi Penceresinde</option>
                <option value="_blank">Yeni Pencerede</option>
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

    export default {
        name: 'NavigationForm',
        data() {
            return {
                dto: {
                    title: "",
                    url: "",
                    page: "",
                    target: "_self",
                    parent: 0
                }

            }
        },
        methods: {
            save() {
                controller.save(this.dto).then(function () {
                    alert("başarılı");
                });
            }
        }
    };
</script>