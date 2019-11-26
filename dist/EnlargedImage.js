'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _imageCoordinates = require('./lib/imageCoordinates');

var _Image = require('./prop-types/Image');

var _EnlargedImage = require('./prop-types/EnlargedImage');

var _utils = require('./utils');

var _Point = require('./prop-types/Point');

var _Point2 = _interopRequireDefault(_Point);

var _styles = require('./lib/styles');

var _svgPathCanvas = require('svg-path-canvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.state = {
            isTransitionEntering: false,
            isTransitionActive: false,
            isTransitionLeaving: false,
            isTransitionDone: false,
            lockedPosition: null
        };

        _this.timers = [];
        return _this;
    }

    _createClass(_class, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.scheduleCssTransition(nextProps);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.timers.forEach(function (timerId) {
                clearTimeout(timerId);
            });
        }
    }, {
        key: 'scheduleCssTransition',
        value: function scheduleCssTransition(nextProps) {
            var _this2 = this;

            var _props = this.props,
                fadeDurationInMs = _props.fadeDurationInMs,
                isActive = _props.isActive,
                isPositionOutside = _props.isPositionOutside,
                isLocked = _props.isLocked;


            var willIsActiveChange = isActive !== nextProps.isActive;
            var willIsPositionOutsideChange = isPositionOutside !== nextProps.isPositionOutside;

            if (!willIsActiveChange && !willIsPositionOutsideChange || isLocked) {
                return;
            }

            if (nextProps.isActive && !nextProps.isPositionOutside) {
                this.setState({
                    isTrainsitionDone: false,
                    isTransitionEntering: true
                });

                this.timers.push(setTimeout(function () {
                    _this2.setState({
                        isTransitionEntering: false,
                        isTransitionActive: true
                    });
                }, 0));
            } else {
                this.setState({
                    isTransitionLeaving: true,
                    isTransitionActive: false
                });

                this.timers.push(setTimeout(function () {
                    _this2.setState({
                        isTransitionDone: true,
                        isTransitionLeaving: false
                    });
                }, fadeDurationInMs));
            }
        }
    }, {
        key: 'getImageCoordinates',
        value: function getImageCoordinates() {
            var _props2 = this.props,
                cursorOffset = _props2.cursorOffset,
                largeImage = _props2.largeImage,
                containerDimensions = _props2.containerDimensions,
                position = _props2.position,
                smallImage = _props2.smallImage,
                isInPlaceMode = _props2.isInPlaceMode;


            if (isInPlaceMode) {
                return (0, _imageCoordinates.getInPlaceEnlargedImageCoordinates)({
                    containerDimensions: containerDimensions,
                    largeImage: largeImage,
                    position: position
                });
            }

            return (0, _imageCoordinates.getLensModeEnlargedImageCoordinates)({
                containerDimensions: containerDimensions,
                cursorOffset: cursorOffset,
                largeImage: largeImage,
                position: position,
                smallImage: smallImage
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props3 = this.props,
                containerClassName = _props3.containerClassName,
                imageClassName = _props3.imageClassName,
                isLazyLoaded = _props3.isLazyLoaded,
                largeImage = _props3.largeImage,
                _props3$largeImage = _props3.largeImage,
                _props3$largeImage$al = _props3$largeImage.alt,
                alt = _props3$largeImage$al === undefined ? '' : _props3$largeImage$al,
                _props3$largeImage$on = _props3$largeImage.onLoad,
                onLoad = _props3$largeImage$on === undefined ? _utils.noop : _props3$largeImage$on,
                _props3$largeImage$on2 = _props3$largeImage.onError,
                onError = _props3$largeImage$on2 === undefined ? _utils.noop : _props3$largeImage$on2,
                enableSegmentation = _props3.enableSegmentation;


            var component = enableSegmentation ? _react2.default.createElement(_svgPathCanvas.OverlayImage, _extends({
                className: containerClassName,
                style: this.containerStyle
            }, {
                imageComponent: _react2.default.createElement('img', {
                    alt: alt,
                    className: imageClassName,
                    src: largeImage.src,
                    srcSet: largeImage.srcSet,
                    sizes: largeImage.sizes,
                    style: this.imageStyle,
                    onLoad: onLoad,
                    onError: onError
                }),
                overlayComponent: function () {
                    var imgStyle = _this3.imageStyle;
                    var imageCoordinates = void 0;

                    var isLocked = _this3.props.isLocked;

                    if (isLocked && _this3.state.lockedPosition !== null) {
                        imageCoordinates = _this3.state.lockedPosition;
                    } else {
                        imageCoordinates = _this3.getImageCoordinates();
                    }

                    return _react2.default.createElement(_svgPathCanvas.CircleCanvas, {
                        circleProps: { fill: 'rgba(255, 0, 0, 0.5)' }
                        // circles={this.state.circles}
                        // onPathFinish={(finishedPath, allPaths) => {
                        //     this.setState({
                        //         paths: allPaths
                        //     })
                        // }}
                        , initialRadius: 5,
                        width: imgStyle.width,
                        height: imgStyle.height,
                        style: {
                            transform: 'translate(' + imageCoordinates.x + 'px, ' + imageCoordinates.y + 'px)'
                        }
                    });
                }()
            })) : _react2.default.createElement(
                'div',
                {
                    className: containerClassName,
                    style: this.containerStyle
                },
                _react2.default.createElement('img', {
                    alt: alt,
                    className: imageClassName,
                    src: largeImage.src,
                    srcSet: largeImage.srcSet,
                    sizes: largeImage.sizes,
                    style: this.imageStyle,
                    onLoad: onLoad,
                    onError: onError
                })
            );

            if (isLazyLoaded) {
                return this.isVisible ? component : null;
            }

            return component;
        }
    }, {
        key: 'isVisible',
        get: function get() {
            var _state = this.state,
                isTransitionEntering = _state.isTransitionEntering,
                isTransitionActive = _state.isTransitionActive,
                isTransitionLeaving = _state.isTransitionLeaving;


            return isTransitionEntering || isTransitionActive || isTransitionLeaving;
        }
    }, {
        key: 'containerStyle',
        get: function get() {
            var _props4 = this.props,
                containerStyle = _props4.containerStyle,
                containerDimensions = _props4.containerDimensions,
                fadeDurationInMs = _props4.fadeDurationInMs,
                isPortalRendered = _props4.isPortalRendered,
                isInPlaceMode = _props4.isInPlaceMode;
            var isTransitionActive = this.state.isTransitionActive;


            return (0, _styles.getEnlargedImageContainerStyle)({
                containerDimensions: containerDimensions,
                containerStyle: containerStyle,
                fadeDurationInMs: fadeDurationInMs,
                isTransitionActive: isTransitionActive,
                isInPlaceMode: isInPlaceMode,
                isPortalRendered: isPortalRendered
            });
        }
    }, {
        key: 'imageStyle',
        get: function get() {
            var _props5 = this.props,
                imageStyle = _props5.imageStyle,
                largeImage = _props5.largeImage,
                isLocked = _props5.isLocked;

            // The following block controls locking behavior for image coordinates

            var coords = void 0;
            if (isLocked && this.state.lockedPosition === null) {
                coords = this.getImageCoordinates();
                this.setState({
                    lockedPosition: coords
                });
            } else if (!isLocked && this.state.lockedPosition !== null) {
                coords = this.getImageCoordinates();
                this.setState({
                    lockedPosition: null
                });
            } else if (isLocked && this.state.lockedPosition !== null) {
                coords = this.state.lockedPosition;
            } else {
                coords = this.getImageCoordinates();
            }

            return (0, _styles.getEnlargedImageStyle)({
                imageCoordinates: coords,
                imageStyle: imageStyle,
                largeImage: largeImage
            });
        }
    }]);

    return _class;
}(_react2.default.Component);

_class.displayName = 'EnlargedImage';
_class.defaultProps = {
    fadeDurationInMs: 0,
    isLazyLoaded: true
};
_class.propTypes = {
    containerClassName: _propTypes2.default.string,
    containerStyle: _propTypes2.default.object,
    cursorOffset: _Point2.default,
    position: _Point2.default,
    fadeDurationInMs: _propTypes2.default.number,
    imageClassName: _propTypes2.default.string,
    imageStyle: _propTypes2.default.object,
    isActive: _propTypes2.default.bool,
    isLazyLoaded: _propTypes2.default.bool,
    largeImage: _Image.LargeImageShape,
    containerDimensions: _EnlargedImage.ContainerDimensions,
    isPortalRendered: _propTypes2.default.bool,
    isInPlaceMode: _propTypes2.default.bool
};
exports.default = _class;