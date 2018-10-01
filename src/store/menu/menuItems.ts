import { InternalMenuItem } from './types'

import * as errorActions from 'store/errors/actions'

const menuItems: InternalMenuItem[] = [
    {
        title: 'Throw test error',
        onClick: (dispatch) => dispatch(errorActions.throwError({ code: 1, text: 'Test error from menu' }))
    }
]

export default menuItems