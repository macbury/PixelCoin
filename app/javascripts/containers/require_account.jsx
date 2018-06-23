import React from 'react'
import { connect } from 'react-redux'

class RequireAccount extends React.Component {

  isLoggedIn() {
    return this.props.ethereum.account != null
  }

  render() {
    if (this.isLoggedIn()) {
      return (
        <React.Fragment>
          { this.props.children }
        </React.Fragment>
      )
    } else {
      return <span/>
    }
  }
}

function mapStoreToProps({ ethereum }) {
  return { ethereum }
}

export default connect(mapStoreToProps, {})(RequireAccount)
