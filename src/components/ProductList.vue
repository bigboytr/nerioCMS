<template>
    <div>
        <div class="row div-tr" :style="indent">
            <div class="col-1">
                <input type="checkbox" :id="'chk_'+(item.id)" @click="$emit('sendId', item.id)">
            </div>
            <div class="col-2">
                <Status :param="item.active"></Status>
            </div>
            <div class="col-8">
                <a href="javascript:void(0)">
                    {{item.title}}
                </a>
            </div>
            <div class="col-1">
                <router-link
                        v-if="parseInt(item.parent, 10) > 0"
                        :to="{name: 'product-details', params: {prodId: parseInt(item.id, 10)} }"
                             tag="a"
                             class="btn- btn-sm btn-primary">
                    <i class="fas fa-file-alt"></i>
                </router-link>
            </div>
        </div>

        <ProductList
                v-for="(i, key) in item.children" :for="'chk_+(key)'"
                :item="i" :depth="depth + 1" ></ProductList>

    </div>


</template>

<script>
    import Status from '@/components/Status'
    import ProductList from '@/components/ProductList'

    export default {
        name: "ProductList",
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
            ProductList
        },
        methods: {
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