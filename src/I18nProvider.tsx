import React from 'react';
import { TranslateFunction } from './types';
import { I18nContext } from './context';

const FALLBACK_LANGUAGE = 'en';

/**
 * Returns a translated string.
 * @param translations - an object where keys are languages (e.g. 'en', 'fr', etc...) and each value is a hash
 *   of keys to translated strings.
 * @param message - either a key into `translations`, or a hash where keys are languages and values are
 *   translated strings.
 * @param params - a map of strings to values.  For example, if 'name' is provided as a key of `params`,
 *   then '{name}' in the translated string will be replaced with the value in `params.name`.
 * @param language - language to translate into.
 * @param [ignoreMissing] - enable this flag to prevent showing an error when the
 *   translation is missing in target and fallback languages (returns nothing instead).
 * @returns translated string.
 */
export function defaultTranslate({ translations, message, params, language, ignoreMissing }: {
    translations: { [locale: string]: { [message: string]: string } };
    message: string | { [locale: string]: string };
    params: { [key: string]: string };
    language: string;
    ignoreMissing?: boolean;
}): string {
    let translation: string;
    if(typeof (message) === 'string') {
        translation = (translations[language] && translations[language][message]) ||
            (translations[FALLBACK_LANGUAGE] && translations[FALLBACK_LANGUAGE][message]);
    } else {
        translation = message[language] || (message[FALLBACK_LANGUAGE]);
    }
    translation = translation || (!ignoreMissing && `Untranslated string: ${message}`) || '';

    if(params) {
        Object.keys(params).forEach(sub => {
            const paramValue = params[sub];
            translation = translation.replace(new RegExp(`{${sub}}`, 'g'), paramValue);
        });
    }

    return translation;
}

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

    return <I18nContext.Provider value={{
        language: props.language,
        noEscape: props.noEscape || false,
        translate: (message:any, params:any, options?:any) => {
            if (!message) { return "react-i18n-wrapper: No message supplied."; }
            return translate(Object.assign({}, options || {}, {
                translations: props.translations,
                language: props.language,
                message,
                params
            }));
        }
    }}>
        { props.children }
    </I18nContext.Provider>;
}
