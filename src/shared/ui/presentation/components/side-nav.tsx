import type { ReactElement } from "react";
import { Bell, Home, MoreHorizontal, Plus, TrendingDown, Wallet } from "lucide-react";

import { calculateTotalNet } from "src/shared/core/helpers/calculations.helper";
import { currencyFormatHelper } from "src/shared/core/helpers/format.helper";
import type { NavTab } from "src/shared/ui/presentation/components/bottom-nav";
import {
    ICON_SIZES,
    THEME_BORDERS,
    THEME_COLORS,
    THEME_GRADIENTS,
    THEME_SHADOWS,
} from "src/shared/ui/presentation/constants/theme.constant";

import type { AccountEntity } from "src/features/accounts/core/entities/account.entity";

interface SideNavProps {
    activeTab: NavTab;
    onTabChange: (tab: NavTab) => void;
    onNewTransaction: () => void;
    accounts: AccountEntity[];
}

const NAV_ITEMS = [
    { id: "home" as NavTab, label: "Inicio", icon: Home },
    { id: "transactions" as NavTab, label: "Gastos", icon: TrendingDown },
    { id: "accounts" as NavTab, label: "Cuentas", icon: Wallet },
    { id: "more" as NavTab, label: "Más", icon: MoreHorizontal },
];

export const SideNav = (props: SideNavProps): ReactElement => {
    const { activeTab, onTabChange: handleOnTabChange, onNewTransaction: handleOnNewTransaction, accounts } = props;
    const totalNet = calculateTotalNet(accounts);

    return (
        <aside
            aria-label="Navegación principal"
            className="hidden md:flex flex-col flex-shrink-0 h-full overflow-hidden"
            style={{
                width: "240px",
                background: THEME_COLORS.background,
                borderRight: `1px solid ${THEME_BORDERS.strong}`,
            }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6 flex-shrink-0">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: THEME_GRADIENTS.primary }}
                    aria-hidden="true"
                >
                    <Wallet size={ICON_SIZES.medium} color={THEME_COLORS.white} />
                </div>
                <span className="text-lg font-bold text-white">PocketCap</span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleOnTabChange(item.id)}
                            aria-current={isActive ? "page" : undefined}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                            style={{
                                background: isActive ? THEME_COLORS.primaryOverlay : THEME_COLORS.transparent,
                                color: isActive ? THEME_COLORS.primaryLight : THEME_COLORS.muted,
                            }}
                        >
                            <Icon size={ICON_SIZES.medium} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* New transaction button */}
            <div className="px-4 pb-4 flex-shrink-0">
                <button
                    onClick={handleOnNewTransaction}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110 active:scale-[0.98]"
                    style={{
                        background: THEME_GRADIENTS.primary,
                        boxShadow: THEME_SHADOWS.primary,
                    }}
                >
                    <Plus size={ICON_SIZES.medium} />
                    Nuevo Gasto
                </button>
            </div>

            {/* Patrimony summary */}
            <div
                className="mx-4 mb-4 p-4 rounded-2xl flex-shrink-0"
                style={{ background: THEME_COLORS.surface, border: `1px solid ${THEME_BORDERS.strong}` }}
            >
                <p className="text-[11px] font-medium mb-1" style={{ color: THEME_COLORS.muted }}>
                    Patrimonio Total
                </p>
                <p
                    className="text-lg font-bold"
                    style={{ color: totalNet >= 0 ? THEME_COLORS.primaryLight : THEME_COLORS.danger }}
                >
                    {totalNet < 0 ? "-" : ""}
                    {currencyFormatHelper(Math.abs(totalNet))}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: THEME_COLORS.muted }}>
                    {accounts.length} cuenta{accounts.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Notification icon at bottom */}
            <div
                className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                style={{ borderTop: `1px solid ${THEME_BORDERS.light}` }}
            >
                <button
                    aria-label="Notificaciones"
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors relative"
                >
                    <Bell size={ICON_SIZES.medium} color={THEME_COLORS.muted} />
                    <span
                        aria-hidden="true"
                        className="absolute top-1 right-1 w-2 h-2 rounded-full border-2"
                        style={{ background: THEME_COLORS.primaryLight, borderColor: THEME_COLORS.background }}
                    />
                </button>
                <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-white">Mi cuenta</span>
                    <span className="text-[10px]" style={{ color: THEME_COLORS.muted }}>
                        Julio 2025
                    </span>
                </div>
            </div>
        </aside>
    );
};
