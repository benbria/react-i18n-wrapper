import {expect} from 'chai';
import {I18nProvider} from '../src/index';

describe("I18nProvider", () => {
    describe("defaultTranslate", () => {
        const defaultTranslate = I18nProvider.defaultProps.translate;
        const translations = {
            en: {'test': 'test en'},
            fr: {'test': 'test fr'}
        };

        it('should translate a message', () => {
            expect(defaultTranslate({translations, message: 'test', language: 'en'}), 'en')
            .to.eql('test en');

            expect(defaultTranslate({translations, message: 'test', language: 'fr'}), 'fr')
            .to.eql('test fr');

            // Should fallback to en
            expect(defaultTranslate({translations, message: 'test', language: 'de'}), 'de')
            .to.eql('test en');
        });

        it('should translate an object', () => {
            const message = {
                en: 'boop en',
                fr: 'boop fr'
            };
            expect(defaultTranslate({translations, message, language: 'en'}), 'en')
            .to.eql('boop en');

            expect(defaultTranslate({translations, message, language: 'fr'}), 'fr')
            .to.eql('boop fr');

            // Should fallback to en
            expect(defaultTranslate({translations, message, language: 'de'}), 'de')
            .to.eql('boop en');
        });

        it('should show that an untranslated message is untranslated', () => {
            ['en', 'fr', 'de'].forEach(language =>
                expect(defaultTranslate({translations, message: 'nop', language}), language)
                .to.eql('Untranslated string: nop')
            );
        });

    });
});
