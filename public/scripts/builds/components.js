(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Api = {
    //url:"127.0.0.1",
    //port:"8080",
    get: function (dir, done) {
        $.ajax({
            url: dir,
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function (data) {
                done(null, data);
            },
            error: function (xhr, status, err) {
                done(err);
            }
        });
    },
    post: function (dir, data, done) {
        $.ajax({
            url: dir,
            type: "POST",
            dataType: 'json',
            data: data,
            cache: false,
            success: function (data) {
                done(null, data);
            },
            error: function (xhr, status, err) {
                done(err);
            }
        });
    }
};
module.exports = Api;
window.Map = Api;

},{}],2:[function(require,module,exports){
var Utils = require('./utils.jsx');
var Api = require('./api.js');
var Dropdown = Utils.Dropdown;
var Selection = Utils.Selection;

var MapLoad = {
    getInitialState: function () {
        return { map: [] };
    },
    loadMap: function () {
        Api.get(this.props.url, this.setMap);
    },
    setMap: function (err, data) {
        if (err) console.log(err);else this.setState({ map: data });
    },

    componentDidMount: function () {
        this.loadMap();
    }
};

var MapComponent = {
    Dropdown: React.createClass({
        displayName: 'Dropdown',

        mixins: [MapLoad],
        render: function () {
            return React.createElement(Dropdown, { elements: this.state.map, title: 'Map', onSelection: this.props.onSelection });
        }
    }),
    Selection: React.createClass({
        displayName: 'Selection',

        mixins: [MapLoad],
        render: function () {
            return React.createElement(Selection, { elements: this.state.map, title: 'Map', onSelection: this.props.onSelection });
        }
    })
};

module.exports = MapComponent;
window.Map = MapComponent;

},{"./api.js":1,"./utils.jsx":3}],3:[function(require,module,exports){
var Utils = {
    Dropdown: React.createClass({
        displayName: "Dropdown",

        propTypes: {
            elements: React.PropTypes.array.isRequired,
            title: React.PropTypes.string.isRequired,
            onSelection: React.PropTypes.func.isRequired
        },
        render: function () {
            var cb = this.props.onSelection;
            var elements = this.props.elements.map(function (elem) {
                return React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { href: "#", onClick: cb.bind(null, elem) },
                        elem
                    )
                );
            });
            return React.createElement(
                "div",
                { className: "dropdown" },
                React.createElement(
                    "button",
                    { className: "btn btn-primary dropdown-toggle", type: "button", "data-toggle": "dropdown" },
                    this.props.title,
                    React.createElement("span", { className: "caret" })
                ),
                React.createElement(
                    "ul",
                    { className: "dropdown-menu" },
                    elements
                )
            );
        }
    }),

    Selection: React.createClass({
        displayName: "Selection",

        propTypes: {
            elements: React.PropTypes.array.isRequired,
            title: React.PropTypes.string.isRequired,
            onSelection: React.PropTypes.func.isRequired
        },
        onSelectionWrapper: function (e) {
            this.props.onSelection(e.target.value);
        },
        render: function () {
            var cb = this.props.onSelection;
            var elements = this.props.elements.map(function (elem) {
                return React.createElement(
                    "option",
                    { value: elem },
                    elem
                );
            });
            return(
                //    <form role="form">
                //        <div className="form-group">
                React.createElement(
                    "select",
                    { className: "form-control", id: this.props.title + "sel", onChange: this.onSelectionWrapper, title: this.props.title, defaultValue: this.props.title },
                    React.createElement(
                        "option",
                        { disabled: true },
                        this.props.title
                    ),
                    elements
                )
                //        </div>
                //    </form>

            );
        }
    })
};

module.exports = Utils;
window.ReactUtils = Utils;

},{}]},{},[2,3]);
