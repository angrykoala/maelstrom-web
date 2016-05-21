(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Api = {
	timeout: 3000,
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
	},
	getPoll: function (dir, done, timeout, onError) {
		var time = timeout || this.timeout;
		$.ajax({
			url: dir,
			type: "GET",
			dataType: 'json',
			cache: false,
			success: function (data) {
				done(null, data);
			},
			error: function (xhr, status) {
				setTimeout(function () {
					this.getPoll(dir, done, timeout);
				}.bind(this), time);
				if (onError) onError(xhr.responseJSON);
			}.bind(this)
		});
	},
	getPollAuth: function (dir, done, onError) {
		var token = User.getToken();
		var time = this.timeout;
		$.ajax({
			url: dir,
			type: "GET",
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + token
			},
			cache: false,
			success: function (data) {
				done(null, data);
			},
			error: function (xhr, status) {
				setTimeout(function () {
					this.getPollAuth(dir, done, time);
				}.bind(this), time);
				if (onError) onError(xhr.responseJSON);
			}.bind(this)
		});
	}
};
module.exports = Api;

},{}],2:[function(require,module,exports){
var Utils = require('./utils.jsx');
var Map = require('./map.jsx');
var ShipModels = require('./../ship-models');

var BuildButton = React.createClass({
    displayName: 'BuildButton',

    getInitialState: function () {
        return { clicked: false };
    },
    render: function () {
        var modal = "";
        if (this.state.clicked) modal = React.createElement('buildModal', null);

        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { type: 'button', className: 'btn btn-primary', 'data-toggle': 'modal', 'data-target': '#build-modal' },
                'Build Ship'
            ),
            React.createElement(BuildModal, null)
        );
    }
});
var BuildModal = React.createClass({
    displayName: 'BuildModal',

    getInitialState: function () {
        return { shipName: '', city: '', shipModel: '', models: [], errorMessage: "" };
    },
    nameChange: function (event) {
        this.setState({ shipName: event.target.value });
    },
    cityChange: function (city) {
        this.setState({ city: city });
    },
    shipChange: function (ship) {
        this.setState({ shipModel: ship });
    },
    buildShip: function (e) {
        e.preventDefault();
        if (User.logged()) {
            var token = User.getToken();
            $.ajax({
                url: URLS.world + '/user/build/ship',
                type: "PUT",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    model: this.state.shipModel,
                    ship_name: this.state.shipName,
                    city: this.state.city
                },
                cache: false,
                success: function (data) {
                    this.setState({ errorMessage: React.createElement(
                            'p',
                            { className: 'text-success' },
                            'Ship succesfully built'
                        ) });
                }.bind(this),
                error: function (xhr, status) {
                    var err = xhr.responseJSON.error || "";
                    this.setState({ errorMessage: React.createElement(
                            'p',
                            { className: 'text-danger' },
                            'Error Building Ship ',
                            err
                        ) });
                }.bind(this)
            });
        }
    },
    componentDidMount: function () {
        ShipModels.promise.then(function () {
            this.setState({ models: ShipModels.list });
        }.bind(this));
    },
    render: function () {
        return React.createElement(
            'div',
            { id: 'build-modal', className: 'modal fade', role: 'dialog' },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                            '×'
                        ),
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            'Build Ship'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'form',
                            { id: 'build-form', role: 'form', action: '', onSubmit: this.buildShip },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { type: 'text', placeholder: 'Ship Name', className: 'form-control', onChange: this.nameChange })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    null,
                                    'City:'
                                ),
                                React.createElement(Map.Selection, { url: URLS.world + "/map", onSelection: this.cityChange })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    null,
                                    'Ship Models:'
                                ),
                                React.createElement(Utils.Selection, { elements: this.state.models, title: 'Ship Model', onSelection: this.shipChange })
                            ),
                            this.state.errorMessage,
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'button',
                                    { type: 'submit', className: 'btn btn-primary' },
                                    'Build'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                            'Close'
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(BuildButton, null)
), document.getElementById('build-button'));

},{"./../ship-models":10,"./map.jsx":4,"./utils.jsx":7}],3:[function(require,module,exports){
var Products = require('../products');

var Cargo = React.createClass({
    displayName: "Cargo",

    propTypes: {
        products: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        city: React.PropTypes.string.isRequired
    },
    getInitialState: function () {
        return {
            products: [],
            cityProducts: {},
            docked: this.props.status == "docked"
        };
    },
    getCityDetails: function () {
        $.ajax({
            url: URLS.world + "/city/products/" + this.props.city,
            type: "GET",
            dataType: 'json',
            /*            headers: {
                            'Authorization': 'Bearer ' + token
                        },*/
            cache: false,
            success: function (data) {
                Products.promise.then(function () {
                    this.setState({
                        products: Products.list,
                        cityProducts: data
                    });
                }.bind(this));
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("ERROR " + err);
                console.log("  " + JSON.stringify(xhr));
            }.bind(this)
        });
    },
    componentDidMount: function () {
        if (this.state.docked) this.getCityDetails();
    },
    render: function () {
        var elements = [];
        if (!this.state.docked) {
            for (var elem in this.props.products) {
                elements.push(React.createElement(ProductDisplay, { name: elem, quantity: this.props.products[elem], shipId: this.props.id, docked: this.state.docked }));
            }
        } else {
            var shipProd = this.props.products;
            var cityProd = this.state.cityProducts;
            var dock = this.state.docked;
            var shipId = this.props.id;
            this.state.products.map(function (elem) {
                var shipq = shipProd[elem] || 0;
                var cityq = cityProd[elem].quantity || 0;
                var price = cityProd[elem].price || 0;
                elements.push(React.createElement(ProductDisplay, { name: elem, quantity: shipq, shipId: shipId, docked: dock, cityQuantity: cityq, price: price }));
            });
        }
        return React.createElement(
            "table",
            { className: "table table-hover" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        { className: "text-center" },
                        "Product"
                    ),
                    React.createElement(
                        "th",
                        { className: "text-center" },
                        "Ship"
                    ),
                    React.createElement(
                        "th",
                        { className: "text-center" },
                        "Actions"
                    ),
                    React.createElement(
                        "th",
                        { className: "text-center" },
                        "City"
                    ),
                    React.createElement(
                        "th",
                        { className: "text-center" },
                        "Price"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                elements
            )
        );
    }
});

var ProductDisplay = React.createClass({
    displayName: "ProductDisplay",

    propTypes: {
        name: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired,
        shipId: React.PropTypes.string.isRequired,
        docked: React.PropTypes.bool.isRequired,
        price: React.PropTypes.number,
        cityQuantity: React.PropTypes.number
    },
    getInitialState: function () {
        return { value: null, quantity: this.props.quantity, cityq: this.props.cityQuantity, eventMessage: "" };
    },
    handleChange: function (event) {
        var val = event.target.value;
        if (val < 0) val = 0;

        this.setState({ value: val });
    },
    buy: function () {
        var val = parseInt(this.state.value) || 0;
        //console.log("Buy "+val+" of "+this.props.name+" in "+this.props.shipId);
        if (User.logged() && val > 0) {
            var token = User.getToken();
            $.ajax({
                url: URLS.world + "/user/buy",
                type: "PUT",
                dataType: 'json',
                data: {
                    ship: this.props.shipId,
                    product: this.props.name,
                    quantity: val
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function (data) {
                    var q = this.state.quantity;
                    var cq = this.state.cityq;
                    this.setState({
                        quantity: q + val,
                        cityq: cq - val,
                        eventMessage: ""
                    });
                }.bind(this),
                error: function (xhr, status, err) {
                    var errmsg = JSON.stringify(xhr.responseJSON.error) || "";
                    this.setState({ eventMessage: "Error buying: " + errmsg });
                }.bind(this)
            });
        }
    },
    sell: function () {
        var val = parseInt(this.state.value) || 0;
        if (User.logged() && val > 0) {
            var token = User.getToken();

            $.ajax({
                url: URLS.world + "/user/sell",
                type: "PUT",
                dataType: 'json',
                data: {
                    ship: this.props.shipId,
                    product: this.props.name,
                    quantity: val
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function (data) {
                    console.log("SUCCESS " + JSON.stringify(data));
                    var q = this.state.quantity;
                    var cq = this.state.cityq;
                    this.setState({
                        quantity: q - val,
                        cityq: cq + val,
                        eventMessage: ""
                    });
                }.bind(this),
                error: function (xhr, status, err) {
                    var errmsg = xhr.responseJSON.error;
                    this.setState({ eventMessage: "Error selling: " + errmsg });
                }.bind(this)
            });
        }
    },
    render: function () {
        var actionButtons;
        var cityProduct;
        if (this.props.docked) {
            actionButtons = React.createElement(
                "div",
                { className: "btn-group" },
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-default", onClick: this.buy },
                    "Buy"
                ),
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-default", onClick: this.sell },
                    "Sell"
                )
            );

            cityProduct = this.state.cityq || 0;
        } else {
            actionButtons = React.createElement(
                "div",
                { className: "btn-group" },
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-default", onClick: this.buy, disabled: true },
                    "Buy"
                ),
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-default", onClick: this.sell, disabled: true },
                    "Sell"
                )
            );

            cityProduct = "";
        }
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                this.props.name
            ),
            React.createElement(
                "td",
                null,
                this.state.quantity
            ),
            React.createElement(
                "td",
                null,
                React.createElement(
                    "form",
                    { role: "form" },
                    React.createElement("input", { type: "number", min: "0", value: this.state.value, onChange: this.handleChange, className: "form-control input-sm" })
                ),
                actionButtons,
                React.createElement(
                    "p",
                    { className: "text-danger" },
                    this.state.eventMessage
                )
            ),
            React.createElement(
                "td",
                null,
                cityProduct
            ),
            React.createElement(
                "td",
                null,
                this.props.price
            )
        );
    }
});

