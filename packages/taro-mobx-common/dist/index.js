'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    _defineProperty(this, "listeners", []);
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(cb) {
      var _this = this;

      this.listeners.push(cb);
      return function () {
        var index = _this.listeners.indexOf(cb);

        if (index !== -1) {
          _this.listeners.splice(index, 1);
        }
      };
    }
  }, {
    key: "emit",
    value: function emit(data) {
      this.listeners.forEach(function (fn) {
        return fn(data);
      });
    }
  }]);

  return EventEmitter;
}();

var errorsReporter = new EventEmitter();

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      rest[_key - 6] = arguments[_key];
    }

    return mobx.untracked(function () {
      componentName = componentName || '<<anonymous>>';
      propFullName = propFullName || propName;

      if (props[propName] == null) {
        if (isRequired) {
          var actual = props[propName] === null ? 'null' : 'undefined';
          return new Error('The ' + location + ' `' + propFullName + '` is marked as required ' + 'in `' + componentName + '`, but its value is `' + actual + '`.');
        }

        return null;
      } else {
        return validate.apply(void 0, [props, propName, componentName, location, propFullName].concat(rest));
      }
    });
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
} // Copied from React.PropTypes


function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  } // Fallback for non-spec compliant Symbols which are polyfilled.


  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
} // Copied from React.PropTypes


function getPropType(propValue) {
  var propType = _typeof(propValue);

  if (Array.isArray(propValue)) {
    return 'array';
  }

  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }

  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }

  return propType;
} // This handles more types than `getPropType`. Only used for error messages.
// Copied from React.PropTypes


function getPreciseType(propValue) {
  var propType = getPropType(propValue);

  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }

  return propType;
}

function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
    return mobx.untracked(function () {
      if (allowNativeType) {
        if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
      }

      var mobxChecker;

      switch (mobxType) {
        case 'Array':
          mobxChecker = mobx.isObservableArray;
          break;

        case 'Object':
          mobxChecker = mobx.isObservableObject;
          break;

        case 'Map':
          mobxChecker = mobx.isObservableMap;
          break;

        default:
          throw new Error("Unexpected mobxType: ".concat(mobxType));
      }

      var propValue = props[propName];

      if (!mobxChecker(propValue)) {
        var preciseType = getPreciseType(propValue);
        var nativeTypeExpectationMessage = allowNativeType ? ' or javascript `' + mobxType.toLowerCase() + '`' : '';
        return new Error('Invalid prop `' + propFullName + '` of type `' + preciseType + '` supplied to' + ' `' + componentName + '`, expected `mobx.Observable' + mobxType + '`' + nativeTypeExpectationMessage + '.');
      }

      return null;
    });
  });
}

function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      rest[_key2 - 5] = arguments[_key2];
    }

    return mobx.untracked(function () {
      if (typeof typeChecker !== 'function') {
        return new Error('Property `' + propFullName + '` of component `' + componentName + '` has ' + 'invalid PropType notation.');
      }

      var error = createObservableTypeCheckerCreator(allowNativeType, 'Array')(props, propName, componentName);
      if (error instanceof Error) return error;
      var propValue = props[propName];

      for (var i = 0; i < propValue.length; i++) {
        error = typeChecker.apply(void 0, [propValue, i, componentName, location, propFullName + '[' + i + ']'].concat(rest));
        if (error instanceof Error) return error;
      }

      return null;
    });
  });
}

var observableArray = createObservableTypeCheckerCreator(false, 'Array');
var observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
var observableMap = createObservableTypeCheckerCreator(false, 'Map');
var observableObject = createObservableTypeCheckerCreator(false, 'Object');
var arrayOrObservableArray = createObservableTypeCheckerCreator(true, 'Array');
var arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
var objectOrObservableObject = createObservableTypeCheckerCreator(true, 'Object');
var PropTypes = {
  observableArray: observableArray,
  observableArrayOf: observableArrayOf,
  observableMap: observableMap,
  observableObject: observableObject,
  arrayOrObservableArray: arrayOrObservableArray,
  arrayOrObservableArrayOf: arrayOrObservableArrayOf,
  objectOrObservableObject: objectOrObservableObject
};

function isPlainObject(value) {
  if (!value || _typeof(value) !== 'object') {
    return false;
  }

  var proto = Object.getPrototypeOf(value);
  return !proto || proto === Object.prototype;
}

