(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 100:
/*!*******************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/static/icons/cld_insert.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 101:
/*!******************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/static/icons/valve_opt.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 102:
/*!*********************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/static/icons/valve_insert.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 103:
/*!********************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/static/icons/check_order.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 104:
/*!***********************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/static/icons/wl.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 105:
/*!******************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/static/icons/send_back.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 15:
/*!******************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/store/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    forcedLogin: false,
    hasLogin: false,
    userName: "",
    userId: 0,
    cldDetail: {},
    valveNum: "",
    isEdit: true,
    curOrderLocation: "",
    lat: 0,
    lng: 0 },


  mutations: {
    login: function login(state, userName) {
      state.userName = userName || '新用户';
      state.hasLogin = true;
      uni.reLaunch({
        url: '../main/main' });

    },
    logout: function logout(state) {
      state.userName = "";
      state.hasLogin = false;
    },
    toCldOpt: function toCldOpt(state, userId) {
      state.userId = userId;
      uni.navigateTo({
        url: '../cldOpt/cldOpt' });

    },
    toCldDetail: function toCldDetail(state, currentCld) {
      state.cldDetail = currentCld;
      uni.redirectTo({
        url: './cldDetail' });

    },
    toValveDetail: function toValveDetail(state, valveNum) {
      state.valveNum = valveNum;
      uni.navigateTo({
        url: './valveDetail' });

    },
    toCldInsert: function toCldInsert(state, userId) {
      state.userId = userId;
      state.cldDetail = {};
      state.isEdit = false;
      uni.navigateTo({
        url: '../cldOpt/cldEdit' });

    },
    toEditCld: function toEditCld(state) {
      state.isEdit = true;
      uni.redirectTo({
        url: './cldEdit' });

    },
    cldUpdateOrInsertSuccess: function cldUpdateOrInsertSuccess(state) {
      state.cldDetail = {};
      uni.redirectTo({
        url: './cldOpt' });

    },
    valveDeleteSuccess: function valveDeleteSuccess(state) {
      state.valveDetail = {};
      uni.redirectTo({
        url: './valveOpt' });

    },
    toValveOpt: function toValveOpt(state, userId) {
      state.userId = userId;
      uni.navigateTo({
        url: '../valveOpt/valveOpt' });

    },
    //配送工查看当前订单
    toCurOrder: function toCurOrder(state, userId) {
      state.userId = userId;
      uni.navigateTo({
        url: '../orderOpt/curOrder' });

    },
    //配送工查看历史业绩
    toWLDelivery: function toWLDelivery(state, userId) {
      // state.userId = userId;
      uni.navigateTo({
        url: '../orderOpt/wlDelivery' });

    },
    // 钢瓶回转
    toSendBack: function toSendBack(state, userId) {
      state.userId = userId;
      uni.navigateTo({
        url: '../orderOpt/sendBack' });

    },
    //退出清除state缓存
    cleanState: function cleanState(state) {
      state.userId = undefined;
    },
    //看地图
    toOrderMap: function toOrderMap(state, curOrderLocation) {
      state.curOrderLocation = curOrderLocation;
      uni.navigateTo({
        url: './orderMap' });

    },
    changeLat: function changeLat(state, lat) {
      state.lat = lat;
      console.log(state.lat);
    },
    changeLng: function changeLng(state, lng) {
      state.lng = lng;
      console.log(state.lng);
    },
    //充装cld
    toRefillCld: function toRefillCld(state, userId) {
      state.userId = userId;
      uni.navigateTo({
        url: '../refillOpt/refillCld' });

    },
    // 录入工查看工作量
    toWlRefiller: function toWlRefiller(state, userId) {
      state.userId = userId;
      uni.navigateTo({
        url: '../refillOpt/wlRefiller' });

    },
    // 入库
    toToStorage: function toToStorage(state, userId) {
      state.userId = userId;
      uni.navigateTo({
        url: '../storage/toStorage' });

    },
    toWlStorage: function toWlStorage(state, userId) {
      state.userId = userId;
      uni.navigateTo({
        url: '../storage/wlStorage' });

    } } });var _default =



store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 17:
/*!*******************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/common/utils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.parseTime = parseTime;exports.resetForm = resetForm;exports.addDateRange = addDateRange;exports.selectDictLabel = selectDictLabel;exports.download = download;exports.sprintf = sprintf;exports.praseStrEmpty = praseStrEmpty;exports.handleTree = handleTree;exports.getDate = getDate;exports.checkAddCld = checkAddCld;exports.checkAddCldStampId = checkAddCldStampId;exports.formatPolylines = formatPolylines; /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * 通用js方法封装处理
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * Copyright (c) 2019 ruoyi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */

var baseURL = Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_BASE_API;

// 日期格式化
function parseTime(time, pattern) {
  if (arguments.length == 0 || !time) {
    return null;
  }
  var format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  var date;
  if (typeof time == 'object') {
    date = time;
  } else {
    if (typeof time == 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time == 'number' && time.toString().length == 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay() };

  var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
    var value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key == 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

// 表单重置
function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
function addDateRange(params, dateRange) {
  var search = params;
  search.beginTime = "";
  search.endTime = "";
  if (null != dateRange && '' != dateRange) {
    search.beginTime = this.dateRange[0];
    search.endTime = this.dateRange[1];
  }
  return search;
}

// 回显数据字典
function selectDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).map(function (key) {
    if (datas[key].dictValue == '' + value) {
      actions.push(datas[key].dictLabel);
      return false;
    }
  });
  return actions.join('');
}

// 通用下载方法
function download(fileName) {
  window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}

// 字符串格式化(%s )
function sprintf(str) {
  var args = arguments,
  flag = true,
  i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
function praseStrEmpty(str) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}

/**
   * 构造树型结构数据
   * @param {*} data 数据源
   * @param {*} id id字段 默认 'id'
   * @param {*} parentId 父节点字段 默认 'parentId'
   * @param {*} children 孩子节点字段 默认 'children'
   * @param {*} rootId 根Id 默认 0
   */
function handleTree(data, id, parentId, children, rootId) {
  id = id || 'id';
  parentId = parentId || 'parentId';
  children = children || 'children';
  rootId = rootId || 0;
  //对源数据深度克隆
  var cloneData = JSON.parse(JSON.stringify(data));
  //循环所有项
  var treeData = cloneData.filter(function (father) {
    var branchArr = cloneData.filter(function (child) {
      //返回每一项的子级数组
      return father[id] === child[parentId];
    });
    branchArr.length > 0 ? father.children = branchArr : '';
    //返回第一层
    return father[parentId] === rootId;
  });
  return treeData != '' ? treeData : data;
}

function getDate(type) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (type === 'start') {
    year = year - 3;
  } else if (type === 'end') {
    year = year + 2;
  }
  month = month > 9 ? month : '0' + month;;
  day = day > 9 ? day : '0' + day;
  return "".concat(year, "-").concat(month, "-").concat(day);
}

