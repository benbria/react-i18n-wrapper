import React from 'react';

export default {
    i18n: React.PropTypes.shape({
        translate: React.PropTypes.func.isRequired,
        language: React.PropTypes.string.isRequired,
        noEscape: React.PropTypes.bool.isRequired
    }).isRequired
};
