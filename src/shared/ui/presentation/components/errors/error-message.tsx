import type { ReactNode } from "react";

type ErrorMessageProps = {
    readonly children: ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return <p className="bg-error p-2 text-white font-bold text-sm text-center">{children}</p>;
}
