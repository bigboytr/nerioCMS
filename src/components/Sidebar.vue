<template>
    <div class="row">

        <div class="col-md-2 sidebar padding-l-0 padding-r-0">

            <ul class="nav">
                <li v-for="(item, key) in list">
                    <router-link tag="a" :to="item.path"><i class="fas" :class="item.icon"></i> {{item.title}}</router-link>

                </li>
            </ul>

        </div>

    </div>
</template>

<script>
import auth from '@/controller/authentication'
import controller from '@/controller/navigation'


export default {
  name: 'Sidebar',
  data() {
    return {
      list: {}
    }
  },
  mounted() {
    const self = this;
    controller.getAll().then(function (response) {

      self.list = response;
    });

  }
};
</script>