module.exports = Cargo;

},{"../products":9}],4:[function(require,module,exports){
var Utils = require('./utils.jsx');
var Api = require('../api.js');
var Map = require('../map.js');
var Dropdown = Utils.Dropdown;
var Selection = Utils.Selection;

var MapLoad = {
    getInitialState: function () {
        return { map: [] };
    },
    componentDidMount: function () {
        Map.promise.then(function (data) {
            this.setState({ map: Map.list });
        }.bind(this));
    }
};

var MapComponent = {
    /*Dropdown: React.createClass({
        mixins: [MapLoad],
        render: function() {
            return (<Dropdown elements={this.state.map} title="Map" onSelection={this.props.onSelection}/>);
        }
    }),*/
    Selection: React.createClass({
        displayName: 'Selection',

        mixins: [MapLoad],
        render: function () {
            return React.createElement(Selection, { elements: this.state.map, title: 'Map', onSelection: this.props.onSelection });
        }
    })
};

module.exports = MapComponent;

},{"../api.js":1,"../map.js":8,"./utils.jsx":7}],5:[function(require,module,exports){
var AutoCounter = require('./utils.jsx').AutoCounter;
var Cargo = require('./cargo.jsx');
var Map = require('./map.jsx');
var GameMap = require('../map');

var ShipLoad = {
    getInitialState: function () {
        return {
            ship: {
                model: "",
                status: "",
                cargo: {}
            },
            loaded: false,
            cityName: ""
        };
    },
    loadShip: function (shipId) {
        if (User.logged() && this.props.url && shipId) {
            var token = User.getToken();
            $.ajax({
                url: this.props.url + "/" + shipId,
                type: "GET",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function (data) {
                    this.setShip(null, data);
                }.bind(this),
                error: function (xhr, status, err) {
                    this.setShip({ error: err });
                }.bind(this)
            });
        }
    },
    setShip: function (err, data) {
        if (err) console.log(err);else {
            this.setState({ ship: data, loaded: true });
            GameMap.promise.then(function () {
                this.setState({ cityName: GameMap.names[data.city] || data.city });
            }.bind(this));
        }
    },
    componentWillReceiveProps: function (props) {
        this.setState({ loaded: false });
        if (props.id) this.loadShip(props.id);
    }
};

var Modal = React.createClass({
    displayName: 'Modal',

    mixins: [ShipLoad],
    getInitialState: function () {
        return { alertMsg: "" };
    },
    moveTo: function (selec) {
        if (User.logged() && this.state.ship.slug) {
            var token = User.getToken();
            $.ajax({
                url: URLS.world + '/user/move/ship',
                type: "PUT",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    ship: this.state.ship.slug,
                    city: selec
                },
                cache: false,
                success: function (data) {
                    var s = this.state.ship;
                    this.setState({ alertMsg: React.createElement(
                            'p',
                            { className: 'text-success' },
                            'Operation Successful'
                        ) });
                    this.reloadShip();
                    //s.status.value="traveling";
                    //this.setState({ship:s});
                }.bind(this),
                error: function (xhr, status) {
                    var err = xhr.responseJSON.error;
                    this.setState({ alertMsg: React.createElement(
                            'p',
                            { className: 'text-danger' },
                            'Error on move Ship: ',
                            err
                        ) });
                }.bind(this)
            });
        }
    },
    reloadShip: function () {
        this.setState({ loaded: false });
        this.loadShip(this.state.ship.slug);
    },
    render: function () {
        var shipId = this.props.id || "null";
        var bodyContent;
        var remaining = "";
        var alert = React.createElement('p', null);
        if (this.state.alertMsg) {
            alert = this.state.alertMsg;
        }
        if (this.state.ship.status.value === "traveling") {
            var t = parseInt(this.state.ship.status.remaining);
            remaining = React.createElement(
                'p',
                null,
                'Remaining: ',
                React.createElement(AutoCounter, { time: t, onTimeout: this.reloadShip })
            );
        }
        if (this.state.loaded) {
            bodyContent = React.createElement(
                'div',
                { id: 'ship-data' },
                React.createElement(
                    'p',
                    null,
                    'Type: ',
                    this.state.ship.model.name
                ),
                React.createElement(
                    'p',
                    null,
                    'Life: ',
                    this.state.ship.life
                ),
                React.createElement(
                    'p',
                    null,
                    'Status: ',
                    this.state.ship.status.value
                ),
                remaining,
                React.createElement(
                    'p',
                    null,
                    'City: ',
                    this.state.cityName
                ),
                React.createElement(
                    'p',
                    null,
                    'Move To'
                ),
                React.createElement(Map.Selection, { url: URLS.world + "/map", onSelection: this.moveTo }),
                alert,
                React.createElement('hr', null),
                React.createElement(
                    'h4',
                    null,
                    'Cargo'
                ),
                React.createElement(Cargo, { products: this.state.ship.cargo, id: shipId, status: this.state.ship.status.value, city: this.state.ship.city })
            );
        } else {
            bodyContent = React.createElement('img', { src: 'images/ajax-loader.gif', alt: 'Loading', width: '42', height: '42', className: 'loading-img' });
        }

        return React.createElement(
            'div',
            { className: 'modal fade', id: 'ship-modal', role: 'dialog' },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                            '×'
                        ),
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            React.createElement(
                                'strong',
                                null,
                                this.props.name
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        bodyContent
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                            'Close'
                        )
                    )
                )
            )
        );
    }
});

