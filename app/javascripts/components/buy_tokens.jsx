import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'semantic-ui-react'

class BuyTokens extends React.Component {

  render() {
    let { coins, wei } = this.props
    return (
      <div>
        <Input
          action={{ color: 'teal', labelPosition: 'right', icon: 'ethereum', content: web3.fromWei(wei) }}
          placeholder='Buy tokens'
          value={coins}
        />
      </div>
    )
  }
}

function mapStoreToProps({ buyToken }) {
  let { coins, wei } = buyToken
  return { coins, wei }
}

export default connect(mapStoreToProps, {})(BuyTokens)
