<template>
  <div class="app-container">
    <div id="container" style="width:100%; height:1000px;"></div>
  </div>
</template>

<script>
import { getAddress, getCldsDetail } from "@/api/system/map";
export default {
  created() {},
  mounted() {
    this.getCldLocations();
    this.init();
  },
  data() {
    return {
      // cld详情
      cldsDetail: []
    };
  },
  methods: {
    getCldLocations() {
      getCldsDetail().then(response => {
        this.cldsDetail = response.rows;
        this.cldsDetail.forEach(item => {
          item.key = "H2PBZ-DNM3G-4CVQO-IRH4G-3JDO5-R6BRC";
          getAddress(item).then(response => {
            item.address = response.result.address;
            //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
            //设置地图中心点
            var mapCenter = new qq.maps.LatLng(34.23407, 108.90472);
            //定义工厂模式函数
            var mapOptions = {
              zoom: 13, //设置地图缩放级别
              center: mapCenter, //设置中心点样式
              mapTypeId: qq.maps.MapTypeId.ROADMAP
            };
            //获取dom元素添加地图信息
            var map = new qq.maps.Map(
              document.getElementById("container"),
              mapOptions
            );

            this.cldsDetail.forEach(item => {
              var lat = item.location.split(",")[0];
              var lng = item.location.split(",")[1];
              var moveTime = this.parseTime(item.moveTime);
              var aCldLocation = new qq.maps.LatLng(lat, lng);
              var marker = new qq.maps.Marker({
                position: aCldLocation,
                map: map,
                clickable: true,
                animation: qq.maps.MarkerAnimation.DROP
              });
              var info = new qq.maps.InfoWindow({
                map: map
              });
              qq.maps.event.addListener(marker, "mouseover", function() {
                info.open();
                info.setContent(
                  `<div style="white-space:nowrap; margin:10px;">
                    <div>收货人：` +
                    item.nickName +
                    `</div><br/>
                    <div>钢瓶编号：` +
                    item.stampId +
                    `</div><br/>
                    <div>钢瓶规格：` +
                    item.spec +
                    ` KG</div><br/>
                    <div>配送人员：` +
                    item.fromUserName +
                    `</div><br/>
                    <div>地点：` +
                    item.address +
                    `</div><br/>
                    <div>记录时间：` +
                    moveTime +
                    `</div>
                  </div：>`
                );
                info.setPosition(marker.getPosition());
              });
              qq.maps.event.addListener(marker, "mouseout", function() {
                info.close();
              });
              // marker.setAnimation(qq.maps.MarkerAnimation.DROP);
              // marker.setClickable(true);
            });
          });
        });
      });
    },
    init() {
      // marker.setIcon(marker);
    }
  }
};
</script>