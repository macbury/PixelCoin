import React from 'react'
import { connect } from 'react-redux'

class Balance extends React.Component {

  render() {
    let { account, balance } = this.props.ethereum
    return (
      <div>{balance} PXC</div>
    )
  }
}

function mapStoreToProps({ ethereum }) {
  return { ethereum }
}

export default connect(mapStoreToProps, {})(Balance)
