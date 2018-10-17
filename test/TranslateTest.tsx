import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {expect} from 'chai';
import {Translate, I18nProvider} from '../src/index';

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
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate message="hello-world"/>
            </I18nProvider>
        );
        expect(result).to.equal("Hello World!");
    });

    it("should translate other languages", () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="fr" translations={translations}>
                <Translate message="hello-world"/>
            </I18nProvider>
        );
        expect(result).to.equal("Bonjour Monde!");
    });

    it("should translate with a tag", () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate typeName="span" message="hello-world"/>
            </I18nProvider>
        );
        expect(result).to.equal("<span>Hello World!</span>");
    });
});
