import * as helpers from '.';

// API Settings
// REACT_APP_API_URL="https://localhost/api"
// REACT_APP_API_ACCESS_KEY="accesskey"

describe('Api helpers', () => {
    localStorage.setItem('api-url', 'https://testurl/api');
    localStorage.setItem('access-key', 'accesskey');
    describe('create api url', () => {
        it('should create correct url', () => {
            const url = helpers.createApiUrl('test-route', 'test-method', 'test-data');
            expect(url).toEqual('https://testurl/api/test-route/test-method/test-data');
        });
        it('should create correct url withoud data', () => {
            const url = helpers.createApiUrl('test-route', 'test-method');
            expect(url).toEqual('https://testurl/api/test-route/test-method/');
        });
        it('should throw an error if no api url', () => {
            localStorage.removeItem('api-url');
            expect(() => helpers.createApiUrl('test-route', 'test-method')).toThrowError(/not set/);
        });
    });

    describe('create request options', () => {
        it('should create correct options', () => {
            const body = {test: 'value'};
            const options = helpers.createRequestOptions('GET', {test: 'value'});
            expect(options.body).toEqual(JSON.stringify(body));
            expect(options.method).toEqual('GET');
            expect(options.mode).toEqual('cors');
            expect(options.headers).not.toBeUndefined();
            expect((options.headers as Headers).get('user-key')).toEqual('accesskey');
            expect((options.headers as Headers).get('Content-Type')).toEqual('application/json');
        });
        it('should create correct options without body', () => {
            const body = {test: 'value'};
            const options = helpers.createRequestOptions('GET');
            expect(options.body).toBeNull();
        });
        it('should throw an error if no access key', () => {
            localStorage.removeItem('access-key');
            expect(() => helpers.createRequestOptions('GET')).toThrowError(/not set/);
        });
    });
    describe('create error string from dict', () => {
        it('should create correct string', () => {
            const dict = {
                'test1': ['val11', 'val12'],
                'test2': ['val21', 'val22']
            };
            const str = helpers.createErrorStringFromDictionary(dict);
            expect(str).toEqual(`
        test1: val11,val12
        test2: val21,val22`);
        });
    });
});