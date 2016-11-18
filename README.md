i18n tools for React
--------------------

This library is meant to be used as glue code between React and your favorite i18n library.  You can use it standalone,
too.

Features
========

* Compatible with any i18n library.
* Compatible with isomorphic/server-side rendering.

Example
=======

```javascript
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {I18nProvider, Translate} from 'react-i18n-wrapper';

const translations = {
    en: {
        "hello-world": "Hello World!"
    },
    fr: {
        "hello-world": "Bonjour Monde!"
    }
};

const MyComponent = (props) => (<div>
        <Translate message="hello-world"/>
    </div>);

console.log(ReactDOMServer.renderToString(
    // Wrap our top-level component in an `I18nProvider`
    <I18nProvider language="en" translations={translations}>
        <MyComponent/>
    </I18nProvider>
));

```

API
---

I18nProvider
============

Higher-order component used to provide i18n context to child components.

Props:
* `translate({translations, language, message, params})` - A function to call to translate a message.  If you don't
  provide `translate()`, a simple default implementation is used.  See below for details.
* `translations` - An arbitrary object which will be passed along to your `translate()` function.  Using the default
  `translate()` function, this should be an object where keys are locales, and values are maps of message keys to
  translated strings.
* `language` - The locale to translate things into.

This provides the `i18n` context object.  In most cases, you probably want to use `Translate` to translate messages,
but in some cases you may want to access this directly:

```javascript
import {CONTEXT_TYPES} from 'react-i18n-wrapper';

class MyForm extends React.Component {
    render() {
        <textarea placeholder={this.context.i18n.translate("placeholder_text")}/>
    }
}

MyForm.contextTypes = CONTEXT_TYPES;
```

Context:
* `i18n.translate(message, params)` - Translate a string.
* `i18n.language` - The current locale.

Translate
=========

Props:
* `message` - The message key to translate. This is passed on to your `translate()` function.
* `params` - Parameters to pass on to the `translate()` function.
* `noEscape` - If true, the translated message will be rendered without escaping the result.
* `typeName` - Controls the element created by Translate.  By default, `Translate` will render as a `<span>` element.
* `className` - Class name to add to the generated element.

Default translate() function
============================

The default `translate()` function expects `translations` to be an object where keys are locales, and values are maps
of message keys to translated strings.  The default `translate()` can also do some simple substitutions:

```javascript
const translations = {
    en: {
        "hello": "Hello {name}!"
    }
}

const MyComponent = props => <Translate message="hello" params={{name: "Jason"}}/>
```

The default `translate()` can also accept a `message` that is an object with locales as keys:

```javascript
const translateableObject = {
    en: "here",
    fr: "ici"
}

const MyComponent = props => <Translate message={translateableObject}/>
```
