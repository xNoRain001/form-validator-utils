(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Validator = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var getType = function getType(v) {
    if (v == null) {
      return "".concat(v);
    }

    var type = _typeof(v);

    return !/^(object|function)$/.test(type) ? type : Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  };

  var Validator = /*#__PURE__*/function () {
    function Validator() {
      _classCallCheck(this, Validator);

      this.cache = [];
    }
    /**
     * 给表单添加验证
     * 
     * @param {HTMLElement} dom - 添加验证的 DOM
     * @param {(Array|Object)} rules - 添加的校验规则，是一个以冒号隔开的字符串。冒号前
     *  面的内容代表选择的策略，冒号后面的内容代表在校验过程中所必需的一些参数。
     *  如 'minLength:6' 的意思就是校验 DOM.value 的最小长度要为 6。如果这个字符串中不包
     *  含冒号，说明校验过程中不需要额外的参数信息，比如 'isNonEmpty'。
     */


    _createClass(Validator, [{
      key: "add",
      value: function add(dom, rules) {
        var _this = this;

        if (getType(rules) === 'object') {
          rules = [rules];
        }

        var _loop = function _loop(i, rule) {
          var ary = rule.strategy.split(':');
          var errorMsg = rule.errorMsg;

          _this.cache.push(function () {
            var helper = ary.slice();
            var strategy = helper.shift();
            helper.unshift(dom.value);
            helper.push(errorMsg);
            return strategies[strategy].apply(dom, helper);
          });
        };

        for (var i = 0, rule; rule = rules[i++];) {
          _loop(i, rule);
        }
      }
      /**
       * 开始验证
       * 
       * @returns {(string|undefined)} 未通过验证返回 errorMsg，通过验证返回 undefined。
       */

    }, {
      key: "start",
      value: function start() {
        var cache = this.cache;

        for (var i = 0, validateFunc; validateFunc = cache[i++];) {
          var errorMsg = validateFunc();

          if (errorMsg) {
            return errorMsg;
          }
        }
      }
    }]);

    return Validator;
  }();

  return Validator;

}));
