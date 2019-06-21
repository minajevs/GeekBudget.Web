import { Operation } from 'context/operation/types'

import { OperationClient, OperationVm, OperationFilter } from 'api/client'

import { API_URL } from 'api/common'

const client = new OperationClient(API_URL)

const mapVmToOperation = (vm: OperationVm): Operation => ({
    id: vm.id,
    amount: vm.amount || 0,
    comment: vm.comment,
    currency: vm.currency || '',
    date: vm.date,
    from: vm.from || -1,
    to: vm.to || -1
})

const repo: Operation[] = [
    { id: 1, amount: 10, currency: 'EUR', comment: 'comment1', from: 1, to: 2, date: new Date() },
    { id: 2, amount: 20, currency: 'USD', from: 2, to: 1, date: new Date() },
]

export async function getAll(): Promise<Operation[]> {
    const operations = await client.getAll()

    if (operations === null) return []

    return operations.map(mapVmToOperation)
}

export async function get(id: number): Promise<Operation[]> {
    const operations = await client.get(OperationFilter.fromJS({ id: id }))

    if (operations === null) return []

    return operations.map(mapVmToOperation)
}

export async function add(operation: Operation): Promise<number> {
    const id = await client.add(OperationVm.fromJS(operation))

    if (id === null) return -1

    return id
}

export async function remove(id: number): Promise<void> {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    repo.splice(id, 1)
}

export async function update(id: number, operation: Operation): Promise<void> {
    await client.update(id, OperationVm.fromJS(operation))
    return
} 