<template>
    <div class="row">
        <div class="col-md-12">

            <div class="alert alert-info">
                İçerik sayfalarınızı yönetebilirsiniz.
            </div>


            <div class="card">
                <div class="card-header">
                    <MainTitle></MainTitle>

                    <router-link to="/contet-form" tag="button" class="btn btn-sm btn-dark">
                        <i class="fas fa-plus"></i>
                        Ekle
                    </router-link>

                </div>
                <div class="card-body">
                    <table class="table table-hover" v-show="list">
                        <thead class="thead-dark">
                        <tr>
                            <th width="10%"></th>
                            <th width="20%">Başlık</th>
                            <th width="20%">URL</th>
                            <th width="20%">Hedef</th>
                            <th width="10%">Link Tip</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, key) in list" :for="'chk_+(key)'">
                            <td>

                                <input type="checkbox" :id="'chk_'+(key)" :value="key">

                            </td>
                            <td>
                                <a href="javascript:void(0)" @click="editMe(item)">
                                    {{item.title}}
                                </a>
                            </td>
                            <td>{{item.url}}</td>
                            <td>{{item.target}}</td>
                            <td>{{typeOfLink(item.type)}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3 v-show="!list">Henüz eklenmiş veri bulunamadı !</h3>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import controller from '@/controller/contents'
    import modal from '@/components/Modal'
    import MainTitle from '@/components/MainTitle'

    export default {
        name: 'Contents',
        data() {
            return {
                list: null,
                item: null
            }
        },
        components: {
            modal,
            MainTitle
        },
        mounted() {

            controller.getAll(); // get content list from firebase

        },
        methods: {
            openModal() {

                $("#modal").modal("show");
            },
            editMe(item) {
                this.item = item;
                $("#modal").modal("show");
            }
        }
    };
</script>
