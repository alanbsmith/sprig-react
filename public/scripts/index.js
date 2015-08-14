var PanelGroup = React.createClass({
  render: function() {
    return(
      <div className='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>
        <CalendarPanel/>
        <InfoPanel/>
        <ConfirmPanel/>
      </div>
    )
  }
});

var CalendarPanel = React.createClass({
  render: function() {
    return (
      <div className='panel panel-default'>
        <a id='calendar-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
          <div className='panel-heading' role='tab' id='calendar'>
            <h1 className='panel-title'>Calendar</h1>
          </div>
        </a>
        <div id='collapseOne' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body'>
            <h6 className='text-muted calendar-heading'>DATES</h6>
            <div className='col-xs-1'><div className='thumbnail dates'>SUN</div></div>
            <div className='col-xs-1'><div className='thumbnail dates'>MON</div></div>
            <div className='col-xs-1'><div className='thumbnail dates'>TUE</div></div>
            <div className='col-xs-1'><div className='thumbnail dates'>WED</div></div>
            <div className='col-xs-1'><div className='thumbnail dates'>THR</div></div>
            <div className='col-xs-1'><div className='thumbnail dates'>FRI</div></div>
            <div className='col-xs-1'><div className='thumbnail dates'>SAT</div></div>
            <TimeOptions/>
          </div>
        </div>
      </div>
    )
  }
});

var TimeOptions = React.createClass({
  render: function() {
    return (
      <div>
        <h6 className='text-muted calendar-heading'>AVAILABILITY</h6>
          <div className='col-xs-3'><div className='thumbnail times'>8-9 AM</div></div>
          <div className='col-xs-3'><div className='thumbnail times'>9-10 AM</div></div>
          <div className='col-xs-3'><div className='thumbnail times'>10-11 AM</div></div>
          <div className='col-xs-3'><div className='thumbnail times'>11-12 PM</div></div>
          <div className='col-xs-3'><div className='thumbnail times'>1-2 PM</div></div>
          <div className='col-xs-3'><div className='thumbnail times'>2-3 PM</div></div>
          <div className='col-xs-3'><div className='thumbnail times'>3-4 PM</div></div>
          <div className='col-xs-3'><div className='thumbnail times'>4-5 PM</div></div>
        </div>
    )
  }
});


var InfoPanel = React.createClass({
  render: function() {
    return (
      <div className='panel panel-default'>
        <a id='info-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseTwo' aria-expanded='true' aria-controls='collapseOne'>
          <div className='panel-heading' role='tab' id='calendar'>
            <h1 className='panel-title'>Your Info</h1>
          </div>
        </a>
        <div id='collapseTwo' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body'>
            <p className='text-muted'>Please add your info.</p>
            <div className='form-horizontal'>
              <input id='name' className='form-control' placeholder='Full name'></input>
              <input id='phone' className='form-control' placeholder='Phone number'></input>
              <input id='email' className='form-control' placeholder='Email address'></input>
              <button id='info-btn' className='btn btn-block'>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var ConfirmPanel = React.createClass({
  render: function() {
    return (
      <div className='panel panel-default'>
        <a id='info-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseThree' aria-expanded='true' aria-controls='collapseOne'>
          <div className='panel-heading' role='tab' id='calendar'>
            <h1 className='panel-title'>Confirmation</h1>
          </div>
        </a>
        <div id='collapseThree' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body' align='center'>
            <h4>Your Details</h4>
            <p>some details</p>
            <button id="confirm-btn" className="btn btn-block">Confirm?</button>
          </div>
        </div>
      </div>
    )
  }
});

React.render(
  <PanelGroup/>, document.getElementById('content')
)