module.exports = Modal;

},{"../map":8,"./cargo.jsx":3,"./map.jsx":4,"./utils.jsx":7}],6:[function(require,module,exports){
var ShipModal = require('./ship-modal.jsx');
var Api = require('../api.js');

var ShipsLoad = {
    getInitialState: function () {
        return { ships: [], id: "", name: "", loaded: false };
    },
    loadAllShips: function () {
        if (User.logged()) {
            //var cb = this.setShips;
            Api.getPollAuth(URLS.world + "/user/ships", this.setShips);
        }
    },
    setShips: function (err, data) {
        if (err) console.log(err);else {
            this.setState({ ships: data, loaded: true });
        }
    },
    componentDidMount: function () {
        this.loadAllShips();
        addSocketEvent('ship_built', this.loadAllShips);
    }
};

var ShipList = React.createClass({
    displayName: 'ShipList',

    mixins: [ShipsLoad],
    setModal: function (id, name) {
        this.setState({ id: id, name: name });
    },
    render: function () {
        var setModal = this.setModal;
        var elements = React.createElement('img', { src: 'images/ajax-loader.gif', alt: 'Loading', width: '42', height: '42', className: 'loading-img' });
        var url = URLS.world + "/user/ship";
        if (this.state.loaded) {
            elements = this.state.ships.map(function (elem) {
                return React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    React.createElement(ShipDisplay, { name: elem.name, model: elem.model, life: elem.life, id: elem.slug, onClick: setModal })
                );
            });
            if (!elements || elements.length === 0) elements = "No Ships";
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'row' },
                elements
            ),
            React.createElement(ShipModal, { url: url, id: this.state.id, name: this.state.name })
        );
    }
});

