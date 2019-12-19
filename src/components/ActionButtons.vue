<template>
    <div>
        <router-link :to="url" tag="button" class="btn btn-sm btn-dark">
            <i class="fas fa-plus"></i>
            Ekle
        </router-link>

        <button class="btn btn-sm btn-danger ml-1" @click="fireTrash()">
            <i class="fas fa-trash"></i>
            Çöpe At
        </button>

        <button class="btn btn-sm btn-primary ml-1" @click="fireActive()">
            <i class="fas fa-check-circle"></i>
            Aktif
        </button>

    </div>
</template>

<script>
    export default {
        name: "ActionButtons",
        props: ['url'],
        methods: {
            fireTrash() {
                this.$emit("trash");
            },
            fireActive() {
                this.$emit("activeToggle");
            }
        }
    }
</script>