import { Tab } from 'store/tabs/types'

import { TabClient } from 'api/client'

import { API_URL } from 'api/common'

const repo: Tab[] = [
    { id: 1, amount: 10, currency: 'EUR', name: 'Test tab1' },
    { id: 2, amount: 20, type: 2, currency: 'EUR', name: 'Test tab2' },
    { id: 3, amount: 10, type: 1, currency: 'EUR', name: 'Test tab3' },
    { id: 4, amount: 10, type: 1, currency: 'EUR', name: 'Exceptionaly long tab name' },
    { id: 5, amount: 10, type: 1, currency: 'EUR', name: 'Test tab5' },
]

const client = new TabClient(API_URL)

export async function getAll(): Promise<Tab[]> {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    const tabs = await client.getAll()

    return tabs.map(vm => ({
        id: vm.id,
        amount: vm.amount,
        name: vm.name,
        currency: vm.currency,
        type: vm.type
    }) as Tab)
}

export async function get(id: number): Promise<Tab> {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    // throw 'testing exception'
    return repo[id]
}

export async function add(tab: Tab): Promise<number> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    return repo.push({ ...tab, id: repo.length })
}

export async function remove(id: number): Promise<void> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    repo.splice(id, 1)
}

export async function update(id: number, tab: Tab): Promise<void> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    repo[id] = tab
} 