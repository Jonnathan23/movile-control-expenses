import type { LucideIcon } from "lucide-react";
import { Home, MoreHorizontal, TrendingDown, Wallet } from "lucide-react";

export interface AppRoute {
    readonly id: string;
    readonly path: string;
    readonly label: string;
    readonly icon: LucideIcon;
}

export const APP_ROUTES: AppRoute[] = [
    { id: "home", path: "/", label: "Inicio", icon: Home },
    { id: "transactions", path: "/transactions", label: "Gastos", icon: TrendingDown },
    { id: "accounts", path: "/accounts", label: "Cuentas", icon: Wallet },
    { id: "more", path: "/more", label: "Más", icon: MoreHorizontal },
];
