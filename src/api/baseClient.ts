/* 
    ========= NOTE: =========
    After changing this class
    you need to generate new 
    client, because generated
    client does not reference 
    this file, but rather
    prepends it. 
    =========================
*/

class BaseClient {
    protected apiKey: string = ''

    transformOptions(options: RequestInit): Promise<RequestInit> {
        options.headers = new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'user-key': this.apiKey,
        })

        options.mode = 'cors'

        return Promise.resolve(options)
    }

    auth = (key: string) => {
        this.apiKey = key
        return this
    }
}