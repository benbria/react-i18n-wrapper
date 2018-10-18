import React from 'react';
import { I18nContext } from "./context";

export default function withI18n(child: any) {
    return function TranslateComponent(props: any) {
        return <I18nContext.Consumer>{
            i18n => React.createElement(child, Object.assign({}, props, { i18n }))
        }</I18nContext.Consumer>;
    };
}