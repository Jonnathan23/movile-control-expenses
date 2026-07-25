export enum AccountType {
    CASH = "cash",
    BANK = "bank",
    CREDIT = "credit",
    SAVINGS = "savings",
}

export class AccountEntity {
    public readonly id: string;
    public name: string;
    public type: AccountType;
    public balance: number;
    public icon: string;

    public constructor(id: string, name: string, type: AccountType, balance: number, icon: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.balance = balance;
        this.icon = icon;
    }
}
