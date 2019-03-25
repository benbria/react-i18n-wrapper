import React from 'react';
import { I18nContext } from './context';

/**
 * Hook function which returns an i18n instance.
 */
export default function useI18n() {
    return React.useContext(I18nContext);
}
