import type { ReactElement } from "react";
import { Bell, Menu } from "lucide-react";

import { ICON_SIZES, THEME_COLORS } from "src/shared/presentation/constants/theme.constant";

interface TopHeaderProps {
    onMenuOpen: () => void;
    notificationCount?: number;
}

export const TopHeader = (props: TopHeaderProps): ReactElement => {
    const defaultNotificationCount = 2;
    const { onMenuOpen: handleOnMenuOpen, notificationCount = defaultNotificationCount } = props;

    return (
        <header className="flex items-center justify-between px-5 py-4 relative z-10">
            <button
                onClick={handleOnMenuOpen}
                aria-label="Abrir menú"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
                <Menu size={ICON_SIZES.extraLarge} color={THEME_COLORS.foregroundSecondary} />
            </button>

            <h1 className="text-lg font-bold tracking-wide text-white">PocketCap</h1>

            <button
                aria-label={`Notificaciones${notificationCount > 0 ? `, ${notificationCount} sin leer` : ""}`}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors relative"
            >
                <Bell size={ICON_SIZES.extraLarge} color={THEME_COLORS.foregroundSecondary} />
                {notificationCount > 0 && (
                    <span
                        aria-hidden="true"
                        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
                        style={{ background: THEME_COLORS.primaryLight, borderColor: THEME_COLORS.background }}
                    />
                )}
            </button>
        </header>
    );
};
