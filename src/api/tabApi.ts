import { Tab } from 'store/tabs/types'

import { TabClient, TabVm } from 'api/client'

import { API_URL } from 'api/common'

const repo: Tab[] = [
    { id: 1, amount: 10, currency: 'EUR', name: 'Test tab1' },
    { id: 2, amount: 20, type: 2, currency: 'EUR', name: 'Test tab2' },
    { id: 3, amount: 10, type: 1, currency: 'EUR', name: 'Test tab3' },
    { id: 4, amount: 10, type: 1, currency: 'EUR', name: 'Exceptionaly long tab name' },
    { id: 5, amount: 10, type: 1, currency: 'EUR', name: 'Test tab5' },
]

const client = new TabClient(API_URL)

const mapVmToTab = (vm: TabVm): Tab => ({
    id: vm.id,
    name: vm.name || '',
    amount: vm.amount || 0,
    currency: vm.currency || '',
    type: vm.type
})

export async function getAll(): Promise<Tab[]> {
    const tabs = await client.getAll()

    return tabs.map(mapVmToTab)
}

export async function get(id: number): Promise<Tab> {
    const tab = await client.get(id)

    return mapVmToTab(tab)
}

export async function add(tab: Tab): Promise<number> {
    const vm = TabVm.fromJS(tab)
    const newId = await client.add(vm)
    
    return newId
}

export async function remove(id: number): Promise<void> {
    await client.remove(id)
}

export async function update(id: number, tab: Tab): Promise<void> {
    await client.update(id, TabVm.fromJS(tab))
} 