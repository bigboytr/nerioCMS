<template>
    <div class="row">
        <div class="col-md-12">

            <table class="table table-hover">
                <thead>
                <tr>
                    <!--<th width="20%">Başlık</th>
                    <th width="30%">Açıklama</th>-->
                    <th width="30%">Resim</th>
                    <th width="30%">Kategori</th>
                    <th width="5%">Sıra</th>
                    <!--<th width="15%">Son İşlem</th>-->
                    <th width="15%"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <!--<td></td>
                    <td></td>-->
                    <td><a href="../uploads/sliders/20181018100554web.jpg" target="_blank">20181018100554web.jpg</a>
                    </td>
                    <td>Web Çözümleri</td>
                    <td>0</td>
                    <!--<td>2018-10-18 13:05:54</td>-->
                    <td>
                        <div class="text-right">
                            <a href="./sliders/activate/39">
                                <span class="badge alert-success">Active</span>
                            </a>
                            <a href="./sliders/form/39" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                            <a href="./sliders/delete/39" class="btn btn-xs btn-danger"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <!--<td></td>
                    <td></td>-->
                    <td><a href="../uploads/sliders/etic.jpg" target="_blank">etic.jpg</a></td>
                    <td>E-Ticaret</td>
                    <td>0</td>
                    <!--<td>2018-10-18 13:05:24</td>-->
                    <td>
                        <div class="text-right">
                            <a href="./sliders/activate/38">
                                <span class="badge alert-success">Active</span>
                            </a>
                            <a href="./sliders/form/38" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                            <a href="./sliders/delete/38" class="btn btn-xs btn-danger"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <!--<td></td>
                    <td></td>-->
                    <td><a href="../uploads/sliders/201810190823091.jpg" target="_blank">201810190823091.jpg</a></td>
                    <td>Genel</td>
                    <td>1</td>
                    <!--<td>2018-10-19 11:23:09</td>-->
                    <td>
                        <div class="text-right">
                            <a href="./sliders/activate/48">
                                <span class="badge alert-success">Active</span>
                            </a>
                            <a href="./sliders/form/48" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                            <a href="./sliders/delete/48" class="btn btn-xs btn-danger"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <!--<td></td>
                    <td></td>-->
                    <td><a href="../uploads/sliders/201810190823212.jpg" target="_blank">201810190823212.jpg</a></td>
                    <td>Genel</td>
                    <td>2</td>
                    <!--<td>2018-10-19 11:23:21</td>-->
                    <td>
                        <div class="text-right">
                            <a href="./sliders/activate/49">
                                <span class="badge alert-success">Active</span>
                            </a>
                            <a href="./sliders/form/49" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                            <a href="./sliders/delete/49" class="btn btn-xs btn-danger"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <!--<td></td>
                    <td></td>-->
                    <td><a href="../uploads/sliders/3.jpg" target="_blank">3.jpg</a></td>
                    <td>Genel</td>
                    <td>3</td>
                    <!--<td>2018-10-19 11:23:35</td>-->
                    <td>
                        <div class="text-right">
                            <a href="./sliders/activate/50">
                                <span class="badge alert-success">Active</span>
                            </a>
                            <a href="./sliders/form/50" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                            <a href="./sliders/delete/50" class="btn btn-xs btn-danger"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <!--<td></td>
                    <td></td>-->
                    <td><a href="../uploads/sliders/4.jpg" target="_blank">4.jpg</a></td>
                    <td>Genel</td>
                    <td>4</td>
                    <!--<td>2018-10-19 11:23:46</td>-->
                    <td>
                        <div class="text-right">
                            <a href="./sliders/activate/51">
                                <span class="badge alert-success">Active</span>
                            </a>
                            <a href="./sliders/form/51" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                            <a href="./sliders/delete/51" class="btn btn-xs btn-danger"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <!--<td></td>
                    <td></td>-->
                    <td><a href="../uploads/sliders/5.jpg" target="_blank">5.jpg</a></td>
                    <td>Genel</td>
                    <td>5</td>
                    <!--<td>2018-10-19 11:23:59</td>-->
                    <td>
                        <div class="text-right">
                            <a href="./sliders/activate/52">
                                <span class="badge alert-success">Active</span>
                            </a>
                            <a href="./sliders/form/52" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                            <a href="./sliders/delete/52" class="btn btn-xs btn-danger"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>
</template>

<script>
  import controller from '@/controller/navigation'


  export default {
    name: 'Dashboard',
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
