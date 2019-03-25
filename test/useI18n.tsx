import { expect } from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { I18nProvider, useI18n } from '../src/index';

const translations = {
    en: {
        'hello-world': 'Hello World!',
    },
    fr: {
        'hello-world': 'Bonjour Monde!',
    },
};

describe('useI18n', () => {
    it('should translate a string', () => {
        function Component() {
            const i18n = useI18n();
            return <div>{i18n.translate('hello-world')}</div>;
        }

        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Component />
            </I18nProvider>
        );
        expect(result).to.equal('<div>Hello World!</div>');
    });
});
