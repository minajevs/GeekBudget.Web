import { Tab, TabType } from 'context/tab/types'

import { TabClient, TabVm } from 'api/client'

import { API_URL } from 'api/common'

const client = new TabClient(API_URL)

const mapVmToTab = (vm: TabVm): Tab => ({
    id: vm.id,
    name: vm.name || '',
    amount: vm.amount || 0,
    currency: vm.currency || '',
    type: vm.type as TabType
})

export async function getAll(): Promise<Tab[]> {
    const tabs = await client.getAll()

    if (tabs === null) return []

    return tabs.map(mapVmToTab)
}

export async function get(id: number): Promise<Tab | null> {
    const tab = await client.get(id)

    if (tab === null) return tab

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