function useAsObservableSourceInternal(current, usedByLocalStore, useState) {
  var culprit = usedByLocalStore ? 'useLocalStore' : 'useAsObservableSource';

  if (usedByLocalStore && current === undefined) {
    return undefined;
  }

  if (process.env.NODE_ENV !== 'production' && !isPlainObject(current)) {
    throw new Error("".concat(culprit, " expects a plain object as ").concat(usedByLocalStore ? 'second' : 'first', " argument"));
  }

  var _useState = useState(function () {
    return mobx.observable(current, {}, {
      deep: false
    });
  }),
      _useState2 = _slicedToArray(_useState, 1),
      res = _useState2[0];

  if (process.env.NODE_ENV !== 'production' && Object.keys(res).length !== Object.keys(current).length) {
    throw new Error("the shape of objects passed to ".concat(culprit, " should be stable"));
  }

  mobx.runInAction(function () {
    Object.assign(res, current);
  });
  return res;
}
function useAsObservableSource(current, useState) {
  return useAsObservableSourceInternal(current, false, useState);
}

function useLocalStore(initializer, current, useState) {
  var source = useAsObservableSourceInternal(current, true, useState);
  return useState(function () {
    var local = mobx.observable(initializer(source));

    if (isPlainObject(local)) {
      mobx.runInAction(function () {
        Object.keys(local).forEach(function (key) {
          var value = local[key];

          if (typeof value === 'function') {
            local[key] = wrapInTransaction(value, local);
          }
        });
      });
    }

    return local;
  })[0];
}

function wrapInTransaction(fn, context) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return mobx.transaction(function () {
      return fn.apply(context, args);
    });
  };
}

var globalIsUsingStaticRendering = false;
function useStaticRendering(enable) {
  globalIsUsingStaticRendering = enable;
}
function isUsingStaticRendering() {
  return globalIsUsingStaticRendering;
}

var store = {};
function getStore() {
  if (process.env.TARO_ENV === 'alipay') {
    return my.taroMobxStore || {};
  }

  return store;
}
function setStore(arg) {
  if (process.env.TARO_ENV === 'alipay') {
    my.taroMobxStore = arg;
  } else {
    store = arg;
  }
}

function grabStoresByName(storeNames) {
  return function (baseStores, nextProps) {
    storeNames.forEach(function (storeName) {
      if (!(storeName in baseStores)) {
        var error = new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
        errorsReporter.emit(error);
        throw error;
      }

      nextProps[storeName] = baseStores[storeName];
    });
    return nextProps;
  };
}

function getInjectName(component, injectNames) {
  var componentName = component.displayName || component.name || 'Component';

  if (injectNames) {
    return "inject-with-".concat(injectNames, "(").concat(componentName, ")");
  }

  return "inject(".concat(componentName, ")");
}
function mapStoreToProps(grabStoresFn, props) {
  var newProps = _objectSpread2({}, props);

  return Object.assign(newProps, grabStoresFn(getStore() || {}, newProps) || {});
}
function inject()
/* fn(stores, nextProps) or ...storeNames, createStoreInjector */
{
  var grabStoresFn;
  var createStoreInjector = arguments[arguments.length - 1];

  if (typeof arguments[0] === 'function') {
    grabStoresFn = arguments[0];
    return function (componentClass) {
      return createStoreInjector(grabStoresFn, null, componentClass);
    };
  } else {
    var storeNames = [];

    for (var i = 0; i < arguments.length - 1; i++) {
      storeNames[i] = arguments[i];
    }

    grabStoresFn = grabStoresByName(storeNames);
    return function (componentClass) {
      return createStoreInjector(grabStoresFn, storeNames.join('-'), componentClass);
    };
  }
}

var onError = function onError(fn) {
  return errorsReporter.on(fn);
};

exports.onError = onError;
exports.PropTypes = PropTypes;
exports.useLocalStore = useLocalStore;
exports.useAsObservableSource = useAsObservableSource;
exports.isUsingStaticRendering = isUsingStaticRendering;
exports.useStaticRendering = useStaticRendering;
exports.getStore = getStore;
exports.setStore = setStore;
exports.errorsReporter = errorsReporter;
exports.inject = inject;
exports.getInjectName = getInjectName;
exports.mapStoreToProps = mapStoreToProps;
