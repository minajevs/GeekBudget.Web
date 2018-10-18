import { Store, AnyAction } from 'redux'
import { ApplicationState } from 'store'
import { Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export interface InternalMenuItem {
    title: string
    onClick?: (dispatch: Dispatch & ThunkDispatch<{}, undefined, AnyAction>) => void
}

export class MenuItem implements InternalMenuItem {
    title: string;
    onClick?: () => void
    constructor(dispatch: Dispatch, internalItem: InternalMenuItem) {
        this.title = internalItem.title
        this.onClick = internalItem.onClick !== undefined
            ? () => (internalItem.onClick as (dispatch: Dispatch) => void)(dispatch)
            : undefined
    }
}

export const enum ActionTypes {
    OPEN = '@@menu/OPEN',
    CLOSE = '@@menu/CLOSE',
}

export interface State {
    readonly open: boolean
    readonly anchor: HTMLElement | null
    readonly items: InternalMenuItem[]
}