import PropTypes from 'prop-types';
import React from 'react';
import CONTEXT_TYPES from './contextTypes';

const FALLBACK_LANGUAGE = 'en';

/**
 * Returns a translated string.
 * @param {Object} translations - an object where keys are languages (e.g. 'en', 'fr', etc...) and each value is a hash
 *   of keys to translated strings.
 * @param {string|Object} message - either a key into `translations`, or a hash where keys are languages and values are
 *   translated strings.
 * @param {object} params - a map of strings to values.  For example, if 'name' is provided as a key of `params`,
 *   then '{name}' in the translated string will be replaced with the value in `params.name`.
 * @param {string} language - language to translate into.
 * @returns {string} translated string.
 */
function defaultTranslate({translations, message, params, language}) {
    let translation = message[language] ||
        message[FALLBACK_LANGUAGE] ||
        (translations[language] && translations[language][message]) ||
        (translations[FALLBACK_LANGUAGE] && translations[FALLBACK_LANGUAGE][message]) ||
        `Untranslated string: ${message}`;

    if(params) {
        Object.keys(params).forEach(sub => {
            const paramValue = params[sub];
            translation = translation.replace(new RegExp(`{${sub}}`, 'g'), paramValue);
        });
    }

    return translation;
}

/*
 * Higher order component which provides translations and other locale specific data via context.
 * To use, simply wrap your component in an I18nProvider instance:
 *
 *     <I18nProvider lang="en" translations={translations}>...</I18nProvider>
 *
 * where `translations` is an object where keys are languages (e.g. 'en', 'fr', etc...) and each value is a hash
 * of keys to translated strings.
 */
export default class I18nProvider extends React.Component {
    getChildContext() {
        return {
            i18n: {
                language: this.props.language,

                noEscape: this.props.noEscape,

                /**
                 * Translates a string.
                 *
                 * @param {string} message - the key of the string to translate.
                 * @param {object} params - a map of strings to values.  For example, if 'name' is provided as a key of
                 *   `params`, then '{name}' in the translated string will be replaced with the value in `params.name`.
                 * @returns {string} the translated string.
                 */
                translate: (message, params) => {
                    if(!message) {return "react-i18n-wrapper: No message supplied.";}

                    return this.props.translate({
                        translations: this.props.translations,
                        language: this.props.language,
                        message,
                        params
                    });
                }
            }
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

I18nProvider.propTypes = {
    /* Language to translate to.  Will be passed on to `translate`. */
    language: PropTypes.string,

    /* Aribtrary object containing translation data.  If using the default `translate` function, this is a hash where
     * keys are languages (must include `lang` above), and values are in turn hashes where keys are message keys, and
     * values are translations.
     */
    translations: PropTypes.object,

    /* A `translate({translations, language, message, params})` function.  Should return a string.
     */
    translate: PropTypes.func,

    // If true, then all <Translate> tags will not escape by default.
    noEscape: PropTypes.bool,

    children: PropTypes.any
};

I18nProvider.defaultProps = {
    language: "en",
    translations: {},
    translate: defaultTranslate,
    noEscape: false
};

I18nProvider.childContextTypes = CONTEXT_TYPES;
