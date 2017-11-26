import React, { Component } from 'react'
import './styles/App.css'
import ActionCable from 'actioncable'
import SimpleMap from './components/Map'
import SideBarLeft from './components/SideBarLeft'
import SideBarRight from './components/SideBarRight'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reports: []
    }

    this.handleReportsUpdates = this.handleReportsUpdates.bind(this)

    const cable = ActionCable.createConsumer('ws://egov-api.herokuapp.com/cable')

    this.sub = cable.subscriptions.create('ReportsChannel', {
      received: this.handleReportsUpdates
    })
  }

  componentDidMount() {
    setTimeout(()=>window.fetch('https://egov-api.herokuapp.com/start'), 2000)
  }

  handleReportsUpdates(reports){
    this.setState({reports: reports})
  }

  render() {
    return (
      <div>
        <SideBarLeft />
        <SimpleMap
          reports={this.state.reports}
        />
        <SideBarRight length={this.state.reports.length} />
      </div>
    )
  }
}

export default App
