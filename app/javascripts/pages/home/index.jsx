import React from 'react'
import ReactDOM from 'react-dom'
import Layout from 'components/layout'
import Matrix from 'components/matrix'
import { Container, Header, Input } from 'semantic-ui-react'

export default class BuyTokensPage extends React.Component {
  render() {
    return (
      <Layout>
        <Container textAlign='center'>
          <Header style={ { marginTop: '70px', marginBottom: '40px' } } inverted as='h1' content="Currently lighted up pixels:" />
          <Matrix />
        </Container>
      </Layout>
    )
  }
}
