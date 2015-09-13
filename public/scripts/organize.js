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
    return{ dates: this.getNextWeek(),
            availableDates: [],
            info: { title: "",
                    description: "",
                    location: ""
                  },
            attendee: '',
            availableTimeObjects: []
          }
  },
  getNextWeek: function() {
    var startDate = new Date();
    var dates = [];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ]
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    for(x = 0; x < 7; x++) {
      var parsedDate = startDate.toDateString().split(' ');
      dates.push({ 
                   'displayDay':  parsedDate[0].toUpperCase(), 
                   'month':       months[startDate.getMonth()],
                   'day':         days[startDate.getDay()],
                   'date':        startDate.getDate(),
                   'times':       this.getTimes()
                 })

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
  handleDate: function(date) {
    if(this.state.availableDates.some(d => d.day === date.day)) {
      console.log('date is already in the array.')
      } else {
        this.state.availableDates.push(date);
      }
      this.setState({availableDates: this.state.availableDates})
  },
  handleTime: function(data) {
    for(i = 0; i < this.state.availableDates.length; i++) {
      if(this.state.availableDates[i].date === data.selectedDate.date) {
        this.state.availableDates[i].availableTimeSlots = data.availableTimeSlots
        this.state.availableDates[i].availableTimes = data.availableTimes
      }
      this.setState({availableDates: this.state.availableDates})
    }
  },
  handleInfo: function(data) {
    this.setState({ info: { title: data.title, description: data.description, location: data.location }})
  },
  handleAttendee: function(data) {
    this.setState({attendee: data.attendee})
  },
  render: function() {
    if(this.props.display === true) {
      return(
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <div className='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>
            <CalendarPanel
              dates={this.state.dates}
              availableDates={this.state.availableDates}
              onDateClick={this.handleDate}
              onTimeClick={this.handleTime}/>
            <InfoPanel onClick={this.handleInfo} />
            <InvitePanel addAttendee={this.handleAttendee}/>
            <ConfirmPanel
              availableDates={this.state.availableDates}
              day={this.state.day}
              month={this.state.month}
              info={this.state.info}
              attendee={this.state.attendee} />
          </div>
        </ReactCSSTransitionGroup>
    )} else {
      return(false);
    }
  }
});

var CalendarPanel = React.createClass({
  getInitialState: function() {
    return({ times: [], selectedDate: '', isOpen: false})
  },
  handleDateClick: function(date) {
    this.props.onDateClick({
                            displayDay: date.displayDay,
                            day: date.day,
                            date: date.date,
                            month: date.month,
                            availableTimeSlots: [],
                            availableTimes: [],
                          });
    this.setState({selectedDate: date, times: date.times})
  },
  handleTimeClick: function(timeSlots) {
    var availableTimes = [];
    for(i = 0; i < this.state.times.length; i++){
      if(timeSlots.indexOf(this.state.times[i].timeSlot) !== -1) {
        availableTimes.push(this.state.times[i])
      }
    }
    this.props.onTimeClick({availableTimeSlots: timeSlots, availableTimes: availableTimes, selectedDate: this.state.selectedDate});

  },
  render: function() {

    return (
      <div className='panel panel-default'>
        <a id='calendar-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
          <div className='panel-heading' role='tab' id='calendar'>
            <h1 className='panel-title'>Choose Availablity</h1>
          </div>
        </a>
        <div id='collapseOne' className='panel-collapse collapse in' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body'>
            <h6 className='text-muted calendar-heading' id='dates'>DATES</h6>
            <div className='row' id='date-row'>
            {this.props.dates.map(function(date, i) {
              return (
                <AvailableDate date={date} onClick={this.handleDateClick.bind(this, date)} key={i} isSelected={this.state.selectedDate === date ? true : false }/>
              );
            }, this)}
            </div>
          <TimeSlots availableDates={this.props.availableDates} times={this.state.times} date={this.state.selectedDate} onClick={this.handleTimeClick}/>
          </div>
        </div>
      </div>
    );
  }
});

