import { Tab } from 'store/tabs/types'

const repo: Tab[] = [
    { id: 1, amount: 10, currency: 'EUR', name: 'Test tab1' },
    { id: 2, amount: 20, type: 2, currency: 'EUR', name: 'Test tab2' },
]

export async function getAll(): Promise<Tab[]> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    return repo
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