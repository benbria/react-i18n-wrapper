import React from 'react';
import { I18nContext } from "./context";
import { WithI18nProps } from './types';

type SetComplement<A, A1 extends A> = A extends A1 ? never : A;

type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>;

export default function withI18n<WrappedProps extends WithI18nProps>(
    Child: React.ComponentType<WrappedProps> // tslint:disable-line variable-name
) {
    type HocProps = Subtract<WrappedProps, WithI18nProps>;

    return function TranslateComponent(props: HocProps) {
        return <I18nContext.Consumer>{
            i18n => <Child {...props} i18n={i18n!} />
        }</I18nContext.Consumer>;
    };
}