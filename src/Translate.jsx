import React from 'react';
import CONTEXT_TYPES from './contextTypes';

/*
 * Renders a translatable string.
 */
export default function Translate(props, context) {
    if(!context.i18n) {throw new Error("I18nProvider required");}

    let message = context.i18n.translate(props.message, props.params);

    if(props.noEscape) {
        return React.createElement(props.typeName, {
            className: props.className,
            dangerouslySetInnerHTML: {__html: message}
        });
    } else {
        return React.createElement(props.typeName, {className: props.className}, message);
    }
}

Translate.contextTypes = CONTEXT_TYPES;

Translate.propTypes = {
    message: React.PropTypes.oneOfType([
        React.PropTypes.string, React.PropTypes.object
    ]).isRequired,
    params: React.PropTypes.object,
    className: React.PropTypes.string,
    noEscape: React.PropTypes.bool,
    typeName: React.PropTypes.string
};

Translate.defaultProps = {
    params: {},
    typeName: 'span',
    noEscape: false
};
