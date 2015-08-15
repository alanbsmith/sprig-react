var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Content = React.createClass({
  getInitialState:  function() {
    return{renderPanelGroup: false, renderStartButton: true};
  },
  togglePanel: function(data) {
    this.setState({renderStartButton: data.display});
    this.setState({renderPanelGroup: data.start});
  },

  render: function() {
    return (
      <div>
        <Sidebar/>
        <div className='container'>
          <TitlePanel/>
          <StartButton display={this.state.renderStartButton} onClick={this.togglePanel}/>
          <PanelGroup display={this.state.renderPanelGroup}/>
        </div>
      </div>
    )
  }
});

var StartButton = React.createClass({
  handleClick: function(event) {
    this.props.onClick({start: true, display: false});
  },
  render: function() {
    if (this.props.display === true) {
      return (
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <button id='btn-start' onClick={this.handleClick} className='btn btn-lg btn-block'>Get Started!</button>
        </ReactCSSTransitionGroup>
      )
    } else {
      return (false);
    }
  }
})

var PanelGroup = React.createClass({
  getInitialState: function() {
    return{date: "", time: "", info: {name: "", phone: "", email: ""}}
  },
  handleDate: function(data) {
    this.setState({date: data.date})
  },
  handleTime: function(data) {
    this.setState({time: data.time})
  },
  handleInfo: function(data) {
    this.setState({ info: { name: data.name, phone: data.phone, email: data.email }})
  },
  render: function() {
    if(this.props.display === true) {
      return(
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <div className='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>
            <CalendarPanel onDateClick={this.handleDate} onTimeClick={this.handleTime}/>
            <InfoPanel onClick={this.handleInfo} />
            <ConfirmPanel date={this.state.date} time={this.state.time} info={this.state.info} />
          </div>
        </ReactCSSTransitionGroup>
    )} else {
      return(false);
    }
  }
});

var CalendarPanel = React.createClass({
  getInitialState: function() {
    return{activeDate: undefined}
  },
  handleDateClick: function(date) {
    console.log();
    this.props.onDateClick({date: date});
  },
  handleTimeClick: function(time) {
    this.props.onTimeClick({time: time});
  },
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
            <div className='col-xs-1'><div onClick={this.handleDateClick.bind(this, "Sunday")} className='thumbnail dates' id="sunday">SUN</div></div>
            <div className='col-xs-1'><div onClick={this.handleDateClick.bind(this, "Monday")} className='thumbnail dates'>MON</div></div>
            <div className='col-xs-1'><div onClick={this.handleDateClick.bind(this, "Tuesday")} className='thumbnail dates'>TUE</div></div>
            <div className='col-xs-1'><div onClick={this.handleDateClick.bind(this, "Wednesday")} className='thumbnail dates'>WED</div></div>
            <div className='col-xs-1'><div onClick={this.handleDateClick.bind(this, "Thursday")} className='thumbnail dates'>THR</div></div>
            <div className='col-xs-1'><div onClick={this.handleDateClick.bind(this, "Friday")} className='thumbnail dates'>FRI</div></div>
            <div className='col-xs-1'><div onClick={this.handleDateClick.bind(this, "Saturday")} className='thumbnail dates'>SAT</div></div>
            <TimeOptions onClick={this.handleTimeClick}/>
          </div>
        </div>
      </div>
    )
  }
});

var TimeOptions = React.createClass({
  handleClick: function(time) {
    this.props.onClick({time: time});
  },
  render: function() {
    return (
      <div>
        <h6 className='text-muted calendar-heading'>AVAILABILITY</h6>
        <div className='col-xs-3'><div onClick={this.handleClick.bind(this, "8:00-9:00 AM")} className="thumbnail times">8-9 AM</div></div>
        <div className='col-xs-3'><div onClick={this.handleClick.bind(this, "9:00-10:00 AM")} className="thumbnail times">9-10 AM</div></div>
        <div className='col-xs-3'><div onClick={this.handleClick.bind(this, "10:00-11:00 AM")} className="thumbnail times">10-11 AM</div></div>
        <div className='col-xs-3'><div onClick={this.handleClick.bind(this, "11:00-12:00 NOON")} className="thumbnail times">11-12 PM</div></div>
        <div className='col-xs-3'><div onClick={this.handleClick.bind(this, "1:00-2:00 PM")} className="thumbnail times">1-2 PM</div></div>
        <div className='col-xs-3'><div onClick={this.handleClick.bind(this, "2:00-3:00 PM")} className="thumbnail times">2-3 PM</div></div>
        <div className='col-xs-3'><div onClick={this.handleClick.bind(this, "3:00-4:00 PM")} className="thumbnail times">3-4 PM</div></div>
        <div className='col-xs-3'><div onClick={this.handleClick.bind(this, "4:00-5:00 PM")} className="thumbnail times">4-5 PM</div></div>
      </div>
    )
  }
});


var InfoPanel = React.createClass({
  handleInfo: function(event) {
    event.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var phone = React.findDOMNode(this.refs.phone).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    this.props.onClick({name: name, phone: phone, email: email})
  },

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
              <input id='name' className='form-control' ref='name' placeholder='Full name'></input>
              <input id='phone' className='form-control' ref='phone' placeholder='Phone number'></input>
              <input id='email' className='form-control' ref='email' placeholder='Email address'></input>
              <button id='info-btn' className='btn btn-block' onClick={this.handleInfo}>Next</button>
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
            <h4>Thanks {this.props.info.name}</h4>
            <p className='text-muted'>We have you set for {this.props.date} at {this.props.time}</p>
            <p>{this.props.info.phone}</p>
            <p>{this.props.info.email}</p>
            <button id="confirm-btn" className="btn btn-block">Confirm?</button>
          </div>
        </div>
      </div>
    )
  }
});

var Sidebar = React.createClass({
  render: function() {
    return (
      <div id="slideout">
        <a href="#" className='navbar-brand'></a>
        <button className="btn btn-lg btn-default  icon-large glyphicon glyphicon-align-justify" type="button"></button>
        <div id="slideout-inner">
          <div className="sidenav thumbnail">
            <ul className='nav nav-sidebar'>
              <li><a href="https://github.com/alanbsmith/sprig-react">View The Repo</a></li>
              <li><a href="http://facebook.github.io/react/">Learn React</a></li>
              <li><a href="https://twitter.com/_alanbsmith">Twitter</a></li>
            </ul>
          </div>
        </div>   
      </div>
    )
  }
});

var TitlePanel = React.createClass({
  render: function() {
    return (
      <div>
        <h1 id="logo">Sprig <img id="sprig" src="./images/leaf.png"/></h1>
        <p className='text-muted'>really easy scheduling</p>
      </div>
    )
  }
})

React.render(
  <Content/>, document.getElementById('content')
)