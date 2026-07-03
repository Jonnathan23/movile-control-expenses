import { currencyFormatter } from "src/shared/core/helpers/format.helper";

type AmountDisplayProps = {
    readonly label?: string;
    readonly amount: number;
};

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        <div>
            <p className="text-2xl text-blue-600 font-bold">
                {label && `${label}: `}
                <span className="font-black text-black">{currencyFormatter.formatCurrency(amount)}</span>
            </p>
        </div>
    );
}
