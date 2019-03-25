import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import { Translate, I18nProvider } from '../src/index';

const translations = {
    en: {
        'hello-world': 'Hello World!',
        greet: 'Hello {name}',
    },
    fr: {
        'hello-world': 'Bonjour Monde!',
        greet: 'Bonjour {name}',
    },
};

describe('Translate', () => {
    it('should translate a string', () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate message="hello-world" />
            </I18nProvider>
        );
        expect(result).to.equal('Hello World!');
    });

    it('should translate a string with substitutions', () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate message="greet" params={{ name: 'Jason' }} />
            </I18nProvider>
        );
        expect(result).to.equal('Hello Jason');
    });

    it('should translate other languages', () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="fr" translations={translations}>
                <Translate message="hello-world" />
            </I18nProvider>
        );
        expect(result).to.equal('Bonjour Monde!');
    });

    it('should translate with a tag', () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate typeName="span" message="hello-world" />
            </I18nProvider>
        );
        expect(result).to.equal('<span>Hello World!</span>');
    });

    it('should show missing translations', () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate typeName="span" message="i-do-not-exist" />
            </I18nProvider>
        );
        expect(result).to.equal('<span>Untranslated string: i-do-not-exist</span>');
    });

    it('should not show missing translations if ignoreMissing', () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate typeName="span" message="i-do-not-exist" ignoreMissing={true} />
            </I18nProvider>
        );
        expect(result).to.equal('<span></span>');
    });

    it('should translate to an error if no message is supplied', () => {
        const result = ReactDOMServer.renderToStaticMarkup(
            // Wrap our top-level component in an `I18nProvider`
            <I18nProvider language="en" translations={translations}>
                <Translate message="" />
            </I18nProvider>
        );
        expect(result).to.equal('react-i18n-wrapper: No message supplied.');
    });

    it('should error if no I18nProvider', () => {
        expect(() =>
            ReactDOMServer.renderToStaticMarkup(<Translate message="hello-world" />)
        ).to.throw('I18nProvider required');
    });
});
