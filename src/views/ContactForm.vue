<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card card-light">
                <div class="card-header">
                    <MainTitle></MainTitle>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label class="form-label">Başlık</label>
                            <input type="text" class="form-control" v-model="dto.title">
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Adres</label>
                            <input type="text" class="form-control" v-model="dto.address">
                        </div>

                        <div class="form-group col-12">
                            <label class="form-label">Harita Kodu</label>
                            <textarea class="form-control" v-model="dto.map_embed" rows="5"></textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <router-link to="/contact" tag="button" class="btn btn-warning">
                            <i class="fas fa-times fa-fw"></i>
                            Vazgeç
                        </router-link>
                        <button type="button" class="btn btn-primary" @click="save()">
                            <i class="fas fa-arrow-circle-right fa-fw"></i>
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import controller from '@/controller/controller'
    import MainTitle from '@/components/MainTitle'
    import router from '@/router'
    import NotifyMe from '@/controller/notifier'


    const module = "table_contacts";
    const path = "contacts";

    export default {
        name: 'ContentForm',
        props: ['item'],
        components: {
            MainTitle,
        },
        data() {
            return {
                update: false,
                dto: {
                    // this should only handle form elements which want to add to db
                    title: '',
                    address: '',
                    map_embed: ''
                }
            }
        },
        methods: {
            save() {
                if (!this.hasErrorInData()) {
                    controller.save(this.dto, module).then((response) => {
                        NotifyMe.notifier('success', `Adres kayıt edildi.`);

                        router.push("/contact")
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    NotifyMe.notifier('error', `Tüm alanlar doldurulmalıdır. `);
                }
            },
            hasErrorInData() {
                return Object.keys(this.dto).some((key) => {
                    return this.dto[key] === ''
                })
            }
        },
        computed: {

        }
    };
</script>
