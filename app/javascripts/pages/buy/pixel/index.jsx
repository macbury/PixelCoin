import React from 'react'
import ReactDOM from 'react-dom'
import RequireMetaMask from 'containers/require_metamask'
import Layout from 'components/layout'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectPixel, selectColor, setLeaseTime, buyPixel } from 'actions/buy_pixel'
import { Container, Header, Grid, Segment, Button, Divider, Input } from 'semantic-ui-react'
import { ChromePicker } from 'react-color'

const Cube = ({ color }) => {
  let { r, g, b } = color
  const style = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`
  }
  return (
    <div className="D3Cube">
      <div className="side1" style={style}></div>
      <div className="side2" style={style}></div>
      <div className="side3" style={style}></div>
      <div className="side4" style={style}></div>
      <div className="side5" style={style}></div>
      <div className="side6" style={style}></div>
    </div>
  )
}

class BuyPixelPage extends React.Component {
  componentDidMount () {
    let { id } = this.props.match.params
    this.props.selectPixel(id)
  }

  onColorChange = ({ rgb }) => {
    this.props.selectColor(rgb)
  }

  onMinutesChange = (ev) => {
    let minutes = parseInt(ev.target.value) || 1
    this.props.setLeaseTime(minutes)
  }

  handleBuy = (ev) => {
    ev.preventDefault()
    let { id, color, minutes, account } = this.props
    this.props.buyPixel({ id, color, minutes, account })

  }

  render () {
    let { color, minutes, loading, coins } = this.props
    return (
      <Layout>
        <RequireMetaMask>
          <Container textAlign='center'>
            <Grid celled={false} centered divided={false} columns='equal' stackable>
              <Grid.Row>
                <Grid.Column width={8} textAlign='center'>
                  <Header as='h1' inverted content='Lease Pixel using PXC' style={ { marginTop: '70px', marginBottom: '40px' } } />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Divider horizontal inverted>With color</Divider>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <ChromePicker disableAlpha={true} color={color} onChange={this.onColorChange} />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Cube color={color} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Divider horizontal inverted>For minutes</Divider>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Input
                    icon='clock'
                    iconPosition='left'
                    value={minutes}
                    fluid
                    inverted
                    disabled={loading}
                    onChange={this.onMinutesChange}
                    size='massive' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Button fluid size='huge' onClick={this.handleBuy} loading={loading}>Lease for { coins } PXC</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </RequireMetaMask>
      </Layout>
    )
  }
}

function mapStateToProps ({ buyPixel, ethereum }) {
  let { id, color, minutes, loading, coins } = buyPixel
  return { coins, id, color, minutes, loading, account: ethereum.account }
}

function mapActions (dispatch) {
  return bindActionCreators({ selectPixel, selectColor, setLeaseTime, buyPixel }, dispatch)
}

export default connect(mapStateToProps, mapActions)(BuyPixelPage)
