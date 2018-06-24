import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { updatePixels } from 'actions/ethereum'
import { bindActionCreators } from 'redux'

const ROWS = 15
const COLS = 21

class Pixel extends React.Component {
  render () {
    let { color, id } = this.props
    let { r, g, b } = color
    const style = {
      backgroundColor: `rgb(${r}, ${g}, ${b})`
    }
    return <div
      className='pixel'
      onClick={() => { this.props.onPixelSelect(id) }}
      style={style} />
  }
}

class Matrix extends React.Component {
  onPixelSelect = (pixelId) => {
    this.props.push(`/buy/pixel/${pixelId}`)
  }

  componentDidMount () {
    this.requestRefresh()
  }

  requestRefresh () {
    this.timeout = setTimeout(() => {
      this.props.updatePixels()
      this.requestRefresh()
    }, 10 * 1000)
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  getColor (pixelId) {
    return this.props.pixels[pixelId] || { r: 0, g: 0, b: 0 }
  }

  getRows () {
    let output = []
    for (var row = 0; row < ROWS; row++) {
      let rowContent = []
      for (var col = 0; col < COLS; col++) {
        var id = COLS * row + col
        rowContent.push(<Pixel
          id={id}
          key={`pixel-${id}`}
          color={this.getColor(id)}
          onPixelSelect={this.onPixelSelect} />
        )
      }
      output.push(<div className='row' key={`row-${row}`}>{rowContent}</div>)
    }

    return output
  }

  render () {
    return <div className='matrix'>{this.getRows()}</div>
  }
}

function mapActions (dispatch) {
  return bindActionCreators({ push, updatePixels }, dispatch)
}

function mapStateToProps ({ pixels }) {
  return { pixels }
}

export default connect(mapStateToProps, mapActions)(Matrix)
