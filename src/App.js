import React, { Component } from 'react'
import './styles/App.css'
import ActionCable from 'actioncable'
import SimpleMap from './Map'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reports: {}
    }

    this.handleReportsUpdates = this.handleReportsUpdates.bind(this)

    const cable = ActionCable.createConsumer('ws://localhost:3005/cable')

    this.sub = cable.subscriptions.create('ReportsChannel', {
      received: this.handleReportsUpdates
    })
  }

  componentDidMount() {
    setTimeout(()=>window.fetch('http://localhost:3005/start'), 2000)
  }

  handleReportsUpdates(reports){
    this.setState({reports: reports})
  }

  render() {
    return (
      <SimpleMap
        reports={this.state.reports}
      />
    )
  }
}

export default App
