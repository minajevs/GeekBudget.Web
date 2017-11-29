import * as reducers from '.';
import * as actions from 'actions/settingsActions';
import { initialState, Setting, SettingsState } from 'types';
import { Action } from 'redux-actions';

const setting: Setting = {
    key: 'test-key',
    value: 'test-value',
};

describe('Settings reducers', () => {
    describe('Set application settings', () => {
        it('should add new setting', () => {
            const action = actions.setApplicationSetting(setting);
            const newState = reducers.settingsReducers({items: []}, action);
            expect(newState.items.length).toBe(1);
        });
        it('should rewrite existing setting', () => {
            const action = actions.setApplicationSetting({...setting, value: 'test-value-1'});
            const newState = reducers.settingsReducers({items: [setting, {...setting, key: 'test-key-1'}]}, action);
    
            expect(newState.items.length).toBe(2);
            expect(newState.items[0].value).toBe('test-value-1');
        });
    });
    describe('Update all settings', () => {
        it('should assign new settings', () => {
            const payload = [setting];
            const action = actions.updateAllApplicationSettings(payload);
            const newState = reducers.settingsReducers({items: []}, action);
            
            expect(newState.items.length).toBe(1);
            expect(newState.items).toEqual(payload);
            expect(newState.items).not.toBe(payload);
        });
        it('should ignore empty payload', () => {
            const payload = [setting];
            const items: Setting[] = [];
            // tslint:disable-next-line:no-string-literal
            const action = (actions as {})['updateAllApplicationSettings'](undefined);
            const newState = reducers.settingsReducers({items: items}, action);
            
            expect(newState.items.length).toBe(0);
            expect(newState.items).not.toEqual(payload);
        });
    });
});