import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from 'reducers'

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')
  ReactDOM.render(
    <Provider store={store}>
      <HelloMessage />
    </Provider>, root)
})
