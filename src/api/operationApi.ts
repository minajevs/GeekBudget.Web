import { Operation } from 'store/operations/types'

const repo: Operation[] = [
    { id: 1, amount: 10, currency: 'EUR', comment: 'comment1', from: 1, to: 2, date: new Date() },
    { id: 2, amount: 20, currency: 'USD', comment: 'comment2', from: 2, to: 1, date: new Date() },
]

export async function getAll(): Promise<Operation[]> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    return repo
}

export async function get(id: number): Promise<Operation> {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    // throw 'testing exception'
    return repo[id]
}

export async function add(operation: Operation): Promise<number> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    return repo.push({ ...operation, id: repo.length })
}

export async function remove(id: number): Promise<void> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    repo.splice(id, 1)
}

export async function update(id: number, operation: Operation): Promise<void> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    repo[id] = operation
} 