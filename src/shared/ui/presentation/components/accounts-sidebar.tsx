import type { ReactElement } from "react";
import { Plus, X } from "lucide-react";

import { calculateTotalNet } from "src/shared/core/helpers/calculations.helper";
import { currencyFormatHelper } from "src/shared/core/helpers/format.helper";
import { ICON_SIZES, THEME_BORDERS, THEME_COLORS } from "src/shared/ui/presentation/constants/theme.constant";

import type { AccountEntity } from "src/features/accounts/core/entities/account.entity";

interface AccountsSidebarProps {
    accounts: AccountEntity[];
    isOpen: boolean;
    onClose: () => void;
    onAddAccount: () => void;
}

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
    cash: "Efectivo",
    bank: "Cuenta Bancaria",
    credit: "Tarjeta de Crédito",
    savings: "Ahorros",
};

export const AccountsSidebar = (props: AccountsSidebarProps): ReactElement => {
    const { accounts, isOpen, onClose: handleOnClose, onAddAccount: handleOnAddAccount } = props;
    const totalNet = calculateTotalNet(accounts);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div role="presentation" className="fixed inset-0 z-40 bg-black/50 animate-fade-in" onClick={handleOnClose} />
            )}

            {/* Drawer */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Mis cuentas"
                className={[
                    "fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] flex flex-col",
                    isOpen ? "animate-slide-in-left" : "pointer-events-none opacity-0 -translate-x-full",
                ].join(" ")}
                style={{
                    background: THEME_COLORS.background,
                    borderRight: `1px solid ${THEME_BORDERS.strong}`,
                    transition: isOpen ? "none" : "opacity 0.3s, transform 0.3s",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-12 pb-4">
                    <h2 className="text-lg font-bold text-white">Mis Cuentas</h2>
                    <button
                        onClick={handleOnClose}
                        aria-label="Cerrar menú"
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X size={ICON_SIZES.large} color={THEME_COLORS.foregroundSecondary} />
                    </button>
                </div>

                {/* Add account button */}
                <div className="px-5 pb-4">
                    <button
                        onClick={handleOnAddAccount}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition-colors hover:bg-[#26a09b]/20"
                        style={{
                            border: `1.5px solid ${THEME_COLORS.primary}`,
                            color: THEME_COLORS.primaryLight,
                        }}
                    >
                        <Plus size={ICON_SIZES.small} />
                        Nueva Cuenta
                    </button>
                </div>

                {/* Accounts list */}
                <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3 hide-scrollbar">
                    {accounts.map((account) => (
                        <AccountCard key={account.id} account={account} />
                    ))}
                </div>

                {/* Total patrimony pinned at bottom */}
                <div
                    className="mx-5 mb-8 p-4 rounded-2xl"
                    style={{ background: THEME_COLORS.surface, border: `1px solid ${THEME_BORDERS.extraStrong}` }}
                >
                    <p className="text-xs font-medium mb-1" style={{ color: THEME_COLORS.muted }}>
                        Patrimonio Total
                    </p>
                    <p
                        className="text-2xl font-bold"
                        style={{ color: totalNet >= 0 ? THEME_COLORS.primaryLight : THEME_COLORS.danger }}
                    >
                        {totalNet < 0 ? "-" : ""}
                        {currencyFormatHelper(totalNet)}
                    </p>
                    <p className="text-xs mt-1" style={{ color: THEME_COLORS.muted }}>
                        {accounts.length} cuenta{accounts.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </aside>
        </>
    );
};

interface AccountCardProps {
    account: AccountEntity;
}

const AccountCard = ({ account }: AccountCardProps): ReactElement => {
    const isNegative = account.balance < 0;

    return (
        <div
            className="p-4 rounded-2xl flex items-center gap-3"
            style={{ background: THEME_COLORS.surface, border: `1px solid ${THEME_BORDERS.medium}` }}
        >
            {/* Icon */}
            <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: THEME_COLORS.primaryHover }}
                aria-hidden="true"
            >
                {account.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-white truncate">{account.name}</p>
                <p className="text-xs" style={{ color: THEME_COLORS.muted }}>
                    {ACCOUNT_TYPE_LABELS[account.type] ?? account.type}
                </p>
            </div>

            {/* Balance */}
            <p
                className="text-sm font-bold flex-shrink-0"
                style={{ color: isNegative ? THEME_COLORS.danger : THEME_COLORS.primaryLight }}
            >
                {isNegative ? "-" : "+"}
                {currencyFormatHelper(account.balance)}
            </p>
        </div>
    );
};
