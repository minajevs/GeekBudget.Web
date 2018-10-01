import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import MainPage from 'pages/MainPage'

// Consider `react-loadable` when there are too many routes.
const Routes: React.SFC = () => (
    <Switch>
        <Route exact path="/" component={MainPage} />
        <Route component={() => <div>Not Found</div>} />
    </Switch>
)

export default Routes