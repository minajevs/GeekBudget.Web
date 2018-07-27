import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { createHashHistory } from 'history'
import configureStore from './configureStore'
import registerServiceWorker from './registerServiceWorker'

import Root from './Root'
import { initialState } from 'store' 

import 'typeface-roboto'

const history = createHashHistory()
const store = configureStore(history, initialState)

ReactDOM.render(
  <Root history={history} store={store}/>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
