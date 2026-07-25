import type { ReactElement, ReactNode } from "react";
import { Home, MoreHorizontal, Plus, TrendingDown, Wallet } from "lucide-react";

import {
    ICON_SIZES,
    THEME_BORDERS,
    THEME_COLORS,
    THEME_GRADIENTS,
    THEME_SHADOWS,
} from "src/shared/ui/presentation/constants/theme.constant";

export type NavTab = "home" | "transactions" | "accounts" | "more";

interface BottomNavProps {
    activeTab: NavTab;
    onTabChange: (tab: NavTab) => void;
    onNewTransaction: () => void;
}

interface NavItem {
    id: NavTab;
    label: string;
    icon: ReactNode;
}

const NAV_ITEMS_LEFT: NavItem[] = [
    { id: "home", label: "Inicio", icon: <Home size={ICON_SIZES.large} /> },
    { id: "transactions", label: "Gastos", icon: <TrendingDown size={ICON_SIZES.large} /> },
];

const NAV_ITEMS_RIGHT: NavItem[] = [
    { id: "accounts", label: "Cuentas", icon: <Wallet size={ICON_SIZES.large} /> },
    { id: "more", label: "Más", icon: <MoreHorizontal size={ICON_SIZES.large} /> },
];

export const BottomNav = (props: BottomNavProps): ReactElement => {
    const { activeTab, onTabChange: handleOnTabChange, onNewTransaction: handleOnNewTransaction } = props;

    return (
        <nav aria-label="Navegación principal" className="md:hidden flex-shrink-0">
            <div
                className="flex items-end justify-around px-2"
                style={{
                    background: THEME_COLORS.surface,
                    borderTop: `1px solid ${THEME_BORDERS.stronger}`,
                    paddingBottom: "max(env(safe-area-inset-bottom), 8px)",
                    paddingTop: "8px",
                }}
            >
                {NAV_ITEMS_LEFT.map((item) => (
                    <NavButton
                        key={item.id}
                        item={item}
                        isActive={activeTab === item.id}
                        onClick={() => handleOnTabChange(item.id)}
                    />
                ))}

                {/* Center FAB */}
                <div className="flex flex-col items-center -mt-5">
                    <button
                        onClick={handleOnNewTransaction}
                        aria-label="Nuevo Gasto"
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-95"
                        style={{
                            background: THEME_GRADIENTS.primary,
                            boxShadow: THEME_SHADOWS.primaryLarge,
                        }}
                    >
                        <Plus size={ICON_SIZES.huge} color={THEME_COLORS.white} strokeWidth={2.5} />
                    </button>
                    <span className="text-[10px] mt-1 text-transparent select-none" aria-hidden="true">
                        +
                    </span>
                </div>

                {NAV_ITEMS_RIGHT.map((item) => (
                    <NavButton
                        key={item.id}
                        item={item}
                        isActive={activeTab === item.id}
                        onClick={() => handleOnTabChange(item.id)}
                    />
                ))}
            </div>
        </nav>
    );
};

interface NavButtonProps {
    item: NavItem;
    isActive: boolean;
    onClick: () => void;
}

const NavButton = (props: NavButtonProps): ReactElement => {
    const { item, isActive, onClick: handleOnClick } = props;

    return (
        <button
            onClick={handleOnClick}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors"
            style={{ color: isActive ? THEME_COLORS.primaryLight : THEME_COLORS.muted }}
        >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
        </button>
    );
};
