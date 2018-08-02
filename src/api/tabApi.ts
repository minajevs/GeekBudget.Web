import { Tab } from 'store/tabs/types'

export async function getAll(): Promise<Tab[]>{
    const tab: Tab = {id: 1, amount: 10, currency: 'EUR', name: 'Test tab'}
    await new Promise(resolve => setTimeout(resolve, 1000))
    throw 'testing exception'
    return [
        tab
    ]
} 