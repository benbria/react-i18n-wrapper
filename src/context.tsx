import React from 'react';
import { I18nContextType } from './types';

// tslint:disable-next-line variable-name
export const I18nContext = React.createContext<I18nContextType>({
    translate: () => {
        throw new Error('I18nProvider required');
    },
    setLanguage: () => {
        throw new Error('I18nProvider required');
    },
    language: 'en',
    noEscape: false,
});
