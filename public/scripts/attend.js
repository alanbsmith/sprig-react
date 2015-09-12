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
            day: "",
            month: "",
            info: { title: "",
                    description: "",
                    location: ""
                  },
            availableDates: this.getNextWeek(),
            availableTimes: this.getTimes(),
          }
  },
  getNextWeek: function() {
    var startDate = new Date();
    var dates = [];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ]
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    for(x = 0; x < 7; x++) {
      var parsedDate = startDate.toDateString().split(' ');
      dates.push({'displayDay': parsedDate[0].toUpperCase(), 'month': months[startDate.getMonth()],'day': days[startDate.getDay()], 'date': startDate.getDate()})
      startDate.setDate(startDate.getDate() + 1)
    }
    return(dates)
  },
  getTimes: function() {
    return([  {'timeSlot':'7:00 AM - 8:00 AM', 'displayTime': '7-8 AM'},
              {'timeSlot':'8:00 AM - 9:00 AM', 'displayTime': '8-9 AM'},
              {'timeSlot':'9:00 AM - 10:00 AM', 'displayTime': '9-10 AM'},
              {'timeSlot':'10:00 AM - 11:00 AM', 'displayTime': '10-11 AM'},
              {'timeSlot':'11:00 AM - 12:00 PM', 'displayTime': '11-12 PM'},
              {'timeSlot':'12:00 PM - 1:00 PM', 'displayTime': '12-1 PM'},
              {'timeSlot':'1:00 PM - 2:00 PM', 'displayTime': '1-2 PM'},
              {'timeSlot':'2:00 PM - 3:00 PM', 'displayTime': '2-3 PM'},
              {'timeSlot':'3:00 PM - 4:00 PM', 'displayTime': '3-4 PM'},
              {'timeSlot':'4:00 PM - 5:00 PM', 'displayTime': '4-5 PM'},
              {'timeSlot':'5:00 PM - 6:00 PM', 'displayTime': '5-6 PM'},
              {'timeSlot':'6:00 PM - 7:00 PM', 'displayTime': '6-7 PM'}
          ])
  },
  handleDate: function(data) {
    this.setState({date: data.date, day: data.day, month: data.month})
  },
  handleTime: function(data) {
    this.setState({time: data.time})
  },
  handleInfo: function(data) {
    this.setState({ info: { title: data.title, description: data.description, location: data.location }})
  },
  render: function() {
    if(this.props.display === true) {
      return(
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <div className='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>
            <CalendarPanel availableDates={this.state.availableDates} availableTimes={this.state.availableTimes} onDateClick={this.handleDate} onTimeClick={this.handleTime}/>
            <InfoPanel onClick={this.handleInfo} />
            <InvitePanel />
            <ConfirmPanel day={this.state.day} month={this.state.month} date={this.state.date} time={this.state.time} info={this.state.info}/>
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
    this.props.onDateClick({day: this.props.availableDates[i]['day'], date: this.props.availableDates[i]['date'], month: this.props.availableDates[i]['month']});
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
      <div key={this.props.key} className='col-xs-1'><div onClick={this.handleClick.bind(this, this.props.key)} className={classes}><h5 className='date'>{this.props.date['date']}</h5>{this.props.date['displayDay']}</div></div>
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
    var title = React.findDOMNode(this.refs.title).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var location = React.findDOMNode(this.refs.location).value.trim();
    this.props.onClick({title: title, description: description, location: location})
  },

  render: function() {
    return (
      <div className='panel panel-default'>
        <a id='info-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseTwo' aria-expanded='true' aria-controls='collapseOne'>
          <div className='panel-heading' role='tab' id='info'>
            <h1 className='panel-title'>Event Info</h1>
          </div>
        </a>
        <div id='collapseTwo' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body'>
            <p className='text-muted'>Please add your info.</p>
            <div className='form-horizontal'>
              <input id='title' className='form-control' ref='title' placeholder='Event title'></input>
              <input id='description' className='form-control' ref='description' placeholder='Description'></input>
              <input id='location' className='form-control' ref='location' placeholder='Location'></input>
              <button id='info-btn' className='btn btn-block' onClick={this.handleInfo}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
var InvitePanel = React.createClass({
  render: function() {
    return (
      <div className='panel panel-default'>
        <a id='invite-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseThree' aria-expanded='true' aria-controls='collapseThree'>
          <div className='panel-heading' role='tab' id='invite'>
            <h1 className='panel-title'>Invite Attendees</h1>
          </div>
        </a>
        <div id='collapseThree' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body'>
            <p className='text-muted'>Add attendees.</p>
            <div className='form-horizontal'>
              <input id='title' className='form-control' ref='title' placeholder='Event title'></input>
              <button id='#' className='btn btn-warning btn-block'>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var ConfirmPanel = React.createClass({
  sendData: function() {
    $.ajax({
      url: "http://127.0.0.1:3000/api/v1/events/new",
      type: 'get',
      data: {data:{title: this.props.info.title, description: this.props.info.description, location: this.props.info.location ,time: this.props.time.time}},
      dataType: 'json',
      success: function(data) {
        console.log(data)
      }
    })
  },
  render: function() {
    return (
      <div className='panel panel-default'>
        <a id='info-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseFour' aria-expanded='true' aria-controls='collapseFour'>
          <div className='panel-heading' role='tab' id='calendar'>
            <h1 className='panel-title'>Confirmation</h1>
          </div>
        </a>
        <div id='collapseFour' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body' align='center'>
            <h4>Thanks!</h4>
            <p className='text-muted'>We have you set for {this.props.day}, {this.props.month} {this.props.date} at {this.props.time}</p>
            <p className='text-muted'>Please confirm the info below is correct.</p>
            <h4>{this.props.info.title}</h4>
            <p>{this.props.info.description}</p>
            <p>{this.props.info.location}</p>
            <button id="confirm-btn" onClick={this.sendData} className="btn btn-block">Confirm?</button>
          </div>
        </div>
      </div>
    )
  }
});

React.render(
  <Content/>, document.getElementById('content')
)