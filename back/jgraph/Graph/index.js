"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GraphStrategy = require("../GraphStrategy");

var _NodeFactory = require("../NodeFactory");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Graph = function Graph() {
  var _this = this;

  var nodeFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _NodeFactory.NamedVertexFactory;
  var graphStrategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _GraphStrategy.AdjacencyMatrix;

  _classCallCheck(this, Graph);

  _defineProperty(this, "addNode", function () {
    var _this$graphStrategy;

    return (_this$graphStrategy = _this.graphStrategy).addNode.apply(_this$graphStrategy, arguments);
  });

  _defineProperty(this, "getNode", function () {
    var _this$graphStrategy2;

    return (_this$graphStrategy2 = _this.graphStrategy).getNode.apply(_this$graphStrategy2, arguments);
  });

  _defineProperty(this, "getAllNodes", function () {
    return _this.graphStrategy.getAllNodes();
  });

  _defineProperty(this, "hasNode", function () {
    var _this$graphStrategy3;

    return (_this$graphStrategy3 = _this.graphStrategy).hasNode.apply(_this$graphStrategy3, arguments);
  });

  _defineProperty(this, "addEdge", function () {
    var _this$graphStrategy4;

    return (_this$graphStrategy4 = _this.graphStrategy).addEdge.apply(_this$graphStrategy4, arguments);
  });

  _defineProperty(this, "getEdge", function () {
    var _this$graphStrategy5;

    return (_this$graphStrategy5 = _this.graphStrategy).getEdge.apply(_this$graphStrategy5, arguments);
  });

  _defineProperty(this, "getAllEdges", function () {
    return _this.graphStrategy.getAllEdges();
  });

  _defineProperty(this, "hasEdge", function () {
    var _this$graphStrategy6;

    return (_this$graphStrategy6 = _this.graphStrategy).hasEdge.apply(_this$graphStrategy6, arguments);
  });

  _defineProperty(this, "getNeighbors", function () {
    var _this$graphStrategy7;

    return (_this$graphStrategy7 = _this.graphStrategy).getNeighbors.apply(_this$graphStrategy7, arguments);
  });

  this.nodeFactory = nodeFactory;
  this.graphStrategy = new graphStrategy(this.nodeFactory);
};

var _default = Graph;
exports.default = _default;