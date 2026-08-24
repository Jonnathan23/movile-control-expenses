import { currencyFormatHelper } from "src/shared/core/helpers/format.helper";

type AmountDisplayProps = {
    readonly label?: string;
    readonly amount: number;
};

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        <div>
            <p className="text-2xl text-primary font-bold">
                {label && `${label}: `}
                <span className="font-black text-black">{currencyFormatHelper(amount)}</span>
            </p>
        </div>
    );
}
