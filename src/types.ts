export interface TranslationFunctionParams {
    language: string;
    translations: any;
    message: any;
    params: any;
    ignoreMissing?: boolean;
}
export type TranslateFunction = (params: TranslationFunctionParams) => string;

export interface I18nContextType {
    /**
     * Translates a message.
     *
     * @param message - the message to translate.
     * @param params - a map of strings to values.  For example, if 'name' is
     *   provided as a key of `params`, then '{name}' in the translated string
     *   will be replaced with the value in `params.name`.
     * @returns the translated string.
     */
    translate: (message: any, params?: any, options?: any) => string;
    /**
     * Change the language to use when rendering.
     */
    setLanguage: (language: string) => void;
    language: string;
    noEscape: boolean;
}

export interface WithI18nProps {
    i18n: I18nContextType;
}
