import Actions from 'actions'
import MetaCoin from 'metacoin'

import { push } from 'connected-react-router'
import { showError } from './modal'

export function selectColor (color) {
  return { type: Actions.SET_PIXEL_COLOR, payload: color }
}

export function setLeaseTime (minutes) {
  return async (dispatch) => {
    let instance = await MetaCoin.deployed()
    let coins = await instance.minutesToCoins.call(minutes)
    coins = parseInt(coins.toFixed())
    dispatch({ type: Actions.SET_LEASE_TIME, payload: { minutes, coins } })
  }
}

export function clearPixel () {
  return { type: Actions.CLEAR_PIXEL }
}

export function selectPixel (id) {
  return async (dispatch) => {
    dispatch(clearPixel())
    let instance = await MetaCoin.deployed()
    let isExpired = await instance.isExpired.call(id)

    if (isExpired) {
      dispatch(selectColor({ r: 255, g: 255, b: 255 }))
      dispatch(setLeaseTime(1))
      dispatch({ type: Actions.SELECT_PIXEL, payload: id })
    } else {
      dispatch({ type: Actions.SELECT_PIXEL, payload: null })
      dispatch(push('/'))
      dispatch(showError('Pixel is currently leased'))
    }
  }
}

export function buyPixel ({ id, color, minutes, account }) {
  return async (dispatch) => {
    dispatch({ type: Actions.BUY_PIXEL_LOADING, payload: true })
    let instance = await MetaCoin.deployed()

    try {
      let { r, g, b } = color
      let { tx } = await instance.buyPixel(id, r, g, b, minutes, { from: account })
      dispatch(push(`/buy/confirmation/${tx}`))
      dispatch(clearPixel())
    } catch (e) {
      console.error(e)
      dispatch(showError(e.toString()))
    }

    dispatch({ type: Actions.BUY_PIXEL_LOADING, payload: false })
  }
}
