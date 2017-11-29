import * as constants from 'constants/settingsConstants';
import { Setting, SettingsState, ApplicationError, initialState } from 'types/index';
import { createAction } from 'redux-actions';
import { Dispatch } from 'react-redux';
import { throwApplicationError } from 'actions/errorActions';

export const setApplicationSetting = createAction<Setting>(constants.SET_APPLICATION_SETTING);
export function setSetting(setting: Setting) {
    return function (dispatch: Dispatch<{}>){
        const allKeys = window.localStorage.getItem('setting-keys');
        if (allKeys == null){
            dispatch(throwApplicationError({code: 99, object: {}, text: 'Setting keys are not initialized!'}));
            return;
        }
        window.localStorage.setItem(setting.key, setting.value);

        const keys = (allKeys as string).split(',');
        if (keys.filter(k => k === setting.key).length === 0)
            keys.push(setting.key);

        window.localStorage.setItem('setting-keys', keys.join(','));

        dispatch(setApplicationSetting(setting));
    };
}

export const updateAllApplicationSettings = createAction<Setting[]>(constants.UPDATE_ALL_APPLICATION_SETTINGS);
export function updateAllSettings() {
    return function (dispatch: Dispatch<{}>){
        const allKeys = window.localStorage.getItem('setting-keys');
        if (allKeys == null){
            dispatch(throwApplicationError({code: 99, object: {}, text: 'Setting keys are not initialized!'}));
            return;
        }

        const keys = (allKeys as string).split(',');
        const ret: Setting[] = keys.map(k => ({key: k, value: window.localStorage.getItem(k) as string}));
        dispatch(updateAllApplicationSettings(ret));
    };
}

export function initialiseSettings() {
    return function (dispatch: Dispatch<{}>){
        const allKeys = window.localStorage.getItem('setting-keys');
        
        if (allKeys != null) {
            dispatch(updateAllSettings());
            return;
        }

        initialState.settings.items.forEach(x => {
            window.localStorage.setItem(x.key, x.value);
        });
        
        const keys = initialState.settings.items.map(s => s.key).join(',');
        window.localStorage.setItem('setting-keys', keys);
        dispatch(updateAllSettings());
    };
}