import React from 'react'

const DistanceLimitModal = (props) => {
  const { range, distance } = props
  return (
    <div className='report-modal'>
      <p className='close-modal' onClick={props.closeModal}>x</p>
      <div>
        <h2 className='modal-title'>Erro!</h2>
        <h3 className='modal-title'>Distância não está dentro do range</h3>
      </div>
      <div>
        <p className='title'>Distância máxima permitida:</p>
        <div>{range} km</div>
      </div>
      <div>
        <p className='title'>Distância apontada:</p>
        <div>{distance.toFixed(1)} km</div>
      </div>
    </div>
  )
}

export default DistanceLimitModal
