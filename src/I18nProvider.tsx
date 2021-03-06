import React, { useState } from 'react';
import { I18nContext } from './context';
import { defaultTranslate } from './defaultTranslate';
import { I18nContextType, TranslateFunction } from './types';

export { defaultTranslate };

/*
 * Component which provides translations and other locale specific data via context.
 * To use, simply wrap your component in an I18nProvider instance:
 *
 *     <I18nProvider lang="en" translations={translations}>...</I18nProvider>
 *
 * where `translations` is an object where keys are languages (e.g. 'en', 'fr', etc...) and each value is a hash
 * of keys to translated strings.
 */
export default function I18nProvider(props: {
    language: string;
    translations: any;
    noEscape?: boolean;
    translate?: TranslateFunction;
    children: React.ReactNode;
}) {
    const translate = props.translate || defaultTranslate;

    const [language, setLanguage] = useState(props.language);

    const context: I18nContextType = {
        language,
        noEscape: props.noEscape || false,
        setLanguage,
        translate: (message: any, params: any, options?: any) => {
            if (!message) {
                return 'react-i18n-wrapper: No message supplied.';
            }
            return translate(
                Object.assign({}, options || {}, {
                    translations: props.translations,
                    language,
                    message,
                    params,
                })
            );
        },
    };

    return <I18nContext.Provider value={context}>{props.children}</I18nContext.Provider>;
}
