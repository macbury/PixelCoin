import React from 'react'
import { Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setCoins, buyToken } from 'actions/buy_token'

const style = {
  margin: '120px auto'
}

class Form extends React.Component {

  componentDidMount () {
    this.props.setCoins(1)
  }

  onAmountChange = (ev) => {
    let coins = ev.target.value
    this.props.setCoins(coins)
  }

  buyTokens = (ev) => {
    let { account, wei, loading } = this.props
    if (loading) {
      return
    }
    this.props.buyToken(account, wei)
  }

  render () {
    let { coins, wei, loading } = this.props
    let action = {
      color: 'teal',
      labelPosition: 'right',
      icon: 'ethereum',
      content: web3.fromWei(wei, 'ether'),
      onClick: this.buyTokens,
      loading
    }
    return (
      <Input
        size='massive'
        disabled={loading}
        action={action}
        placeholder='Buy tokens'
        value={coins}
        onChange={this.onAmountChange}
      />
    )
  }
}

function mapActions(dispatch) {
  return bindActionCreators({ setCoins, buyToken }, dispatch)
}

function mapStoreToProps({ buyToken, ethereum }) {
  let { coins, wei, loading } = buyToken
  let { account } = ethereum
  return { coins, wei, account, loading }
}

export default connect(mapStoreToProps, mapActions)(Form)
