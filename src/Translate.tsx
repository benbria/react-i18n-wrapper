import React from 'react';
import { I18nContext } from './context';

const isUndefined = (x: any) => typeof x === "undefined" || x === null;

/*
 * Renders a translatable string.
 */
export default function Translate(props : {
    message: any;
    params?: any;
    noEscape?: boolean;
    typeName?: string;
    tagName?: string;
    [key: string]: any;
}) {
    return <I18nContext.Consumer>{
        i18n => {
            if(!i18n) {throw new Error("I18nProvider required");}

            const { message, params, noEscape, typeName, tagName, ...childProps } = props;

            const tagType = tagName || typeName || undefined;
            const translated = i18n.translate(props.message, props.params || {});

            if(isUndefined(props.noEscape) ? i18n.noEscape : props.noEscape) {
                return React.createElement(tagType || 'span',
                    Object.assign(childProps, {
                        dangerouslySetInnerHTML: {__html: translated}
                    })
                );
            } else if(tagType) {
                return React.createElement(tagType, childProps, translated);
            } else {
                return translated;
            }
        }
    }</I18nContext.Consumer>;
}