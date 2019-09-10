<template>
    <div class="row">
        <div class="col-md-12">

            <div class="alert alert-info">
                Web sitenizin linklerini yönetebileceğiniz işlemleri gerçekleştirebilirsiniz.
                Yeni bir link eklemek için sağ taraftaki butona tıklayınız.
            </div>


            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="panel-title">
                        Liste
                        <button class="btn btn-sm btn-default pull-right" @click="openModal()">
                            <i class="fas fa-plus"></i>
                            Ekle
                        </button>
                    </div>
                </div>
                <div class="panel-body">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th width="20%">Başlık</th>
                            <th width="30%">URL</th>
                            <th width="30%">Hedef</th>
                            <th width="15%"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, key) in list">
                            <td>{{item.title}}</td>
                            <td>{{item.url}}</td>
                            <td>{{item.target}}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <modal :title="'Test'" :id="'modal'" :cssClass="'modal-lg'">
            <navigationForm></navigationForm>
        </modal>
    </div>
</template>

<script>
    import controller from '@/controller/navigation'
    import modal from '@/components/Modal'
    import navigationForm from '@/components/NavigationForm'

    export default {
        name: 'Dashboard',
        data() {
            return {
                list: {}
            }
        },
        components: {
            modal,
            navigationForm
        },
        mounted() {
            const self = this;
            controller.getAll().then(function (response) {

                self.list = response;
            });
        },
        methods: {
            openModal() {

                $("#modal").modal("show");
            }
        }
    };
</script>
