interface AccountEntityProps {
    readonly id: string;
    readonly name: string;
    readonly balance: number;
    readonly icon: string;
}

export class AccountEntity {
    public readonly id: string;
    public name: string;
    public balance: number;
    public icon: string;

    public constructor(props: AccountEntityProps) {
        const { id, name, balance, icon } = props;

        this.id = id;
        this.name = name;
        this.balance = balance;
        this.icon = icon;
    }
}
