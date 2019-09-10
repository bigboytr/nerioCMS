<template>
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" :class="cssClass" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: "Modal",
      props: ["title", "id", "cssClass"]
    }
</script>