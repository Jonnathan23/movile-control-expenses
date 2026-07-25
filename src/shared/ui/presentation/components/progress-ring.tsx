import type { ReactElement } from "react";

import { PROGRESS_RING, THEME_COLORS } from "src/shared/ui/presentation/constants/theme.constant";

interface ProgressRingProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
}

export const ProgressRing = (props: ProgressRingProps): ReactElement => {
    const { percentage, size = PROGRESS_RING.defaultSize, strokeWidth = PROGRESS_RING.defaultStrokeWidth } = props;

    const clampedPercentage = Math.min(PROGRESS_RING.maxPercentage, Math.max(PROGRESS_RING.minPercentage, percentage));

    const radiusPromed = 2;
    const radius = (size - strokeWidth) / radiusPromed;

    const circumConstant = 2;
    const circumference = circumConstant * Math.PI * radius;
    const offset = circumference - (clampedPercentage / PROGRESS_RING.maxPercentage) * circumference;

    // Color transitions: green → yellow → red
    const ringColor =
        clampedPercentage < PROGRESS_RING.thresholdWarning
            ? THEME_COLORS.primaryLight
            : clampedPercentage < PROGRESS_RING.thresholdDanger
              ? THEME_COLORS.warning
              : THEME_COLORS.danger;

    const circuleX = 2;
    const circuleY = 2;

    return (
        <div
            role="img"
            aria-label={`${clampedPercentage}% del presupuesto gastado`}
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: "rotate(-90deg)" }}
                aria-hidden="true"
            >
                {/* Track */}
                <circle
                    cx={size / circuleX}
                    cy={size / circuleY}
                    r={radius}
                    fill="none"
                    stroke={THEME_COLORS.primaryHover}
                    strokeWidth={strokeWidth}
                />
                {/* Progress */}
                <circle
                    cx={size / circuleX}
                    cy={size / circuleY}
                    r={radius}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.4s ease" }}
                />
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white leading-none">{Math.round(clampedPercentage)}%</span>
                <span className="text-xs mt-1 font-medium" style={{ color: THEME_COLORS.muted }}>
                    Gastado
                </span>
            </div>
        </div>
    );
};
