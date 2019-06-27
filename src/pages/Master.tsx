import * as React from 'react'

import MasterComponent from 'components/pages/Master'
import Header from 'components/header/Header'

import Confirm from 'containers/utilities/Confirm'
import Error from 'components/common/Error'

import { Provider as MenuProvider } from 'context/header/menu'
import { Provider as ErrorProvider } from 'context/errors'

type Props = {
    children: React.ReactNode
}

const MainPage: React.SFC<Props> = (props: Props) => (
    <MasterComponent>
        <ErrorProvider>
            <MenuProvider>
                <Header />
            </MenuProvider>

            {props.children}
            <Error />
            <Confirm />
        </ErrorProvider>
    </MasterComponent>
)

export default MainPage