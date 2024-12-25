<template>

    <h5 class="mb-0">
        <i class="fas fa-angle-double-right"></i>
        {{mainTitle}}
    </h5>

</template>
<script>
    import store from '@/store/index';

    export default {
        name: 'MainTitle',
        computed: {
            mainTitle() {
                return store.getters.getMainTitle;
            }
        }
    };
</script>