function checkAddCld(scannedCldList, VCDetail) {
  var alreadyHave = false;
  if (scannedCldList.length == 0) {
    scannedCldList.push(VCDetail);
    uni.showToast({
      image: '../../static/icons/check.png',
      title: '添加成功' });

  } else {
    scannedCldList.forEach(function (item) {
      if (item.stampId == VCDetail.stampId) {
        alreadyHave = true;
      }
    });
    if (alreadyHave) {
      uni.showToast({
        image: '../../static/icons/forbidden.png',
        title: '无法重复添加' });

      return;
    } else {
      scannedCldList.push(VCDetail);
      uni.showToast({
        image: '../../static/icons/check.png',
        title: '添加成功' });

    }
  }
}

function checkAddCldStampId(scannedCldList, VCDetailId) {
  var alreadyHave = false;
  if (scannedCldList.length == 0) {
    scannedCldList.push(VCDetailId);
    uni.showToast({
      image: '../../static/icons/check.png',
      title: '添加成功' });

  } else {
    scannedCldList.forEach(function (item) {
      if (item == VCDetailId) {
        alreadyHave = true;
      }
    });
    if (alreadyHave) {
      uni.showToast({
        image: '../../static/icons/forbidden.png',
        title: '无法重复添加' });

      return;
    } else if (!alreadyHave) {
      scannedCldList.push(VCDetailId);
      uni.showToast({
        image: '../../static/icons/check.png',
        title: '添加成功' });

    }
  }
}


