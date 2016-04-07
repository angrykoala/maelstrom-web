
var Modal = React.createClass({
    render: function() {
        return (
            <div>
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
              
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">ShipName</h4>
                  </div>
                  <div className="modal-body">
                      <p>Type: Galleon</p>
                      <p>Life: 100</p>
                      <p>Status: Docked</p>
                      <p>City: Granada</p>
                    <hr></hr>
                    <h4>Cargo</h4>
                        <p>Cargo stuff here</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
            </div>
        </div>
    </div>            
        );
    }
});





ReactDOM.render(
    <Modal/>, document.getElementById('modaltest'));
