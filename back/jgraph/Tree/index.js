"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NodeFactory = require("../NodeFactory");

var _Utils = require("../Utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tree = function Tree(root) {
  var _this = this;

  var nodeFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _NodeFactory.TreeNodeFactory;

  _classCallCheck(this, Tree);

  _defineProperty(this, "getNextLevel", function () {
    return _this.root.children;
  });

  _defineProperty(this, "getLevel", function (depth) {
    if (depth == 0) {
      return _this.root;
    } else if (depth == 1) {
      return _this.getNextLevel();
    } else {
      return _this.root.getChildren().map(function (x) {
        return new Tree(x);
      }).flatMap((0, _Utils.call)("getLevel", depth - 1));
    }
  });

  _defineProperty(this, "addPath", function (path) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
    var data = "".concat(path).split(delimiter).map(function (x) {
      return _this.nodeFactory.create({
        key: x
      });
    });

    if (_this.root == undefined) {
      _this.root = data[0];
    }

    var masterNode = _this.root;

    var _loop = function _loop(i) {
      var node = data[i];

      if (!_this.nodeFactory.equals(node, masterNode)) {
        var child = masterNode.getChildren().find(function (x) {
          return _this.nodeFactory.equals(x, node);
        });

        if (!child) {
          _this.nodeFactory.link(masterNode, node);

          child = node;
        }

        masterNode = child;
      }
    };

    for (var i = 0; i < data.length; i++) {
      _loop(i);
    }
  });

  this.root = root;
  this.nodeFactory = nodeFactory;
};

var _default = Tree;
exports.default = _default;