function formatPolylines(curPolyline) {
  for (var i = 2; i < curPolyline.length; i++) {
    curPolyline[i] = curPolyline[i - 2] + curPolyline[i] / 1000000;
  }
  var tempPairs = [];
  var resPolylines = [];
  for (var i = 0; i < curPolyline.length; i += 2) {
    tempPairs.push(curPolyline.slice(i, i + 2));
  }
  tempPairs.forEach(function (item) {
    var tampPairsObj = [{
      latitude: 0,
      longitude: 0 }];

    tampPairsObj[0].latitude = item[0];
    tampPairsObj[0].longitude = item[1];
    resPolylines.push(tampPairsObj[0]);
  });
  return resPolylines;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!**********************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/common/constVal.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var baseURL = 'http://y3k1468523.qicp.vip';
// const baseURL = 'http://192.168.31.221:8088';
var mapApiURL = 'http://api.map.baidu.com';
var ak = 'stcMZmKlCiPNvZu0GwH59bPob3ZXqlrO';
var akServer = 'stcMZmKlCiPNvZu0GwH59bPob3ZXqlrO';
var tencentMap = 'https://apis.map.qq.com';
var key = 'H2PBZ-DNM3G-4CVQO-IRH4G-3JDO5-R6BRC';
var now = Date.now || function () {
  return new Date().getTime();
};
var isArray = Array.isArray || function (obj) {
  return obj instanceof Array;
};var _default =

{
  baseURL: baseURL,
  mapApiURL: mapApiURL,
  ak: ak,
  akServer: akServer,
  key: key,
  tencentMap: tencentMap,
  now: now,
  isArray: isArray };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 211:
/*!*********************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/components/uni-icons/icons.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/pages.json ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200424005","_inBundle":false,"_integrity":"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz","_shasum":"47f4375095eda3089cf4678b4b96fc656a7ab623","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200424005"};

/***/ }),

/***/ 61:
/*!***********************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/common/websocket.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createSocket = createSocket;exports.onopenWS = onopenWS;exports.onerrorWS = onerrorWS;exports.onmessageWS = onmessageWS;exports.sendWSPush = sendWSPush;exports.oncloseWS = oncloseWS;exports.sendPing = sendPing;var WSS_URL = 'ws://' + '192.168.0.65:8088' + '/websocket/';
var Socket = '';
var setIntervalWesocketPush = null;

/**建立连接 */
function createSocket(userId) {
  if (!Socket) {
    console.log('建立websocket连接');
    Socket = new WebSocket(WSS_URL + userId);
    Socket.onopen = onopenWS;
    Socket.onmessage = onmessageWS;
    Socket.onerror = onerrorWS;
    Socket.onclose = oncloseWS;
  } else {
    console.log(userId);
    console.log('websocket已连接');
  }
}
/**打开WS之后发送心跳 */
function onopenWS() {
  sendPing(); //发送心跳
}
/**连接失败重连 */
function onerrorWS() {
  clearInterval(setIntervalWesocketPush);
  Socket.close();
  createSocket(); //重连
}
/**WS数据接收统一处理 */
function onmessageWS(e) {
  console.log(e);
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e } }));


}
/**发送数据
   * @param eventType
   */
function sendWSPush(eventTypeArr) {
  var obj = {
    appId: 'airShip',
    cover: 0,
    event: eventTypeArr };

  if (Socket !== null && Socket.readyState === 3) {
    Socket.close();
    createSocket(); //重连
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj));
  } else if (Socket.readyState === 0) {
    setTimeout(function () {
      Socket.send(JSON.stringify(obj));
    }, 3000);
  }
}
/**关闭WS */
function oncloseWS() {
  clearInterval(setIntervalWesocketPush);
  console.log('websocket已断开');
}
/**发送心跳 */
function sendPing() {
  Socket.send('ping');
  setIntervalWesocketPush = setInterval(function () {
    Socket.send('ping');
  }, 5000);
}

/***/ }),

/***/ 67:
/*!**********************************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/components/jyf-parser/libs/MpHtmlParser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          将 html 解析为适用于小程序 rich-text 的 DOM 结构
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          github：https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          docs：https://jin-yufeng.github.io/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          author：JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          update：2020/04/26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var cfg = __webpack_require__(/*! ./config.js */ 68),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 69),_wx$getSystemInfoSync =



