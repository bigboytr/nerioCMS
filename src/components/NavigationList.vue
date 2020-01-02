<template>
    <div>
        <div class="row div-tr" :style="indent">
            <div class="col-1">
                <input type="checkbox" :id="'chk_'+(item.id)" :value="item.id">
            </div>
            <div class="col-1">
                <Status :param="item.active"></Status>
            </div>
            <div class="col-8 col-sm-3">
                <a href="javascript:void(0)" @click="editMe(item)">
                    {{item.title}}
                </a>
            </div>
            <div class="col-3 d-none d-sm-block">{{item.href}}</div>
            <div class="col-2 d-none d-sm-block">{{item.target}}</div>
            <div class="col-2 d-none d-sm-block">{{typeOfLink(item.type)}}</div>
        </div>

        <NavigationList
                v-for="(i, key) in item.children" :for="'chk_+(key)'"
                :item="i" :depth="depth + 1" ></NavigationList>

    </div>


</template>

<script>
    import store from '@/store'
    import Status from '@/components/Status'
    import NavigationList from '@/components/NavigationList'

    export default {
        name: "NavigationList",
        props: {
            item: {
                type: Object
            },
            depth: {
                type: Number
            }
        },
        components: {
            Status,
            NavigationList
        },
        methods: {
            typeOfLink(type) {
                return store.getters.getUrlTypes(type);
            },
        },
        computed: {
            indent() {
                if (this.$props.depth !== 0)
                    //return "content: '&boxur;';  ";
                    return "padding-left: " + this.$props.depth * 25 + "px";
            },
        }
    }
</script>