var AvailableDate = React.createClass({
  handleClick: function(i) {
    this.props.onClick()
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'thumbnail': true,
      'dates': true,
      'active': this.props.isSelected
    })
    return(
      <div key={this.props.key} className='col-xs-1'>
        <div onClick={this.handleClick.bind(this, this.props.key)} className={classes}>
          <h5 className='date'>{this.props.date['date']}</h5>
          {this.props.date['displayDay']}
        </div>
      </div>
    )
  }
});

var TimeSlots = React.createClass({
  selectedTimes: function(time) {
    for(i = 0; i < this.props.availableDates.length; i++) {
      if(this.props.availableDates[i].date === this.props.date.date) {
        return this.props.availableDates[i].availableTimeSlots
      }
    }
  },

  handleClick: function(time) {
    var availableTimes = this.selectedTimes();
      if(availableTimes.indexOf(time.timeSlot) !== -1) {
        availableTimes.splice(availableTimes.indexOf(time.timeSlot), 1)
      } else {
        availableTimes.push(time.timeSlot)
      }
    this.props.onClick(availableTimes)
  },
  render: function() {
    return (
      <div>
        <h6 className='text-muted calendar-heading' id='availability'>AVAILABILITY</h6>
        {this.props.times.map(function(time, i){
          return (
            <AvailableTime time={time} onClick={this.handleClick.bind(this, time)} key={i} isSelected={(this.selectedTimes().indexOf(time.timeSlot) !== -1) ? true : false}/>
          )
          
        }, this)}
      </div>
    );
  }
});

var AvailableTime = React.createClass({
  handleClick: function(i) {
    this.props.onClick()
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'thumbnail': true,
      'times': true,
      'active': this.props.isSelected
    })
    return(
      <div className='col-xs-3'>
        <div key={this.props.key} onClick={this.handleClick.bind(this, this.props.key)} className={classes}>
          {this.props.time['displayTime']}
        </div>
      </div>
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
            <h1 className='panel-title'>Add Event Info</h1>
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
  handleClick: function() {
    attendee = React.findDOMNode(this.refs.attendeeName).value.trim();
    this.props.addAttendee({attendee: attendee})
  },
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
              <input id='title' className='form-control' ref='attendeeName' placeholder="Attendee's name"></input>
              <button onClick={this.handleClick} id='attendee-btn' className='btn btn-block'>Next</button>
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
      url: "http://localhost:3000/api/v1/events/new",
      type: 'get',
      data: {data:{title: this.props.info.title, description: this.props.info.description, location: this.props.info.location , availability: this.props.availableDates, attendee: this.props.attendee}},
      dataType: 'json',
      success: function(data) {
        console.log(data)
      }
    })
  },
  render: function() {
    return(
      <div className='panel panel-default'>
        <a id='info-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseFour' aria-expanded='true' aria-controls='collapseFour'>
          <div className='panel-heading' role='tab' id='calendar'>
            <h1 className='panel-title'>Confirm</h1>
          </div>
        </a>
        <div id='collapseFour' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body' align='center'>
            <h2>Thanks!</h2>
            <p className='small'>PLEASE CONFIRM THE INFO BELOW IS CORRECT</p>
            <div>
            <h3>{this.props.info.title}</h3>
            <p className='text-muted'>{this.props.info.description}</p>
            <p className='text-muted'>{this.props.info.location}</p>
            <p className='small'>WITH</p>
            <p className='text-muted'>{this.props.attendee}</p>
              {this.props.availableDates.map(function(date, i){
                if(date.availableTimeSlots.length > 0) {
                var times = date.availableTimeSlots.map(function(time, i) {
                  return(
                    <p className='small text-muted available-times'>{time}, </p>
                    )
                })
                return(
                  <div>
                    <h5 className='date-header'>{date.day}, {date.month} {date.date}:</h5>
                    {times}
                  </div>
                );
              } else {
                return(false)
              }}, this)}
            </div>
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