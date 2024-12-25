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
                // return parseInt(this.$props.param, 10) === 1 ? 'text-success' : 'text-danger'
                return this.$props.param ? 'text-success' : 'text-danger'
            }
        }
    }
</script>