wx.getSystemInfoSync(),screenWidth = _wx$getSystemInfoSync.screenWidth,system = _wx$getSystemInfoSync.system;
var emoji; // emoji 补丁包 https://jin-yufeng.github.io/Parser/#/instructions?id=emoji
var MpHtmlParser = /*#__PURE__*/function () {"use strict";
  function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};_classCallCheck(this, MpHtmlParser);_defineProperty(this, "getName",





















































































































































































































































































































































































































    function (val) {return _this.xml ? val : val.toLowerCase();});_defineProperty(this, "isClose",








    function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';});_defineProperty(this, "section",
    function () {return _this.data.substring(_this.start, _this.i);});_defineProperty(this, "siblings",
    function () {return _this.STACK.length ? _this.STACK[_this.STACK.length - 1].children : _this.DOM;});this.attrs = {};this.compress = options.compress;this.CssHandler = new CssHandler(options.tagStyle, screenWidth);this.data = data;this.domain = options.domain;this.DOM = [];this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;this.protocol = this.domain && this.domain.includes('://') ? this.domain.split('://')[0] : '';this.state = this.Text;this.STACK = [];this.useAnchor = options.useAnchor;this.xml = options.xml;}_createClass(MpHtmlParser, [{ key: "parse", value: function parse() {if (emoji) this.data = emoji.parseEmoji(this.data);for (var c; c = this.data[this.i]; this.i++) {this.state(c);}if (this.state == this.Text) this.setText();while (this.STACK.length) {this.popNode(this.STACK.pop());}if (this.DOM.length) {this.DOM[0].PoweredBy = 'Parser';if (this.title) this.DOM[0].title = this.title;}return this.DOM;} // 设置属性
  }, { key: "setAttr", value: function setAttr() {var name = this.getName(this.attrName);if (cfg.trustAttrs[name]) {var val = this.attrVal;if (val) {if (name == 'src') this.attrs[name] = this.getUrl(this.decode(val, 'amp'));else if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else this.attrs[name] = val;} else if (cfg.boolAttrs[name]) this.attrs[name] = 'T';}this.attrVal = '';while (blankChar[this.data[this.i]]) {this.i++;}if (this.isClose()) this.setNode();else {this.start = this.i;this.state = this.AttrName;}} // 设置文本节点
  }, { key: "setText", value: function setText() {var back,text = this.section();if (!text) return;text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;if (back) {this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);var j = this.start + text.length;for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}return;}if (!this.pre) {// 合并空白符
        var tmp = [];for (var i = text.length, c; c = text[--i];) {if (!blankChar[c] || !blankChar[tmp[0]] && (c = ' ')) tmp.unshift(c);}text = tmp.join('');if (text == ' ') return;}this.siblings().push({ type: 'text', text: this.decode(text) });} // 设置元素节点
  }, { key: "setNode", value: function setNode() {var node = { name: this.tagName.toLowerCase(), attrs: this.attrs },close = cfg.selfClosingTags[node.name] || this.xml && this.data[this.i] == '/';this.attrs = {};if (!cfg.ignoreTags[node.name]) {this.matchAttr(node);if (!close) {node.children = [];if (node.name == 'pre' && cfg.highlight) {this.remove(node);this.pre = node.pre = true;}this.siblings().push(node);this.STACK.push(node);} else if (!cfg.filter || cfg.filter(node, this) != false) this.siblings().push(node);} else {if (!close) this.remove(node);else if (node.name == 'source') {var parent = this.STACK[this.STACK.length - 1],attrs = node.attrs;if (parent && attrs.src) if (parent.name == 'video' || parent.name == 'audio') parent.attrs.source.push(attrs.src);else {var i,media = attrs.media;if (parent.name == 'picture' && !parent.attrs.src && !(attrs.src.indexOf('.webp') && system.includes('iOS')) && (!media || media.includes('px') && ((i = media.indexOf('min-width')) != -1 && (i = media.indexOf(':', i + 8)) != -1 && screenWidth > parseInt(media.substr(i + 1)) || (i = media.indexOf('max-width')) != -1 && (i = media.indexOf(':', i + 8)) != -1 && screenWidth < parseInt(media.substr(i + 1))))) parent.attrs.src = attrs.src;}} else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;}if (this.data[this.i] == '/') this.i++;this.start = this.i + 1;this.state = this.Text;} // 移除标签
  }, { key: "remove", value: function remove(node) {var name = node.name,j = this.i;while (1) {if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {if (name == 'pre' || name == 'svg') this.i = j;else this.i = this.data.length;return;}this.start = this.i += 2;while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}if (this.getName(this.section()) == name) {// 代码块高亮
          if (name == 'pre') {this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.substr(this.i - 5);return this.i = j;} else if (name == 'style') this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else if (name == 'title') this.title = this.data.substring(j + 1, this.i - 7);if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length; // 处理 svg
          if (name == 'svg') {var src = this.data.substring(j, this.i + 1);if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;var i = j;while (this.data[j] != '<') {j--;}src = this.data.substring(j, i) + src;var parent = this.STACK[this.STACK.length - 1];if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline')) parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;this.siblings().push({ name: 'img', attrs: { src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'), ignore: 'T' } });}return;}}} // 处理属性
  }, { key: "matchAttr", value: function matchAttr(node) {var attrs = node.attrs,style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),styleObj = {};if (attrs.id) {if (this.compress & 1) attrs.id = void 0;else if (this.useAnchor) this.bubble();}if (this.compress & 2 && attrs.class) attrs.class = void 0;switch (node.name) {case 'a':case 'ad':this.bubble();break;case 'font':if (attrs.color) {styleObj['color'] = attrs.color;attrs.color = void 0;}if (attrs.face) {styleObj['font-family'] = attrs.face;attrs.face = void 0;}if (attrs.size) {var size = parseInt(attrs.size);if (size < 1) size = 1;else if (size > 7) size = 7;var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];styleObj['font-size'] = map[size - 1];attrs.size = void 0;}break;case 'video':case 'audio':if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else this["".concat(node.name, "Num")]++;if (node.name == 'video') {if (this.videoNum > 3) node.lazyLoad = 1;if (attrs.width) {styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');attrs.width = void 0;}if (attrs.height) {styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');attrs.height = void 0;}}attrs.source = [];if (attrs.src) attrs.source.push(attrs.src);if (!attrs.controls && !attrs.autoplay) console.warn("\u5B58\u5728\u6CA1\u6709 controls \u5C5E\u6027\u7684 ".concat(node.name, " \u6807\u7B7E\uFF0C\u53EF\u80FD\u5BFC\u81F4\u65E0\u6CD5\u64AD\u653E"), node);this.bubble();break;case 'td':case 'th':if (attrs.colspan || attrs.rowspan) for (var k = this.STACK.length, item; item = this.STACK[--k];) {if (item.name == 'table') {item.c = void 0;break;}}}if (attrs.align) {styleObj['text-align'] = attrs.align;attrs.align = void 0;} // 压缩 style
      var styles = style.split(';');style = '';for (var i = 0, len = styles.length; i < len; i++) {var info = styles[i].split(':');if (info.length < 2) continue;var _key = info[0].trim().toLowerCase(),_value = info.slice(1).join(':').trim();if (_value.includes('-webkit') || _value.includes('-moz') || _value.includes('-ms') || _value.includes('-o') || _value.includes('safe')) style += ";".concat(_key, ":").concat(_value);else if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import')) styleObj[_key] = _value;}if (node.name == 'img' || node.name == 'picture') {if (attrs['data-src']) {attrs.src = attrs.src || attrs['data-src'];attrs['data-src'] = void 0;}if ((attrs.src || node.name == 'picture') && !attrs.ignore) {if (this.bubble()) attrs.i = (this.imgNum++).toString();else attrs.ignore = 'T';}if (attrs.ignore) styleObj['max-width'] = '100%';var width;if (styleObj.width) width = styleObj.width;else if (attrs.width) width = attrs.width.includes('%') ? attrs.width : attrs.width + 'px';if (width) {styleObj.width = width;attrs.width = '100%';if (parseInt(width) > screenWidth) {styleObj.height = '';if (attrs.height) attrs.height = void 0;}}if (styleObj.height) {attrs.height = styleObj.height;styleObj.height = '';} else if (attrs.height && !attrs.height.includes('%')) attrs.height += 'px';}for (var key in styleObj) {var value = styleObj[key];if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1; // 填充链接
        if (value.includes('url')) {var j = value.indexOf('(');if (j++ != -1) {while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}value = value.substr(0, j) + this.getUrl(value.substr(j));}} // 转换 rpx
        else if (value.includes('rpx')) value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * screenWidth / 750 + 'px';});else if (key == 'white-space' && value.includes('pre')) this.pre = node.pre = true;style += ";".concat(key, ":").concat(value);}style = style.substr(1);if (style) attrs.style = style;} // 节点出栈处理
  }, { key: "popNode", value: function popNode(node) {// 空白符处理
      if (node.pre) {node.pre = this.pre = void 0;for (var i = this.STACK.length; i--;) {if (this.STACK[i].pre) this.pre = true;}}if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false) return this.siblings().pop();var attrs = node.attrs; // 替换一些标签名
      if (node.name == 'picture') {node.name = 'img';if (!attrs.src && (node.children[0] || '').name == 'img') attrs.src = node.children[0].attrs.src;return node.children = void 0;}if (cfg.blockTags[node.name]) node.name = 'div';else if (!cfg.trustTags[node.name]) node.name = 'span'; // 处理列表
      if (node.c && (node.name == 'ul' || node.name == 'ol')) {if ((node.attrs.style || '').includes('list-style:none')) {for (var _i = 0, child; child = node.children[_i++];) {if (child.name == 'li') child.name = 'div';}} else if (node.name == 'ul') {var floor = 1;for (var _i2 = this.STACK.length; _i2--;) {if (this.STACK[_i2].name == 'ul') floor++;}if (floor != 1) for (var _i3 = node.children.length; _i3--;) {node.children[_i3].floor = floor;}} else {for (var _i4 = 0, num = 1, _child; _child = node.children[_i4++];) {if (_child.name == 'li') {_child.type = 'ol';_child.num = function (num, type) {if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);if (type == 'i' || type == 'I') {num = (num - 1) % 99 + 1;var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');if (type == 'i') return res.toLowerCase();return res;}return num;}(num++, attrs.type) + '.';}}}} // 处理表格的边框
      if (node.name == 'table') {var padding = attrs.cellpadding,spacing = attrs.cellspacing,border = attrs.border;if (node.c) {this.bubble();if (!padding) padding = 2;if (!spacing) spacing = 2;}if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');if (spacing) attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');if (border || padding) (function f(ns) {for (var i = 0, n; n = ns[i]; i++) {if (n.name == 'th' || n.name == 'td') {if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style);if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style);} else f(n.children || []);}})(node.children);}this.CssHandler.pop && this.CssHandler.pop(node); // 自动压缩
      if (node.name == 'div' && !Object.keys(attrs).length) {var siblings = this.siblings();if (node.children.length == 1 && node.children[0].name == 'div') siblings[siblings.length - 1] = node.children[0];}} // 工具函数
  }, { key: "bubble", value: function bubble() {for (var i = this.STACK.length, item; item = this.STACK[--i];) {if (cfg.richOnlyTags[item.name]) {if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;return false;}item.c = 1;}return true;} }, { key: "decode", value: function decode(val, amp) {var i = -1,j,en;while (1) {if ((i = val.indexOf('&', i + 1)) == -1) break;if ((j = val.indexOf(';', i + 2)) == -1) break;if (val[i + 1] == '#') {en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);} else {en = val.substring(i + 1, j);if (cfg.entities[en] || en == amp) val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);}}return val;} }, { key: "getUrl", value: function getUrl(url) {if (url[0] == '/') {if (url[1] == '/') url = this.protocol + ':' + url;else if (this.domain) url = this.domain + url;} else if (this.domain && url.indexOf('data:') != 0 && !url.includes('://')) url = this.domain + '/' + url;return url;} }, { key: "Text", // 状态机
    value: function Text(c) {if (c == '<') {var next = this.data[this.i + 1],isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};if (isLetter(next)) {this.setText();this.start = this.i + 1;this.state = this.TagName;} else if (next == '/') {this.setText();if (isLetter(this.data[++this.i + 1])) {this.start = this.i + 1;this.state = this.EndTag;} else this.Comment();} else if (next == '!') {this.setText();this.Comment();
        }
      }
    } }, { key: "Comment", value: function Comment()
    {
      var key;
      if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
      if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
      key = '>';
      if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
      this.i += key.length - 1;
      this.start = this.i + 1;
      this.state = this.Text;
    } }, { key: "TagName", value: function TagName(
    c) {
      if (blankChar[c]) {
        this.tagName = this.section();
        while (blankChar[this.data[this.i]]) {this.i++;}
        if (this.isClose()) this.setNode();else
        {
          this.start = this.i;
          this.state = this.AttrName;
        }
      } else if (this.isClose()) {
        this.tagName = this.section();
        this.setNode();
      }
    } }, { key: "AttrName", value: function AttrName(
    c) {
      var blank = blankChar[c];
      if (blank) {
        this.attrName = this.section();
        c = this.data[this.i];
      }
      if (c == '=') {
        if (!blank) this.attrName = this.section();
        while (blankChar[this.data[++this.i]]) {;}
        this.start = this.i--;
        this.state = this.AttrValue;
      } else if (blank) this.setAttr();else
      if (this.isClose()) {
        this.attrName = this.section();
        this.setAttr();
      }
    } }, { key: "AttrValue", value: function AttrValue(
    c) {
      if (c == '"' || c == "'") {
        this.start++;
        if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
        this.attrVal = this.section();
        this.i++;
      } else {
        for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
        this.attrVal = this.section();
      }
      this.setAttr();
    } }, { key: "EndTag", value: function EndTag(
    c) {
      if (blankChar[c] || c == '>' || c == '/') {
        var name = this.getName(this.section());
        for (var i = this.STACK.length; i--;) {
          if (this.STACK[i].name == name) break;}
        if (i != -1) {
          var node;
          while ((node = this.STACK.pop()).name != name) {;}
          this.popNode(node);
        } else if (name == 'p' || name == 'br')
        this.siblings().push({
          name: name,
          attrs: {} });

        this.i = this.data.indexOf('>', this.i);
        this.start = this.i + 1;
        if (this.i == -1) this.i = this.data.length;else
        this.state = this.Text;
      }
    } }]);return MpHtmlParser;}();

