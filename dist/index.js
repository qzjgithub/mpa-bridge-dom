'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../lib/require');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bridge = function (_Component) {
    _inherits(Bridge, _Component);

    function Bridge(props, context) {
        _classCallCheck(this, Bridge);

        var _this = _possibleConstructorReturn(this, (Bridge.__proto__ || Object.getPrototypeOf(Bridge)).call(this, props, context));

        window['require'] && window['require'].config({
            baseUrl: _this.props.baseUrl || '../',
            path: {
                text: "../lib/text",
                async: '../lib/async',
                font: '../lib/font',
                goog: '../lib/goog',
                image: '../lib/image',
                json: '../lib/json',
                noext: '../lib/noext',
                mdown: '../lib/mdown',
                propertyParser: '../lib/propertyParser',
                markdownConverter: '../lib/Markdown.Converter'
            }
        });
        return _this;
    }

    _createClass(Bridge, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                sessionName = _props.sessionName,
                mn = _props.mn,
                pathname = _props.pathname,
                id = _props.id,
                extra = _props.extra;
            var _props2 = this.props,
                store = _props2.store,
                reducers = _props2.reducers,
                actions = _props2.actions;

            if (mn) {
                sessionStorage.setItem(sessionName, JSON.stringify({ sessionName: sessionName, mn: mn, pathname: pathname, extra: extra }));
            } else {
                var param = JSON.parse(sessionStorage.getItem(sessionName)) || {};
                mn = param.mn;
                pathname = param.pathname;
                extra = param.extra;
            }
            id = id || 'app';
            extra = extra || [];
            var extras = extra.map(function (v) {
                return './' + mn + '/' + v;
            });
            mn && window['require'](['./' + mn + '/index'].concat(_toConsumableArray(extras)), function (enter) {
                enter({ pathname: pathname, id: id, mn: mn }, { store: store, reducers: reducers, actions: actions }, sessionName);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: this.props.id || 'app' },
                ' '
            );
        }
    }]);

    return Bridge;
}(_react.Component);

exports.default = Bridge;