import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dimmer, Loader, Header, Icon } from 'semantic-ui-react'
import { initEthereum } from 'actions/ethereum'
import downloadMetaMaskImagePath from 'images/download-metamask.png'

class LoadEthereum extends React.Component {
  componentDidMount() {
    this.props.initEthereum()
  }

  isLoading() {
    return this.props.ethereum.loading
  }

  hasError() {
    return this.props.ethereum.error !== null
  }

  render() {
    if (this.hasError()) {
      return (
        <Dimmer active>
          <Header as='h2' icon inverted>
            <Icon name='ethereum' />
            { this.props.ethereum.error }
          </Header>
        </Dimmer>
      )
    } else if (this.isLoading()) {
      return (
        <Dimmer active>
          <Loader indeterminate>Connecting to Ethereum</Loader>
        </Dimmer>
      )
    } else {
      return (
        <div>
          { this.props.children }
        </div>
      )
    }
  }
}

function mapStoreToProps({ ethereum }) {
  return { ethereum }
}

function mapActions(dispatch) {
  return bindActionCreators({ initEthereum }, dispatch)
}

export default connect(mapStoreToProps, mapActions)(LoadEthereum)