module.exports = MpHtmlParser;

/***/ }),

/***/ 68:
/*!****************************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/components/jyf-parser/libs/config.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */

var canIUse = wx.canIUse('editor'); // 高基础库标识，用于兼容

module.exports = {
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,section' + (

  canIUse ? '' :

  ',pre')),
  // 将被移除的标签
  ignoreTags: makeMap(
  'area,base,basefont,canvas,command,frame,input,isindex,keygen,link,map,meta,param,script,source,style,svg,textarea,title,track,use,wbr' + (

  canIUse ? ',rp' : '') +


  ',embed,iframe'),


  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,picture,table' + (

  canIUse ? ',bdi,bdo,caption,rt,ruby' : '')),


  // 自闭合的标签
  selfClosingTags: makeMap(
  'area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),

  // 信任的属性
  trustAttrs: makeMap(
  'align,alt,app-id,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,width,xmlns'),

  // bool 型的属性
  boolAttrs: makeMap('autoplay,controls,ignore,loop,muted'),
  // 信任的标签
  trustTags: makeMap(
  'a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video' + (

  canIUse ? ',bdi,bdo,caption,pre,rt,ruby' : '')),





  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = {},
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}

/***/ }),

/***/ 69:
/*!********************************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/components/jyf-parser/libs/CssHandler.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          解析和匹配 Css 的选择器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          github：https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          docs：https://jin-yufeng.github.io/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          author：JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          update：2020/03/15
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var cfg = __webpack_require__(/*! ./config.js */ 68);var
CssHandler = /*#__PURE__*/function () {"use strict";
  function CssHandler(tagStyle) {var _this = this;_classCallCheck(this, CssHandler);_defineProperty(this, "getStyle",





    function (data) {return _this.styles = new CssParser(data, _this.styles).parse();});var styles = Object.assign({}, cfg.userAgentStyles);for (var item in tagStyle) {styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}this.styles = styles;}_createClass(CssHandler, [{ key: "match", value: function match(
    name, attrs) {
      var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
      if (attrs.class) {
        var items = attrs.class.split(' ');
        for (var i = 0, item; item = items[i]; i++) {
          if (tmp = this.styles['.' + item])
          matched += tmp + ';';}
      }
      if (tmp = this.styles['#' + attrs.id])
      matched += tmp + ';';
      return matched;
    } }]);return CssHandler;}();

