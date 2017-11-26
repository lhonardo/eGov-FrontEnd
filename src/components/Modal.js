import React from 'react'
import Moment from 'moment';
// import '../styles/Modal.css'

const Statuses = {
  1: 'Reportado',
  2: 'Atendido',
  3: 'Pendente',
  4: 'Recusado'
}

const Modal = (props) => {
  const { report } = props
  return (
    <div className='report-modal'>
      <p className='close-modal' onClick={props.closeModal}>x</p>
      <div>
        <h2 className='modal-title'>{report.title}</h2>
      </div>
      <div>
        <p>{report.description}</p>
      </div>
      <div>
      </div>
        <p className='title'>Status:</p>
        <div>{Statuses[report.status_id]}</div>
      <div>
        <p className='title'>Reportado por:</p>
        <div>{report.email}</div>
      </div>
      <div>
        <p className='title'>Criado em:</p>
        <div>{Moment(report.created_at).format('DD/MM/YY - HH:MM:SS')}</div>
      </div>
      <div>
        <p className='title'>Imagem:</p>
        <img alt='Imagem do report' src={report.image}/>
      </div>
      {
        report.observation &&
        <div>
          <hr/>
          <p className='title'>Obvervação da administração:</p>
          <div>{report.observation}</div>
        </div>
      }
    </div>
  )
}

export default Modal