var ShipDisplay = React.createClass({
    displayName: 'ShipDisplay',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        model: React.PropTypes.string.isRequired,
        life: React.PropTypes.number.isRequired,
        onClick: React.PropTypes.func.isRequired
        //id required
    },
    handleClick: function () {
        this.props.onClick(this.props.id, this.props.name);
        //ModalShip.loadShip(this.props.id, this.props.name);
    },
    render: function () {
        return React.createElement(
            'button',
            { type: 'button', className: 'well btn-default', 'data-toggle': 'modal', 'data-target': '#ship-modal', onClick: this.handleClick },
            React.createElement(
                'h4',
                null,
                this.props.name + " ",
                React.createElement(
                    'small',
                    null,
                    this.props.model
                )
            ),
            React.createElement(
                'p',
                null,
                'Life: ',
                this.props.life
            )
        );
    }
});
var ShipsComponent = {
    list: ShipList
};
//module.exports=ShipsComponent;

ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(ShipList, null)
), document.getElementById('ship-list'));

},{"../api.js":1,"./ship-modal.jsx":5}],7:[function(require,module,exports){
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
                    { value: elem.slug },
                    elem.name
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
    }),
    AutoCounter: React.createClass({
        displayName: "AutoCounter",

        propTypes: {
            time: React.PropTypes.number.isRequired,
            onTimeout: React.PropTypes.func.isRequired
        },
        getInitialState: function () {
            return { count: parseInt(this.props.time) + 1 };
        },
        componentDidMount: function () {
            this.updateTime();
        },
        updateTime: function () {
            var t = this.state.count;
            t--;
            if (t === 0) this.props.onTimeout();else {
                this.timeCount = setTimeout(this.updateTime, 1000);
                this.setState({ count: t });
            }
        },
        componentWillUnmount: function () {
            clearTimeout(this.timeCount);
        },
        render: function () {
            return React.createElement(
                "span",
                null,
                this.state.count
            );
        }

    })
};

