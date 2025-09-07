export type Maybe<T> = T | null

export type ValueOf<T> = T[keyof T]

export declare type HintedString<T extends string> = (string & object) | T

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T>
  & Pick<T, TRequired>
