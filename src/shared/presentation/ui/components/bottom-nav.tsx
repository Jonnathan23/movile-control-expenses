import type { ReactElement } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";

import {
    ICON_SIZES,
    THEME_BORDERS,
    THEME_COLORS,
    THEME_GRADIENTS,
    THEME_SHADOWS,
} from "src/shared/presentation/constants/theme.constant";
import type { AppRoute } from "src/shared/presentation/ui/routes/routes";
import { APP_ROUTES } from "src/shared/presentation/ui/routes/routes";

export const BottomNav = (): ReactElement => {
    const location = useLocation();
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();

    const handleOnNewTransaction = () => {
        setSearchParams({ action: "new" });
    };

    const routerLeftSlice = 2;
    const routerRightSlice = 4;

    const navItemsLeft = APP_ROUTES.slice(0, routerLeftSlice);

    const navItemsRight = APP_ROUTES.slice(routerLeftSlice, routerRightSlice);

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
                {navItemsLeft.map((item) => {
                    const isActive = location.pathname === item.path;
                    const handleNavClick = () => {
                        navigate(item.path);
                    };
                    return <NavButton key={item.id} item={item} isActive={isActive} onClick={handleNavClick} />;
                })}

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

                {navItemsRight.map((item) => {
                    const isActive = location.pathname === item.path;
                    const handleNavClick = () => {
                        navigate(item.path);
                    };
                    return <NavButton key={item.id} item={item} isActive={isActive} onClick={handleNavClick} />;
                })}
            </div>
        </nav>
    );
};

interface NavButtonProps {
    item: AppRoute;
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
            <item.icon size={ICON_SIZES.large} />
            <span className="text-[10px] font-medium">{item.label}</span>
        </button>
    );
};
