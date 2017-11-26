import React from 'react'
import colors from '../constants/colors'

const SideBarLeft = () => {
  return (
    <div className='sidebar left'>
      <div>
        <span>Reportado</span>
        <div className='report-icon' style={{backgroundColor: colors[1]}}/>
      </div>
      <div>
        <span>Atendido</span>
        <div className='report-icon' style={{backgroundColor: colors[2]}}/>
      </div>
      <div>
        <span>Pendente</span>
        <div className='report-icon' style={{backgroundColor: colors[3]}}/>
      </div>
      <div>
        <span>Recusado</span>
        <div className='report-icon' style={{backgroundColor: colors[4]}}/>
      </div>
    </div>
  )
}

export default SideBarLeft
