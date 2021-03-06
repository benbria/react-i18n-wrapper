import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import { withI18n, I18nProvider, I18nContextType } from '../src/index';

const translations = {
    en: {
        'hello-world': 'Hello World!',
    },
    fr: {
        'hello-world': 'Bonjour Monde!',
    },
};

describe('withI18n', () => {
    it('should translate a string', () => {
        function Component(props: { i18n: I18nContextType }) {
            return <div>{props.i18n.translate('hello-world')}</div>;
        }

        const WithI18nComponent = withI18n(Component); // tslint:disable-line variable-name

        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <WithI18nComponent />
            </I18nProvider>
        );
        expect(result).to.equal('<div>Hello World!</div>');
    });

    it('should be typesafe for wrapped props', () => {
        function Component(props: { i18n: I18nContextType; name: string }) {
            return (
                <div>
                    {props.i18n.translate('hello-world')}, {props.name}
                </div>
            );
        }

        const WithI18nComponent = withI18n(Component); // tslint:disable-line variable-name

        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <WithI18nComponent name="Jason" />
            </I18nProvider>
        );
        expect(result).to.equal('<div>Hello World!, Jason</div>');
    });
});
