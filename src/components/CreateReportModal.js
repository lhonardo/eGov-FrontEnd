import React, {Component} from 'react'
import ReactFileReader from 'react-file-reader'

class CreateReportModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      fields: {
        title: '',
        description: '',
        status_id: 1,
        email: '',
        image_name: '',
        image: '',
        lat: props.createReportPosition.lat,
        lng: props.createReportPosition.lng
      },
      errorResponse: null
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  handleInputChange(e){
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }

  formSubmit(e){
    e.preventDefault()

    this.setState({isLoading: true})

    const _this = this

    fetch('https://egov-api.herokuapp.com/report', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.fields)
    }).then((response) => {
      _this.setState({isLoading: false, errorResponse: null})
      if(response.status === 201){
        _this.props.closeModal()
      }else{
        _this.setState({errorResponse: response.statusText})
      }
    })

  }

  handleImageChange(file){
    this.setState({
      fields:{
        ...this.state.fields,
        image: file.base64,
        image_name: file.fileList[0].name
      }
    })
  }

  render(){
    return (
      <div>
        <form className='report-modal' onSubmit={this.formSubmit}>
          {
            this.state.errorResponse &&
            <div className='error-notification'>{this.state.errorResponse}</div>
          }
          <p className='close-modal' onClick={this.props.closeModal}>x</p>
          <div>
            <h2 className='modal-title'>Reportar</h2>
          </div>
          <div>
            <p className='title'>Título:</p>
            <input onChange={this.handleInputChange} type="text" value={this.state.fields.title} name='title'/>
          </div>
          <div>
            <p className='title'>Descrição:</p>
            <textarea onChange={this.handleInputChange} value={this.state.fields.description} name='description'/>
          </div>
          <div>
            <p className='title'>Foto:</p>
            <div>{this.state.fields.image_name}</div>
            <ReactFileReader fileTypes={[".jpeg",".jpg"]} base64={true} handleFiles={this.handleImageChange}>
              <button className='btn'>Upload</button>
            </ReactFileReader>
          </div>
          <div>
            <p className='title'>Email:</p>
            <input onChange={this.handleInputChange} type="email" value={this.state.fields.email} name='email'/>
          </div>

          <button>Enviar</button>
        </form>
      </div>

    )
  }

}

export default CreateReportModal
