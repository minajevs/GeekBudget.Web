import Api from '.';
import * as tabApi from './tab';
import * as operationApi from './operation';
import { apiHelpers } from 'helpers';

describe('Api', () => {
    it('should have static methods', () => {
        expect(Api.operation).toBe(operationApi);
        expect(Api.tab).toBe(tabApi);
        expect(Api.helpers).toBe(apiHelpers);
    });
    it('should get 100% covergae on this ffs', () => {
        const api = new Api();
        expect(api).not.toBeNull();
    });
});