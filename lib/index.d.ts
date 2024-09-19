/// <reference types="react" />
import { CSSComponentConfig, CSS, PolymorphicComponent } from "./type";
export { CSSComponentConfig, CSS, VariantProps } from "./type";
export declare const styled: <V extends object | Partial<{
    [key: string]: {
        [key: string]: CSS;
        [key: number]: CSS;
    };
}>, E extends import("react").ElementType<any>>(element: E, config?: CSSComponentConfig<V> | undefined) => PolymorphicComponent<E, V>;
//# sourceMappingURL=index.d.ts.map