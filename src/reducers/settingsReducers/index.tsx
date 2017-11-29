import * as constants from 'constants/settingsConstants';
import { SettingsState, Setting, initialState } from 'types';
import { handleActions, Action } from 'redux-actions';

import Operation from 'models/Operation';
import { insertItem } from 'helpers';

export const settingsReducers = handleActions<SettingsState, Setting | Setting[]>(
    {
        [constants.SET_APPLICATION_SETTING]: (state: SettingsState,
                                              action: Action<Setting>): SettingsState => (
                {
                    ...state,
                    items: state.items.filter(i => i.key === (action.payload as Setting).key).length > 0
                        ? state.items.map(i => i.key === (action.payload as Setting).key  // Item already exist  
                                ? (action.payload as Setting)
                                : i)
                        : insertItem(state.items, (action.payload as Setting))  // New item  
                }
            ),
        [constants.UPDATE_ALL_APPLICATION_SETTINGS]: (state: SettingsState,
                                                      action: Action<Setting[]>): SettingsState => (
                {
                    ...state,
                    items: (action.payload as Setting[]) != null 
                        ? [...(action.payload as Setting[])] 
                        : [...state.items]
                }
            ),     
    },
    initialState.settings);