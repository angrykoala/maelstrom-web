var BuildButton=React.createClass({
    getInitialState: function() {
        return {
            clicked: false
        };
    },
clickAction: function(){
    this.setState({clicked:true});
},
render: function(){
    var modal="";
    if(this.state.clicked) modal=<buildModal/>

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={this.clickAction}>Build Ship</button>
            {modal}
        </div>
    );
}
});



var buildModal = React.createClass({


render: function(){



}
});


ReactDOM.render(
    <div>
    <BuildButton/>
</div>, document.getElementById('build-button'));
