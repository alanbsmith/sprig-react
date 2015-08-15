var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Content = React.createClass({
  getInitialState:  function() {
    return{renderStartButton: true, renderPanelGroup: false};
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
    return{ date: "__________",
            time: "__________",
            info: { name: "",
                    phone: "",
                    email: ""
                  },
            availableDates: [ {'displayDay':'SUN', 'day':'Sunday', 'date': ''},
                              {'displayDay':'MON', 'day':'Monday', 'date': ''},
                              {'displayDay':'TUE', 'day':'Tuesday', 'date': ''},
                              {'displayDay':'WED', 'day':'Wednesday', 'date': ''},
                              {'displayDay':'THR', 'day':'Thursday', 'date': ''},
                              {'displayDay':'FRI', 'day':'Friday', 'date': ''},
                              {'displayDay':'SAT', 'day':'Saturday', 'date': ''}
                            ],
            availableTimes: [ {'timeSlot':'8:00-9:00 AM', 'displayTime': '8-9 AM'},
                              {'timeSlot':'9:00-10:00 AM', 'displayTime': '9-10 AM'},
                              {'timeSlot':'10:00-11:00 AM', 'displayTime': '10-11 AM'},
                              {'timeSlot':'11:00-12:00 NOON', 'displayTime': '11-12 PM'},
                              {'timeSlot':'1:00-2:00 PM', 'displayTime': '1-2 PM'},
                              {'timeSlot':'2:00-3:00 PM', 'displayTime': '2-3 PM'},
                              {'timeSlot':'3:00-4:00 PM', 'displayTime': '3-4 PM'},
                              {'timeSlot':'4:00-5:00 PM', 'displayTime': '4-5 PM'}
                            ]
          }
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
            <CalendarPanel availableDates={this.state.availableDates} availableTimes={this.state.availableTimes} onDateClick={this.handleDate} onTimeClick={this.handleTime}/>
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
    return{availableDate: '', isOpen: false}
  },
  handleDateClick: function(i) {
    this.props.onDateClick({date: this.props.availableDates[i]['day']});
    this.setState({availableDate: i})
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
            {this.props.availableDates.map(function(date, i) {
              return (
                <AvailableDate date={date} onClick={this.handleDateClick.bind(this, i)} key={i} isSelected={this.state.availableDate === i ? true : false }/>
              );
            }, this)}
          <TimeSlots availableTimes={this.props.availableTimes} onClick={this.handleTimeClick}/>
          </div>
        </div>
      </div>
    );
  }
});

var AvailableDate = React.createClass({
  handleClick: function(i) {
    this.props.onClick({})
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'thumbnail': true,
      'dates': true,
      'active': this.props.isSelected
    })
    return(
      <div key={this.props.key} className='col-xs-1'><div onClick={this.handleClick.bind(this, this.props.key)} className={classes}>{this.props.date['displayDay']}</div></div>
    )
  }
});

var TimeSlots = React.createClass({
  getInitialState: function() {
    return{activeTimeSlot: ''}
  },
  handleClick: function(i) {
    this.props.onClick({time: this.props.availableTimes[i]['timeSlot']});
    this.setState({activeTimeSlot: i})
  },
  render: function() {
    return (
      <div>
        <h6 className='text-muted calendar-heading'>AVAILABILITY</h6>
        {this.props.availableTimes.map(function(time, i){
          return (
            <TimeSlot time={time} onClick={this.handleClick.bind(this, i)} key={i} isSelected={this.state.activeTimeSlot === i ? true : false }/>
          )
          
        }, this)}
      </div>
    );
  }
});

var TimeSlot = React.createClass({
  handleClick: function(i) {
    this.props.onClick({})
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'thumbnail': true,
      'times': true,
      'active': this.props.isSelected
    })
    return(
      <div className='col-xs-3'><div key={this.props.key} onClick={this.handleClick.bind(this, this.props.key)} className={classes}>{this.props.time['displayTime']}</div></div>
    )
  }
})

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
              <input id='name' className='form-control' ref='name' placeholder='Name'></input>
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
            <h4>Thanks {this.props.info.name}!</h4>
            <p className='text-muted'>We have you set for {this.props.date} at {this.props.time}</p>
            <p className='text-muted'>Please confirm the info below is correct.</p>
            <p>{"Phone: " + this.props.info.phone}</p>
            <p>{"Email: " + this.props.info.email}</p>
            <button id="confirm-btn" className="btn btn-block">Confirm?</button>
          </div>
        </div>
      </div>
    )
  }
});

React.render(
  <Content/>, document.getElementById('content')
)