import React, { Component } from 'react'
import colors from '../constants/colors'

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      modal: false
    }

    this.hoverIn = this.hoverIn.bind(this)
    this.hoverOut = this.hoverOut.bind(this)
  }

  hoverIn(){
    this.setState({hover: true})
  }

  hoverOut(){
    this.setState({hover: false})
  }

  render(){
    const style = {
      backgroundColor: colors[this.props.report.status_id],
      cursor: 'pointer'
    }

    const styleHover = {
      ...style,
      backgroundColor: 'gray'
    }

    return (
       <div
          style={this.state.hover? styleHover : style}
          className='report-icon'
          onMouseEnter={this.hoverIn}
          onMouseLeave={this.hoverOut}
        />
    )
  }
}

export default Report
