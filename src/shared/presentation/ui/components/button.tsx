import type { ReactElement } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "src/shared/presentation/constants/button-variants.constant";
import { classNamesHelper } from "src/shared/presentation/helpers/class-names.helper";

export interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant = "default", size = "default", ...props }: ButtonProps): ReactElement => {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={classNamesHelper(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
};
