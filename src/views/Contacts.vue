<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                </div>
                <div class="card-body">

                    <div class="row">
                        <div class="col-3">
                            <div class="card">
                                <div class="card-body">
                                    <h3>İletişim Başlık</h3>
                                    <p>
                                        <strong>Adres: </strong>
                                        1202/2 Sokak No:80/B Temsil Plaza Yenişehir İzmir
                                    </p>
                                    <p>
                                        <strong>Telefon: </strong> 0(232) 123 45 66
                                    </p>
                                    <p>
                                        <strong>Email: </strong> info@something.com
                                    </p>
                                    <p>
                                        <button class="btn btn-sm btn-warning">
                                            <i class="fas fa-map-marker-alt"></i>
                                            Harita
                                        </button>
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-sm btn-danger">
                                        <i class="fas fa-times"></i>
                                        Bilgileri sil !
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-block btn-outline-dark full-height">
                                <i class="fas fa-plus-circle"></i>
                                <br> Yeni Adres Ekle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import controller from '@/controller/controller'
    import store from '@/store'
    import MainTitle from '@/components/MainTitle'

    export default {
        name: 'Contacts',
        components: {
            MainTitle
        }
    }
</script>

<style scoped>
    .full-height {
        height: 100%;
    }
</style>