# i18n tools for React

[![NPM version](https://badge.fury.io/js/react-i18n-wrapper.svg)](https://npmjs.org/package/react-i18n-wrapper)
[![Build Status](https://travis-ci.org/benbria/react-i18n-wrapper.svg)](https://travis-ci.org/benbria/react-i18n-wrapper)
[![Coverage Status](https://coveralls.io/repos/benbria/react-i18n-wrapper/badge.svg)](https://coveralls.io/r/benbria/react-i18n-wrapper)
[![Greenkeeper badge](https://badges.greenkeeper.io/benbria/react-i18n-wrapper.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This library is meant to be used as glue code between React and your favorite
i18n library. You can use it standalone, too.

## Features

-   Compatible with any i18n library.
-   Compatible with isomorphic/server-side rendering.

## Example

```javascript
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { I18nProvider, Translate } from 'react-i18n-wrapper';

const translations = {
    en: {
        'hello-world': 'Hello World!',
    },
    fr: {
        'hello-world': 'Bonjour Monde!',
    },
};

const MyComponent = props => (
    <div>
        <Translate message="hello-world" />
    </div>
);

console.log(
    ReactDOMServer.renderToString(
        // Wrap our top-level component in an `I18nProvider`
        <I18nProvider language="en" translations={translations}>
            <MyComponent />
        </I18nProvider>
    )
);
```

## API

### I18nProvider

Component used to provide i18n context to child components.

Props:

-   `translate({translations, language, message, params})` - A function to call to
    translate a message. If you don't provide `translate()`, a simple default
    implementation is used. See below for details.
-   `translations` - An arbitrary object which will be passed along to your `translate()`
    function. Using the default `translate()` function, this should be an object
    where keys are locales, and values are maps of message keys to translated
    strings.
-   `language` - The locale to translate things into. This is a default and can
    be changed via `useI18n().setLanguage()`.
-   `noEscape` - If true, then all Translate components will behave like
    `noEscape` was set by default.

### Translate

Props:

-   `message` - The message key to translate. This is passed on to your
    `translate()` function.
-   `params` - Parameters to pass on to the `translate()` function. This is an
    arbitrary object.
-   `noEscape` - If true, the translated message will be rendered without escaping
    the result.
-   `tagName` - Controls the element created by Translate. By default,
    `Translate` will return a bare string, setting this will wrap the returned
    value in the specified type. Note that if `noEscape` is true, this will
    default to 'span'.
-   `className` - Class name to add to the generated element. Only used if
    `tagName` is set.

### withI18n

This is a higher order component which provides the `i18n` context object via
props. In most cases, you probably want to use `Translate` to translate
messages, but in some cases you may want to access this directly:

```javascript
import { withI18n } from 'react-i18n-wrapper';

class MyForm extends React.Component {
    render() {
        <textarea placeholder={this.props.i18n.translate('placeholder_text')} />;
    }
}

export default withI18n(MyForm);
```

Here, `this.props.i18n.translate(message, params)` is a function that can
translate a string, and `this.props.i18n.language` is the current locale.

### useI18n

An alternative to `withI18n`, `useI18n` provides a React hook which lets you
call into the translate function directly within your code:

```javascript
import { useI18n } from 'react-i18n-wrapper';

export function MyForm(props) {
    const i18n = useI18n();
    return <textarea placeholder={i18n.translate('placeholder_text')} />;
}
```

### Default translate() function

The default `translate()` function expects `translations` to be an object where
keys are locales, and values are maps of message keys to translated strings. The
default `translate()` can also do some simple substitutions:

```javascript
const translations = {
    en: {
        hello: 'Hello {name}!',
    },
};

const MyComponent = props => <Translate message="hello" params={{ name: 'Jason' }} />;
```

The default `translate()` can also accept a `message` that is an object with
locales as keys:

```javascript
const translateableObject = {
    en: 'here',
    fr: 'ici',
};

const MyComponent = props => <Translate message={translateableObject} />;
```
