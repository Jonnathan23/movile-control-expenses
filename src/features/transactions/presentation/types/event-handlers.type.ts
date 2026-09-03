/**
 * Represents a curried action handler where a payload of type T is provided,
 * returning a void function. This is typically used for inline click handlers
 * that need to pass an argument.
 */
export type CurriedActionHandler<T = string> = (payload: T) => () => void;
