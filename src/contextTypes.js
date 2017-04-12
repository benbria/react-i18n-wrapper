import PropTypes from 'prop-types';

export default {
    i18n: PropTypes.shape({
        translate: PropTypes.func.isRequired,
        language: PropTypes.string.isRequired,
        noEscape: PropTypes.bool.isRequired
    }).isRequired
};
