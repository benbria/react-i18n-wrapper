import { TranslateFunction } from './types';

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
export const defaultTranslate: TranslateFunction = ({
    translations,
    message,
    params,
    language,
    ignoreMissing,
}) => {
    let translation: string;
    if (typeof message === 'string') {
        translation =
            (translations[language] && translations[language][message]) ||
            (translations[FALLBACK_LANGUAGE] && translations[FALLBACK_LANGUAGE][message]);
    } else {
        translation = message[language] || message[FALLBACK_LANGUAGE];
    }
    translation =
        translation !== undefined
            ? translation
            : (!ignoreMissing && `Untranslated string: ${message}`) || '';

    if (params) {
        Object.keys(params).forEach(sub => {
            const paramValue = params[sub];
            translation = translation.replace(new RegExp(`{${sub}}`, 'g'), paramValue);
        });
    }

    return translation;
};
