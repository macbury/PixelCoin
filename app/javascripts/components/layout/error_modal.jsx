import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import { hideError } from 'actions/modal'

class ErrorModal extends React.Component {
  isOpen () {
    return this.props.message != null
  }

  render () {
    return (
      <Modal open={this.isOpen()} basic size='small' dimmer='blurring'>
        <Header content='Transaction error...' />
        <Modal.Content>
          <p>{this.props.message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.props.hideError}>OK</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

function mapStateToProps ({ modal }) {
  let { message } = modal
  return { message }
}

function mapActions (dispatch) {
  return bindActionCreators({ hideError }, dispatch)
}

export default connect(mapStateToProps, mapActions)(ErrorModal)
