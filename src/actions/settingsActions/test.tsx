import * as actions from '.';

import * as types from 'constants/settingsConstants';

import { mockLocalStorage } from 'helpers/test';

describe('settingsActions', () => {
    describe('set setting', () => {
        it('should write in localstorage', async () => {
            mockLocalStorage();
            window.localStorage.setItem('setting-keys', 'test-key');

            const thunk = actions.setSetting({ key: 'test-key', value: 'test-value' });
            const dispatch = jest.fn();
            thunk(dispatch);

            const value = window.localStorage.getItem('test-key');
            const keys = window.localStorage.getItem('setting-keys');
            expect(value).toEqual('test-value');
            expect(keys).toEqual('test-key');
        });
        it('should add new key in localstorage', async () => {
            mockLocalStorage();
            window.localStorage.setItem('setting-keys', 'abc');

            const thunk = actions.setSetting({ key: 'test-key', value: 'test-value' });
            const dispatch = jest.fn();
            thunk(dispatch);

            const keys = window.localStorage.getItem('setting-keys');
            expect(keys).toEqual('abc,test-key');
        });
        it('should call setApplicationSetting', async () => {
            mockLocalStorage();
            window.localStorage.setItem('setting-keys', 'test-key');
            const setting = { key: 'test-key', value: 'test-value' };
            const thunk = actions.setSetting(setting);
            const dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch.mock.calls.length).toBe(1);
            expect(dispatch).toBeCalledWith(actions.setApplicationSetting(setting));
        });
        it('should throw error if settigns are not initialized', async () => {
            mockLocalStorage();
            window.localStorage.clear();
            const setting = { key: 'test-key', value: 'test-value' };
            const thunk = actions.setSetting(setting);
            const dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch.mock.calls.length).toBe(1);
            expect(dispatch).not.toBeCalledWith(actions.setApplicationSetting(setting));
        });
    });
    describe('update all settings', () => {
        it('should throw an error if settings are not initialised', () => {
            mockLocalStorage();
            window.localStorage.clear();

            const thunk = actions.updateAllSettings();
            const dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch.mock.calls.length).toBe(1);
            expect(dispatch).not.toBeCalledWith(actions.updateAllApplicationSettings([]));
        });
        it('should get all initialised keys', () => {
            mockLocalStorage();
            window.localStorage.setItem('setting-keys', 'test-key');
            window.localStorage.setItem('test-key', 'test-value');

            const thunk = actions.updateAllSettings();
            const dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch.mock.calls.length).toBe(1);
            expect(dispatch)
                .toBeCalledWith(actions.updateAllApplicationSettings([{key: 'test-key', value: 'test-value'}]));
        });
    });
    describe('initialise settings', () => {
        it('should initialise default keys', () => {
            mockLocalStorage();
            window.localStorage.clear();

            const thunk = actions.initialiseSettings();
            const dispatch = jest.fn();
            thunk(dispatch);

            expect(window.localStorage.getItem('setting-keys')).toBe('api-url,access-key');
            expect(dispatch).toBeCalled();
        });
        it('should not initialise if already did', () => {
            mockLocalStorage();
            window.localStorage.clear();
            window.localStorage.setItem('setting-keys', 'test-key');

            const thunk = actions.initialiseSettings();
            const dispatch = jest.fn();
            thunk(dispatch);

            expect(window.localStorage.getItem('setting-keys')).toBe('test-key');
            expect(dispatch).toBeCalled();
        });
    });
});