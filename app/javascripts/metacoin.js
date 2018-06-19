import { default as contract } from 'truffle-contract'
const MetaCoin = contract(require('contracts/MetaCoin.json?load-inline'))
export default MetaCoin
