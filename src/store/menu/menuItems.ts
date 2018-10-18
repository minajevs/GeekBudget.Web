import { InternalMenuItem } from './types'

import * as tabsThunks from 'store/tabs/thunks'
import * as errorActions from 'store/errors/actions'

const menuItems: InternalMenuItem[] = [
    {
        title: 'Load tabs',
        onClick: (dispatch) => dispatch(tabsThunks.getAll())
    },
    {
        title: 'Throw test error',
        onClick: (dispatch) => dispatch(errorActions.throwError({ code: 1, text: 'Test error from menu' }))
    }
]

export default menuItems