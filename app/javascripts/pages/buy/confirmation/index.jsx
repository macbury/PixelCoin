import React from 'react'
import ReactDOM from 'react-dom'
import Layout from 'components/layout'
import { checkConfirmation } from 'actions/ethereum'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { Container, Header, Loader, Button } from 'semantic-ui-react'

class ConfirmationPage extends React.Component {
  checkConfirmation = () => {
    this.props.checkConfirmation(this.tx)
  }

  componentDidMount () {
    this.interval = setInterval(this.checkConfirmation, 15 * 1000)
    this.checkConfirmation()
  }

  componentWillUmount () {
    clearTimeout(this.interval)
  }

  isConfirmed () {
    let { block } = this.props
    return block && block.blockNumber != null
  }

  render () {
    const h1Style = { marginTop: '70px', marginBottom: '40px' }
    if (this.isConfirmed()) {
      return (
        <Layout>
          <Container text textAlign='center'>
            <Header style={h1Style} inverted as='h1' content="Transaction is confirmed!" />
            <Button onClick={() => this.props.push('/')}>Back to Home Page</Button>
          </Container>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <Container text textAlign='center'>
            <Header style={h1Style} inverted as='h1' content="Waiting for transaction confirmation" />
            <Loader active inverted inline='centered'/>
          </Container>
        </Layout>
      )
    }
  }

  get tx () {
    return this.props.match.params.tx
  }
}

function mapStateToProps ({ router, transaction }) {
  let { block } = transaction
  return { block }
}

function mapActions(dispatch) {
  return bindActionCreators({ checkConfirmation, push }, dispatch)
}

export default connect(mapStateToProps, mapActions)(ConfirmationPage)
