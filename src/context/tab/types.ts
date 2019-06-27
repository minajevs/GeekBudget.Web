export interface Tab {
    id: number
    type: TabType
    name: string
    amount: number
    currency: string
}

export enum TabType {
    Income = 1,
    Account,
    Expense
}