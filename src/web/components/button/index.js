import React from 'react'
import PropTypes from 'prop-types'
import './index.less'

export default function Button(props) {
    const {disabled, click, children, type} = props;
    let computedClass = 'com-button';
    const computedMap = {
        disabled: ' button-disabled',
        cancel: 'cancel-button'
    };
    if (disabled) {
        computedClass += computedMap.disabled
    } else if (type === 'cancel') {
        computedClass = computedClass.replace('com-button', computedMap.cancel)
    }
    return (
        <button className={computedClass} onClick={click} disabled={disabled}>{children}</button>
    )
}

Button.propTypes = {
    disabled: PropTypes.bool,
    click: PropTypes.func,
    children: PropTypes.node,
    type: PropTypes.string
};

Button.defaultProps = {
    disabled: false,
    click: () => {
    }
};


