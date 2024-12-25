<template>
    <b-row v-if="showMe">
        <b-col class="text-center">
            <h1><i class="far fa-comment"></i></h1>
            <h3>Gösterilecek veri bulunamadı !</h3>
        </b-col>
    </b-row>
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