module.exports = Utils;

},{}],8:[function(require,module,exports){
// Map handler
var API = require('./api');

function getIndex(l) {
	var ind = {};
	for (var i = 0; i < l.length; i++) {
		ind[l[i].slug] = l[i].name;
	}
	return ind;
}

function GameMap() {
	this.list = [];
	this.names = {};
	this.promise = new Promise(function (resolve, reject) {
		API.getPoll(URLS.world + '/map', function (err, data) {
			if (err) {
				console.log("GAME MAP ERROR");
			} else {
				this.list = data;
				this.names = getIndex(this.list);
				resolve();
			}
		}.bind(this));
	}.bind(this));
}

var Map = new GameMap();
module.exports = Map;

},{"./api":1}],9:[function(require,module,exports){
//Products handler
var API = require('./api');

function GameProducts() {
	this.list = [];
	this.promise = new Promise(function (resolve, reject) {
		API.getPoll(URLS.world + '/products', function (err, data) {
			if (err) {
				console.log("GAME PRODUCTS ERROR");
			} else {
				this.list = data;
				resolve();
			}
		}.bind(this));
	}.bind(this));
}

var Products = new GameProducts();

module.exports = Products;

},{"./api":1}],10:[function(require,module,exports){
//Ship Models Handler
var API = require('./api');

function ShipModels() {
	this.list = [];
	this.promise = new Promise(function (resolve, reject) {
		API.getPoll(URLS.world + '/ship_models', function (err, data) {
			if (err) {
				console.log("Ship Models ERROR");
			} else {
				this.list = data;
				resolve();
			}
		}.bind(this));
	}.bind(this));
}

var Ships = new ShipModels();
module.exports = Ships;

},{"./api":1}]},{},[2,3,4,5,6,7]);
