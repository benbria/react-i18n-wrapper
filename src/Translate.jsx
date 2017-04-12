import PropTypes from 'prop-types';
import React from 'react';
import CONTEXT_TYPES from './contextTypes';

const isUndefined = x => typeof x === "undefined" || x === null;

/*
 * Renders a translatable string.
 */
export default function Translate(props, context) {
    if(!context.i18n) {throw new Error("I18nProvider required");}

    let message = context.i18n.translate(props.message, props.params);

    let noEscape = props.noEscape || (context.i18n.noEscape && (props.noEscape || isUndefined(props.noEscape)));

    // Pass through extra props to child element.
    let childProps = {};
    Object.keys(props).forEach(key => {
        if(Translate.propTypes[key]) {
            // Ignore
        } else {
            childProps[key] = props[key];
        }
    });

    if(noEscape) {
        return React.createElement(props.typeName, Object.assign(childProps, {
            dangerouslySetInnerHTML: {__html: message}
        }));
    } else {
        return React.createElement(props.typeName, childProps, message);
    }
}

Translate.contextTypes = CONTEXT_TYPES;

Translate.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string, PropTypes.object
    ]).isRequired,
    params: PropTypes.object,
    noEscape: PropTypes.bool,
    typeName: PropTypes.string
};

Translate.defaultProps = {
    params: {},
    typeName: 'span'
};
