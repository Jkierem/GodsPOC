"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = exports.multiEquals = exports.union = exports.zip = exports.shallowEquals = exports.asymEquals = exports.binaryUnion = exports.equals = exports.isEmpty = exports.tail = exports.head = exports.not = exports.reverse = exports.isDefined = exports.keysOf = exports.prop = exports.abstractMethodError = void 0;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var abstractMethodError = function abstractMethodError(methodName) {
  throw Error("Abstract method ".concat(methodName, " not implemented."));
}; //curryed funks


exports.abstractMethodError = abstractMethodError;

var prop = function prop(name) {
  return function (obj) {
    return obj === null || obj === void 0 ? void 0 : obj[name];
  };
}; //unary funks


exports.prop = prop;

var keysOf = function keysOf(obj) {
  return obj ? Object.keys(obj) : [];
};

exports.keysOf = keysOf;

var isDefined = function isDefined(obj) {
  return obj !== undefined && obj !== null;
};

exports.isDefined = isDefined;

var reverse = function reverse(arr) {
  return arr.reduce(function (acc, obj) {
    return [obj].concat(_toConsumableArray(acc));
  }, []);
};

exports.reverse = reverse;

var not = function not(funk) {
  return function () {
    return !funk.apply(void 0, arguments);
  };
};

exports.not = not;

var head = function head(arr) {
  var _arr2 = _slicedToArray(arr, 1),
      head = _arr2[0];

  return head;
};

exports.head = head;

var tail = function tail(arr) {
  var _arr3 = _toArray(arr),
      tail = _arr3.slice(1);

  return tail;
};

exports.tail = tail;

var isEmpty = function isEmpty(arr) {
  return arr.length == 0;
}; //binary funks


exports.isEmpty = isEmpty;

var equals = function equals(a, b) {
  return a == b;
};

exports.equals = equals;

var binaryUnion = function binaryUnion(arr1, arr2) {
  return [].concat(_toConsumableArray(arr1), _toConsumableArray(arr2)).reduce(function (acc, cur) {
    return acc.includes(cur) ? acc : [].concat(_toConsumableArray(acc), [cur]);
  }, []);
};

exports.binaryUnion = binaryUnion;

var asymEquals = function asymEquals(obj1, obj2) {
  return keysOf(obj1).every(function (key) {
    return obj1[key] == obj2[key];
  });
};

exports.asymEquals = asymEquals;

var shallowEquals = function shallowEquals(obj1, obj2) {
  return union(keysOf(obj1), keysOf(obj2)).map(prop).every(function (keyOf) {
    return equals(keyOf(obj1), keyOf(obj2));
  });
}; //n-ary funks


exports.shallowEquals = shallowEquals;

var zip = function zip() {
  for (var _len = arguments.length, arrs = new Array(_len), _key = 0; _key < _len; _key++) {
    arrs[_key] = arguments[_key];
  }

  return arrs.some(isEmpty) ? [] : [_toConsumableArray(arrs.map(head))].concat(_toConsumableArray(zip.apply(void 0, _toConsumableArray(arrs.map(tail)))));
};

exports.zip = zip;

var union = function union() {
  for (var _len2 = arguments.length, arrs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    arrs[_key2] = arguments[_key2];
  }

  return arrs.reduce(binaryUnion);
};

exports.union = union;

var multiEquals = function multiEquals() {
  for (var _len3 = arguments.length, objs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    objs[_key3] = arguments[_key3];
  }

  return zip(objs, tail(objs)).map(function (x) {
    return shallowEquals.apply(void 0, _toConsumableArray(x));
  }).every(Boolean);
};

exports.multiEquals = multiEquals;

var call = function call(funk) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return function (obj) {
    return obj[funk].apply(obj, args);
  };
};

exports.call = call;