var Utils = {
    Dropdown: React.createClass({
        propTypes: {
            elements: React.PropTypes.array.isRequired,
            title: React.PropTypes.string.isRequired,
            onSelection: React.PropTypes.func.isRequired
        },
        render: function() {
            var cb = this.props.onSelection;
            var elements = this.props.elements.map(function(elem) {
                return (
                    <li>
                        <a href="#" onClick={cb.bind(null, elem)}>{elem}</a>
                    </li>
                );
            });
            return (
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.props.title}
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        {elements}
                    </ul>
                </div>
            );
        }
    }),
    Selection: React.createClass({
        propTypes: {
            elements: React.PropTypes.array.isRequired,
            title: React.PropTypes.string.isRequired,
            onSelection: React.PropTypes.func.isRequired
        },
        onSelectionWrapper: function(e) {
            this.props.onSelection(e.target.value);
        },
        render: function() {
            var cb = this.props.onSelection;
            var elements = this.props.elements.map(function(elem) {
                return (
                    <option value={elem}>{elem}</option>
                );
            });
            return (
            //    <form role="form">
            //        <div className="form-group">
                        <select className="form-control" id={this.props.title + "sel"} onChange={this.onSelectionWrapper} title={this.props.title} defaultValue={this.props.title}>
                            <option disabled>
                                {this.props.title}
                            </option>
                            {elements}
                        </select>
            //        </div>
            //    </form>
            );
        }
    })
};

module.exports=Utils;
window.ReactUtils=Utils;