module.exports = CssHandler;var
CssParser = /*#__PURE__*/function () {"use strict";
  function CssParser(data, init) {var _this2 = this;_classCallCheck(this, CssParser);_defineProperty(this, "section",












    function () {return _this2.data.substring(_this2.start, _this2.i);});_defineProperty(this, "isLetter",
    function (c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';});this.data = data;this.floor = 0;this.i = 0;this.list = [];this.res = init;this.state = this.Space;}_createClass(CssParser, [{ key: "parse", value: function parse() {for (var c; c = this.data[this.i]; this.i++) {this.state(c);}return this.res;} }, { key: "Space",
    // 状态机
    value: function Space(c) {
      if (c == '.' || c == '#' || this.isLetter(c)) {
        this.start = this.i;
        this.state = this.Name;
      } else if (c == '/' && this.data[this.i + 1] == '*')
      this.Comment();else
      if (!cfg.blankChar[c] && c != ';')
      this.state = this.Ignore;
    } }, { key: "Comment", value: function Comment()
    {
      this.i = this.data.indexOf('*/', this.i) + 1;
      if (!this.i) this.i = this.data.length;
      this.state = this.Space;
    } }, { key: "Ignore", value: function Ignore(
    c) {
      if (c == '{') this.floor++;else
      if (c == '}' && ! --this.floor) this.state = this.Space;
    } }, { key: "Name", value: function Name(
    c) {
      if (cfg.blankChar[c]) {
        this.list.push(this.section());
        this.state = this.NameSpace;
      } else if (c == '{') {
        this.list.push(this.section());
        this.Content();
      } else if (c == ',') {
        this.list.push(this.section());
        this.Comma();
      } else if (!this.isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
      this.state = this.Ignore;
    } }, { key: "NameSpace", value: function NameSpace(
    c) {
      if (c == '{') this.Content();else
      if (c == ',') this.Comma();else
      if (!cfg.blankChar[c]) this.state = this.Ignore;
    } }, { key: "Comma", value: function Comma()
    {
      while (cfg.blankChar[this.data[++this.i]]) {;}
      if (this.data[this.i] == '{') this.Content();else
      {
        this.start = this.i--;
        this.state = this.Name;
      }
    } }, { key: "Content", value: function Content()
    {
      this.start = ++this.i;
      if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
      var content = this.section();
      for (var i = 0, item; item = this.list[i++];) {
        if (this.res[item]) this.res[item] += ';' + content;else
        this.res[item] = content;}
      this.list = [];
      this.state = this.Space;
    } }]);return CssParser;}();

/***/ }),

