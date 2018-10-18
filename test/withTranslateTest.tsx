import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {expect} from 'chai';
import {withI18n, I18nProvider, I18nContextType} from '../src/index';

const translations = {
    en: {
        "hello-world": "Hello World!"
    },
    fr: {
        "hello-world": "Bonjour Monde!"
    }
};

describe("withI18n", () => {
    it("should translate a string", () => {
        function Component(props: {
            i18n: I18nContextType;
        }) {
            return props.i18n.translate('hello-world');
        }

        const withI18nComponent = withI18n(Component);

        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                { React.createElement(withI18nComponent) }
            </I18nProvider>
        );
        expect(result).to.equal("Hello World!");
    });
});
