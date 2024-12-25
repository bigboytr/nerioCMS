<template id="ToggleSwitch">
    <div class="switch">
        <input type="checkbox" :id="id" v-model="checkValueIn" @change="$emit('get-toggle', checkValueIn)"/>
        <div>
            <label :for="id"></label>
        </div>
    </div>
</template>

<script>
    // Please send an unique ID for the checkbox element
    export default {
        name: "ToggleSwitch",
        props: {
            id: {
                type: String
            },
            value: {
                type: Boolean
            }
        },
        data() {
            return {
                checkValueIn: this.$props.value
            }
        }
    }
</script>

<style scoped>
    /* =================================================================================
    Switcher
    ================================================================================= */
    .switch {
        display: inline-block;
        vertical-align: middle;
    }

    .switch input[type="checkbox"] {
        display: none;
    }

    .switch div {
        height: 2em;
        width: 3.5em;
        background: #767676;
        position: relative;
        box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
    }

    .switch label {
        top: 50%;
        left: 7%;
        transform: translateY(-50%);
        height: 1.5em;
        width: 1.5em;
        background: #fff;
        position: absolute;
        cursor: pointer;
    }

    .switch div, .switch label {
        -webkit-border-radius: 1em;
        -moz-border-radius: 1em;
        border-radius: 1em;
        -webkit-transition: all 300ms;
        -moz-transition: all 300ms;
        transition: all 300ms;
    }

    .switch input[type="checkbox"]:checked ~ div {
        background: #5caff5;
    }

    .switch input[type="checkbox"]:checked ~ div label {
        top: 50%;
        -webkit-transform: translate3d(100%, -50%, 0);
        -moz-transform: translate3d(100%, -50%, 0);
        transform: translate3d(100%, -50%, 0);
    }

</style>