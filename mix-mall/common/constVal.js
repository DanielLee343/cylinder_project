const baseURL = 'http://y3k1468523.qicp.vip';
// const baseURL = 'http://192.168.31.221:8088';
const mapApiURL = 'http://api.map.baidu.com';
const ak = 'stcMZmKlCiPNvZu0GwH59bPob3ZXqlrO';
const akServer = 'stcMZmKlCiPNvZu0GwH59bPob3ZXqlrO';
const tencentMap = 'https://apis.map.qq.com';
const key = 'H2PBZ-DNM3G-4CVQO-IRH4G-3JDO5-R6BRC';
const now = Date.now || function() {
	return new Date().getTime();
};
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};

export default {
	baseURL,
	mapApiURL,
	ak,
	akServer,
	key,
	tencentMap,
	now,
	isArray
}
