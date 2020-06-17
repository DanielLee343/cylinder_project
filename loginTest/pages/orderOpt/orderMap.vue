<template>
	<view class="content">
<!-- 		{{curOrderLocation}}
		{{lat}}
		{{lng}} -->
		<map v-if="showMap" style="width: 100%; height: 300px;" id="map1" :latitude="lat" :longitude="lng" :markers="markers"
		 :polyline="polyline">
		</map>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: mapState(['curOrderLocation', 'lat', 'lng']),
		data() {
			return {
				showMap: false,
				destLat: "",
				destLng: "",
				// lat: "34.277007",
				// lng: "107.747126",
				markers: [{
					id: 0,
					latitude: 0,
					longitude: 0,
					height: 25,
					width: 25,
					iconPath: '../../static/icons/icon-location.png'
				}, ],
				routes: [],
				polyline: [{
					points: [],
					width: 5,
					color: "#0000AA",
					borderColor: "#FFFFFF",
					borderWidth: 4,
					arrowIconPath: "true",
				}],
			}
		},
		methods: {
			...mapMutations(['']),
			getDestAddr() {

				uni.request({
					url: this.constVal.mapApiURL + '/geocoding/v3/',
					data: {
						address: this.curOrderLocation,
						ak: this.constVal.ak,
						output: "json",
					},
					success: (res) => {
						// 获取目的地经纬度
						this.destLat = res.data.result.location.lat;
						this.destLng = res.data.result.location.lng;
						this.markers[0].latitude = this.destLat;
						this.markers[0].longitude = this.destLng;
						var origin = parseFloat(this.lat).toFixed(6) + ',' + parseFloat(this.lng).toFixed(6);
						var destination = parseFloat(this.destLat).toFixed(6) + ',' + parseFloat(this.destLng).toFixed(6);
						uni.request({
							url: this.constVal.mapApiURL + '/directionlite/v1/driving',
							data: {
								origin: origin,
								destination: destination,
								ak: this.constVal.akServer,
							},
							success: (res) => {
								var curSteps = res.data.result.routes[0].steps;
								var tempSteps = [];
								curSteps.forEach(item => {
									tempSteps.push(item.start_location);
								})
								var formatLocations = "";
								tempSteps.forEach(item => {
									var curItem = parseFloat(item.lat) + ',' + parseFloat(item.lng);
									formatLocations = formatLocations + ';' + curItem;
								})
								formatLocations = formatLocations.substr(1);
								uni.request({
									url: this.constVal.tencentMap + '/ws/coord/v1/translate',
									data: {
										key: this.constVal.key,
										type: 3,
										locations: formatLocations,
									},
									success: (res) => {
										this.polyline[0].points = res.data.locations;
										this.polyline[0].points.forEach(item => {
											item['latitude'] = item['lat'];
											item['longitude'] = item['lng'];
											delete item['lat'];
											delete item['lng'];
											item['longitude'] = parseFloat(item['longitude'])
											item['latitude'] = parseFloat(item['latitude'])
										})
										this.showMap = true;
									}
								})
							}
						})
					}
				})
			},
			getPolyline() {
				console.log(this.curOrderLocation);
				console.log(this.constVal.key);
				uni.request({
					//位置转经纬度
					url: this.constVal.tencentMap + '/ws/geocoder/v1/',
					data: {
						address: this.curOrderLocation,
						key: this.constVal.key,
					},
					success: (res) => {
						console.log(res.data);
						this.markers[0].latitude = res.data.result.location.lat;
						this.markers[0].longitude = res.data.result.location.lng;
						//经纬度拼接
						var origin = parseFloat(this.lat).toFixed(6) + ',' + parseFloat(this.lng).toFixed(6);
						var destination = parseFloat(this.markers[0].latitude).toFixed(6) + ',' + parseFloat(this.markers[0].longitude)
							.toFixed(6);
						uni.request({
							// 获取路径点坐标集合
							url: this.constVal.tencentMap + '/ws/direction/v1/driving/',
							data: {
								from: origin,
								to: destination,
								output: 'json',
								key: this.constVal.key,
							},
							success: (res) => {
								var curPolyline = res.data.result.routes[0].polyline;
								this.polyline[0].points = this.formatPolylines(curPolyline);
								this.showMap = true;
							}
						})
					}
				})
			},
		},
		onReady() {
			// this.getDestAddr();
			this.getPolyline();

		}
	}
</script>

<style>
</style>
