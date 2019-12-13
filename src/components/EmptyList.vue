<template>
    <div class="row" v-if="showMe">
        <div class="col-md-12 text-center">
            <h1 style="font-size: 100px;">
                <i class="far fa-comment"></i>
            </h1>
            <h3>Gösterilecek veri bulunamadı !</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EmptyList",
        props: ["list"],
        data() {
            return {
                showMe: false
            }
        },
        watch: {
            list: {
                immediate: true,
                handler(data) {
                    switch (typeof data) {
                        case "object": {
                            //list != null && list.length == 0
                            if (data.length === undefined)
                            {
                                this.showMe = true;
                            }
                            if (data.length !== undefined && data.length === 0) {
                                this.showMe = true;
                            }
                            if (data.length !== undefined && data.length > 0){
                                this.showMe = false;
                            }
                        } break;
                        case undefined : {
                            this.showMe = true;
                        } break;
                    }
                }
            }
        }
    }
</script>