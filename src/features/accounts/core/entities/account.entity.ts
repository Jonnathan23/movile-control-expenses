export class AccountEntity {
    public readonly id: string;
    public name: string;
    public balance: number;
    public icon: string;

    public constructor(id: string, name: string, balance: number, icon: string) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.icon = icon;
    }
}
