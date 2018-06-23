import React from 'react'
import { connect } from 'react-redux'
import coinImagePath from 'images/coin.gif'

class Balance extends React.Component {
  render() {
    let { account, balance } = this.props.ethereum
    return (
      <div className="current-balance">
        { balance }
        <img src={ coinImagePath } />
      </div>
    )
  }
}

function mapStoreToProps({ ethereum }) {
  return { ethereum }
}

export default connect(mapStoreToProps, {})(Balance)