/***/ 7:
/*!*******************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/pages.json?{"type":"style"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/login/login": { "navigationBarTitleText": "登录" }, "pages/main/main": { "navigationBarTitleText": "主页" }, "pages/reg/reg": { "navigationBarTitleText": "注册" }, "pages/pwd/pwd": { "navigationBarTitleText": "找回密码" }, "pages/user/user": { "navigationBarTitleText": "我的" }, "pages/cldOpt/cldOpt": { "navigationBarTitleText": "钢瓶管理" }, "pages/cldOpt/cldDetail": { "navigationBarTitleText": "钢瓶详情" }, "pages/cldOpt/cldEdit": {}, "pages/valveOpt/valveOpt": { "navigationBarTitleText": "气阀管理" }, "pages/valveOpt/valveDetail": { "navigationBarTitleText": "气阀详情" }, "pages/orderOpt/curOrder": { "navigationBarTitleText": "当前订单", "enablePullDownRefresh": true }, "pages/orderOpt/wlDelivery": { "navigationBarTitleText": "我的工作量", "enablePullDownRefresh": true }, "pages/orderOpt/sendBack": { "navigationBarTitleText": "钢瓶回转", "enablePullDownRefresh": true }, "pages/orderOpt/orderMap": { "navigationBarTitleText": "地图", "enablePullDownRefresh": true }, "pages/refillOpt/refillCld": { "navigationBarTitleText": "充装空瓶", "enablePullDownRefresh": true }, "pages/storage/toStorage": { "navigationBarTitleText": "钢瓶入库", "enablePullDownRefresh": true }, "pages/refillOpt/wlRefiller": { "navigationBarTitleText": "我的工作量", "enablePullDownRefresh": true }, "pages/storage/wlStorage": { "navigationBarTitleText": "我的工作量", "enablePullDownRefresh": true } }, "globalStyle": { "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#0faeff", "backgroundColor": "#fbf9fe" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!******************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/pages.json?{"type":"stat"} ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__BE5E0FC" };exports.default = _default;

/***/ }),

/***/ 92:
/*!**************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/service.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 管理账号信息
var USERS_KEY = 'USERS_KEY';
var STATE_KEY = 'STATE_KEY';

var getUsers = function getUsers() {
  var ret = '';
  ret = uni.getStorageSync(USERS_KEY);
  if (!ret) {
    ret = '[]';
  }
  return JSON.parse(ret);
};

var addUser = function addUser(userInfo) {
  var users = getUsers();
  users.push({
    account: userInfo.account,
    password: userInfo.password });

  uni.setStorageSync(USERS_KEY, JSON.stringify(users));
};var _default =

{
  getUsers: getUsers,
  addUser: addUser };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 99:
/*!****************************************************************!*\
  !*** /Users/daniel/Desktop/loginTest/static/icons/cld_opt.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map