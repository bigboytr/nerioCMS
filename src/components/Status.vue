<template>
    <div :class="statusColor()">
        <i class="fas fa-circle"></i>
    </div>
</template>

<script>
    export default {
        name: "StatusPlugin",
        props: ['param'],
        methods: {
            statusColor() {
                //console.log(this.$props.param);
                return parseInt(this.$props.param, 10) === 1 ? 'text-success' : 'text-danger'
                /*let css = '';
                switch (this.$props.param) {
                    case 1: css = 'text-success'; break;
                    case 2: css = 'text-warning'; break;
                    case 3: css = 'text-danger'; break;
                    default: css = 'text-success'; break;
                }
                return css;*/
            }
        }
    }
</script>