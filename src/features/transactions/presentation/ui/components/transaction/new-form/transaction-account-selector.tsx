import { ChevronDown } from "lucide-react";

import { currencyFormatHelper } from "src/shared/core/helpers/format.helper";

import { useTransactionAccount } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-account.hook";

export function TransactionAccountSelector() {
    const { accounts, currentAccount, isAccountOpen, handleAccountToggleClick, handleAccountClick } = useTransactionAccount();

    return (
        <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "#85c9c0" }}>
                Cuenta
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={handleAccountToggleClick}
                    className="w-full flex items-center justify-between p-4 rounded-2xl text-sm font-medium text-white transition-colors hover:brightness-110"
                    style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.25)" }}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-xl" aria-hidden="true">
                            {currentAccount?.icon}
                        </span>
                        <div className="text-left">
                            <p className="font-semibold text-white">{currentAccount?.name}</p>
                            <p
                                className="text-xs"
                                style={{ color: currentAccount && currentAccount.balance >= 0 ? "#39b8a2" : "#ef4444" }}
                            >
                                {currentAccount ? currencyFormatHelper(currentAccount.balance) : "—"}
                            </p>
                        </div>
                    </div>
                    <ChevronDown
                        size={16}
                        color="#85c9c0"
                        className={isAccountOpen ? "rotate-180 transition-transform" : "transition-transform"}
                    />
                </button>

                {isAccountOpen && (
                    <div
                        className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-10 shadow-2xl animate-slide-up"
                        style={{ background: "#0a3240", border: "1px solid rgba(38,160,155,0.3)" }}
                    >
                        {accounts.map((acc) => (
                            <button
                                key={acc.id}
                                type="button"
                                onClick={handleAccountClick(acc.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                                style={{ borderBottom: "1px solid rgba(38,160,155,0.1)" }}
                            >
                                <span className="text-xl" aria-hidden="true">
                                    {acc.icon}
                                </span>
                                <span className="flex-1 text-left text-white font-medium">{acc.name}</span>
                                <span style={{ color: acc.balance >= 0 ? "#39b8a2" : "#ef4444" }}>
                                    {currencyFormatHelper(acc.balance)}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
