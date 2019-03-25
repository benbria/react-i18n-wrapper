import { expect } from 'chai';
import { defaultTranslate } from '../src/I18nProvider';

describe('I18nProvider', () => {
    describe('defaultTranslate', () => {
        const translations = {
            en: {
                test: 'test en',
                hello: 'Hello {name}',
            },
            fr: {
                test: 'test fr',
                hello: 'Bonjour {name}',
            },
        };

        it('should translate a message', () => {
            expect(
                defaultTranslate({ translations, message: 'test', language: 'en', params: {} }),
                'en'
            ).to.eql('test en');

            expect(
                defaultTranslate({ translations, message: 'test', language: 'fr', params: {} }),
                'fr'
            ).to.eql('test fr');

            // Should fallback to en
            expect(
                defaultTranslate({ translations, message: 'test', language: 'de', params: {} }),
                'de'
            ).to.eql('test en');
        });

        it('should translate a message with substitutions', () => {
            expect(
                defaultTranslate({
                    translations,
                    message: 'hello',
                    language: 'en',
                    params: { name: 'Jason' },
                }),
                'en'
            ).to.eql('Hello Jason');

            expect(
                defaultTranslate({
                    translations,
                    message: 'hello',
                    language: 'fr',
                    params: { name: 'Jason' },
                }),
                'fr'
            ).to.eql('Bonjour Jason');
        });

        it('should translate a message', () => {
            expect(
                defaultTranslate({ translations, message: 'test', language: 'en', params: {} }),
                'en'
            ).to.eql('test en');

            expect(
                defaultTranslate({ translations, message: 'test', language: 'fr', params: {} }),
                'fr'
            ).to.eql('test fr');

            // Should fallback to en
            expect(
                defaultTranslate({ translations, message: 'test', language: 'de', params: {} }),
                'de'
            ).to.eql('test en');
        });

        it('should translate an object', () => {
            const message = {
                en: 'boop en',
                fr: 'boop fr',
            };
            expect(
                defaultTranslate({ translations, message, language: 'en', params: {} }),
                'en'
            ).to.eql('boop en');

            expect(
                defaultTranslate({ translations, message, language: 'fr', params: {} }),
                'fr'
            ).to.eql('boop fr');

            // Should fallback to en
            expect(
                defaultTranslate({ translations, message, language: 'de', params: {} }),
                'de'
            ).to.eql('boop en');
        });

        it('should show that an untranslated message is untranslated', () => {
            ['en', 'fr', 'de'].forEach(language =>
                expect(
                    defaultTranslate({ translations, message: 'nop', language, params: {} }),
                    language
                ).to.eql('Untranslated string: nop')
            );
        });

        it('should not show that an untranslated message is untranslated if ignoreMissing is true', () => {
            ['en', 'fr', 'de'].forEach(language =>
                expect(
                    defaultTranslate({
                        translations,
                        message: 'nop',
                        language,
                        params: {},
                        ignoreMissing: true,
                    }),
                    language
                ).to.eql('')
            );
        });
    });
});
