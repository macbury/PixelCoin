import React from 'react'
import ReactDOM from 'react-dom'
import RequireMetaMask from 'containers/require_metamask'
import Layout from 'components/layout'
import Form from './form'

import { connect } from 'react-redux'
import { Container, Header, Input } from 'semantic-ui-react'

class BuyTokensPage extends React.Component {
  render() {
    return (
      <Layout>
        <Container text textAlign='center'>
          <RequireMetaMask>
            <Header style={ { marginTop: '70px', marginBottom: '40px' } } inverted as='h1' content="Buy PXC to change colors on matrix" />
            <Form />
            <p style={ { marginTop: '30px' } }>Tokens will appear on your balance after transactions is accepted by network(It can take up to 10 minutes)</p>
            <Header inverted as='h2' content="Contract address: " />
            <Input size='massive' icon='ethereum' readOnly value={this.props.contract} />
            <p style={ { marginTop: '15px' } }>
              <a href="https://coinsutra.com/add-custom-token-metamask/">How to add this contract to MetaMask</a>
            </p>
          </RequireMetaMask>
        </Container>
      </Layout>
    )
  }
}

function mapStateToProps({ ethereum }) {
  let { contract } = ethereum
  return { contract }
}

export default connect(mapStateToProps)(BuyTokensPage)
