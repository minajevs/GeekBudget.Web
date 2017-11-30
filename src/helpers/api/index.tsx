export const getSetting = (key: string) => {
    return window.localStorage.getItem(key);
};

export const createApiUrl = (route: string, method: string, data: string = ''): string => {
    const apiUrl = getSetting('api-url');
    if (apiUrl == null) throw 'Api Url is not set! Please configure it in settings!';
    // Add check for format (starts with https://, etc)
    return `${apiUrl}/${route}/${method}/${data}`;
};

export const createRequestOptions = (method: string, body: object | null = null): RequestInit => {
    const accessKey = getSetting('access-key');
    if (accessKey == null) throw 'Access key is not set! Please configure it in settings!';
    return {
        headers: new Headers({
            'user-key': accessKey,
            'Content-Type': 'application/json'
        }),
        method: method,
        body: body == null ? null : JSON.stringify(body),
        mode: 'cors'
    };
};

export const createErrorStringFromDictionary = (dict: { [key: string]: string[] }): string => {
    let result = ``;
    for (const key in dict) {
        result += `
        ${key}: ${dict[key].join()}`;
    }
    return result;
};