"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractNodeFactory2 = _interopRequireDefault(require("./AbstractNodeFactory"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TreeNodeFactory =
/*#__PURE__*/
function (_AbstractNodeFactory) {
  _inherits(TreeNodeFactory, _AbstractNodeFactory);

  function TreeNodeFactory() {
    _classCallCheck(this, TreeNodeFactory);

    return _possibleConstructorReturn(this, _getPrototypeOf(TreeNodeFactory).call(this));
  }

  _createClass(TreeNodeFactory, null, [{
    key: "create",
    value: function create() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _data$key = data.key,
          key = _data$key === void 0 ? "" : _data$key,
          _data$value = data.value,
          value = _data$value === void 0 ? null : _data$value,
          _data$children = data.children,
          children = _data$children === void 0 ? [] : _data$children,
          _data$parent = data.parent,
          parent = _data$parent === void 0 ? null : _data$parent;
      return {
        key: key,
        value: value,
        children: children,
        parent: parent,
        getKey: function getKey() {
          return this.key;
        },
        getValue: function getValue() {
          return this.value;
        },
        getChildren: function getChildren() {
          return this.children;
        },
        addChild: function addChild(node) {
          this.children = [].concat(_toConsumableArray(this.children), [node]);
        },
        isRoot: function isRoot() {
          return this.parent == null;
        },
        setParent: function setParent(_parent) {
          this.parent = _parent;
        },
        getRootPath: function getRootPath() {
          var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var newPath = [].concat(_toConsumableArray(current), [this]);

          if (this.isRoot()) {
            return (0, _Utils.reverse)(newPath);
          } else {
            return this.parent.getRootPath(newPath);
          }
        }
      };
    }
  }, {
    key: "compare",
    value: function compare(a, b) {
      return a.getKey().localeCompare(b.getKey());
    }
  }, {
    key: "getKey",
    value: function getKey(node) {
      return node.getKey();
    }
  }, {
    key: "equals",
    value: function equals(a, b) {
      return TreeNodeFactory.compare(a, b) == 0;
    }
  }, {
    key: "link",
    value: function link(parent, child) {
      parent.addChild(child);
      child.setParent(parent);
    }
  }]);

  return TreeNodeFactory;
}(_AbstractNodeFactory2.default);

var _default = TreeNodeFactory;
exports.default = _default;