import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class MenuItem extends React.Component {
  render () {
    let { to, path, children } = this.props
    return (
      <Menu.Item active={ to === path }>
        <Link to={to}>{children}</Link>
      </Menu.Item>
    )
  }
}

function mapStoreToProps({ router }) {
  let { pathname } = router.location
  return { path: pathname }
}

export default connect(mapStoreToProps, {})(MenuItem)
