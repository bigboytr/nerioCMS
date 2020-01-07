<template>
    <div class="row">
        <div class="col-md-12">

            <div class="card">
                <div class="card-header">
                    <MainTitle class="mb-2"></MainTitle>

                    <router-link
                            to="/products"
                            tag="a"
                            class="btn- btn-sm btn-dark">
                        <i class="fas fa-angle-double-left"></i>
                        Geri Dön
                    </router-link>
                </div>
                <div class="card-body">

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active"
                               id="price-tab" data-toggle="tab"
                               href="#price" aria-selected="true">Fiyat Listesi</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                               id="intro-tab" data-toggle="tab" href="#intro"
                               aria-selected="false">Tanıtım Yazısı</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                               id="images-tab" data-toggle="tab" href="#images"
                               aria-selected="false">Resimler</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="price" role="tabpanel">
                            <!-- Price Component -->
                            <ProductPriceList class="mt-3" :prodId="$route.params.prodId"></ProductPriceList>
                        </div>
                        <div class="tab-pane fade" id="intro" role="tabpanel">
                            <!-- Intro Component-->
                        </div>
                        <div class="tab-pane fade" id="images" role="tabpanel">
                            <!-- Images Component-->
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import controller from '@/controller/controller'
    import store from "@/store";
    import EmptyList from '@/components/EmptyList'
    import MainTitle from '@/components/MainTitle'
    import ProductPriceList from '@/components/ProductPriceList'

    const module = "table_products";
    const path = 'products'; // store path

    export default {
        name: 'ProductDetails',
        components: {
            EmptyList,
            MainTitle,
            ProductPriceList
        },
        mounted() {

        },
        data() {
            return {
            }
        },
        methods: {

        },
        computed: {


        }
    }
</script>