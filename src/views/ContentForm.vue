<template>
    <div class="row">
        <div class="col-md-12">

        </div>
    </div>
</template>

<script>
    import controller from '@/controller/contents'
    import store from '@/store/index'

    export default {
        name: 'ContentForm',
        props: ['item'],
        data() {
            return {
                targetInput: false,
                dto: {
                    title: ""
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

        }
    };
</script>
