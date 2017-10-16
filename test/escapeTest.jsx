import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {expect} from 'chai';
import {Translate, I18nProvider} from '../src/index';

const translations = {
    en: {
        "hello-world": "<h1>Test</h1>"
    }
};

describe("Escaping", () => {
    it("should escape a string", () => {
        let result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate message="hello-world"/>
            </I18nProvider>
        );
        expect(result).to.equal("&lt;h1&gt;Test&lt;/h1&gt;");
    });

    it("should not escape a string with noEscape", () => {
        let result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate message="hello-world" noEscape/>
            </I18nProvider>
        );
        expect(result).to.equal("<span><h1>Test</h1></span>");
    });

    it("should not escape a string if I18nProvider has noEscape", () => {
        let result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations} noEscape>
                <Translate message="hello-world"/>
            </I18nProvider>
        );
        expect(result).to.equal("<span><h1>Test</h1></span>");
    });

    it("should escape a string if I18nProvider has noEscape but Translate has noEscape=false", () => {
        let result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations} noEscape>
                <Translate message="hello-world" noEscape={false}/>
            </I18nProvider>
        );
        expect(result).to.equal("&lt;h1&gt;Test&lt;/h1&gt;");
    });
});
