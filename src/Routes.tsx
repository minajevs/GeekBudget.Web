import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

// import Header from './components/layout/Header'
import ErrorContainer from 'containers/ErrorContainer'

import MainPage from 'pages/MainPage'

// Consider `react-loadable` when there are too many routes.
const Routes: React.SFC = () => (
    <>
        <div>HEADER</div>
        <hr />
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route component={() => <div>Not Found</div>} />
        </Switch>
        <ErrorContainer />
    </>
)

export default Routes