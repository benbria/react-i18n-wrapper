import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {expect} from 'chai';
import {withTranslate, I18nProvider, I18nContextType} from '../src/index';

const translations = {
    en: {
        "hello-world": "Hello World!"
    },
    fr: {
        "hello-world": "Bonjour Monde!"
    }
};

describe("Translate", () => {
    it("should translate a string", () => {
        function Component(props: {
            i18n: I18nContextType;
        }) {
            return props.i18n.translate('hello-world');
        }

        const withTranslateComponent = withTranslate(Component);

        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                { React.createElement(withTranslateComponent) }
            </I18nProvider>
        );
        expect(result).to.equal("Hello World!");
    });
});
