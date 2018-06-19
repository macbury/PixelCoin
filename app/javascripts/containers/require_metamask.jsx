import React from 'react'
import { connect } from 'react-redux'
import { Dimmer } from 'semantic-ui-react'
import downloadMetaMaskImagePath from 'images/download-metamask.png'

class RequireMetaMask extends React.Component {

  isLoggedIn() {
    return this.props.ethereum.account != null
  }

  render() {
    if (this.isLoggedIn()) {
      return (
        <div>
          { this.props.children }
        </div>
      )
    } else {
      return (
        <Dimmer active>
          <p>Login or download MetaMask</p>
          <a href="https://metamask.io/" target="_blank">
            <img src={downloadMetaMaskImagePath} />
          </a>
        </Dimmer>
      )
    }
  }
}

function mapStoreToProps({ ethereum }) {
  return { ethereum }
}

export default connect(mapStoreToProps, {})(RequireMetaMask)
