<template>
    <div>
        <router-link v-if="this.$props.showAdd" :to="this.$props.url" tag="button" class="btn btn-sm btn-dark">
            <i class="fas fa-plus"></i>
            Ekle
        </router-link>

        <button v-if="this.$props.showTrash" class="btn btn-sm btn-danger ml-1" @click="fireTrash()">
            <i class="fas fa-trash"></i>
            Çöpe At
        </button>

        <button v-if="this.$props.showAccessToggle" class="btn btn-sm btn-primary ml-1" @click="fireActive()">
            <i class="fas fa-check-circle"></i>
            Aktif
        </button>
    </div>
</template>

<script>
    export default {
        name: "ActionButtons",
        props: {
            url: {
                type: String,
                default: ''
            },
            showAdd: {
                type: Boolean,
                default: true
            },
            showTrash: {
                type: Boolean,
                default: true
            },
            showAccessToggle: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            fireTrash() {
                this.$emit("trash");
            },
            fireActive() {
                this.$emit("activeToggle");
            }
        },
        computed: {
            /*link() {
                return this.$props.url !== undefined ? this.$props.url : "";
            }*/
        }
    }
</script>