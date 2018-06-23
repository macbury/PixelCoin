import React from 'react'
import ReactDOM from 'react-dom'
import MenuItem from './menu_item'
import ErrorModal from './error_modal'

import RequireAccount from 'containers/require_account'
import CurrentBalance from 'components/balance'

import {
  Responsive,
  Segment,
  Menu,
  Container
} from 'semantic-ui-react'

const Layout = ({children}) => (
  <Responsive {...Responsive.onlyComputer}>
    <Segment inverted style={{ padding: '1em 0em' }} vertical>
      <Container>
        <Menu inverted secondary pointing size='large'>
          <MenuItem to="/">Buy pixels</MenuItem>
          <MenuItem to="/buy/tokens">Buy tokens</MenuItem>
          <RequireAccount>
            <Menu.Menu position='right'>
              <Menu.Item>
                <CurrentBalance />
              </Menu.Item>
            </Menu.Menu>
          </RequireAccount>
        </Menu>
      </Container>
    </Segment>
    <Segment inverted style={{ minHeight: '700px', padding: '1em 0em' }} vertical>
      { children }
      <ErrorModal />
    </Segment>
  </Responsive>
)

export default Layout
