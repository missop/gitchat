import React from 'react';

export default function Notice(props) {
    const icons = {
        info: 'icon-info-circle-fill',
        success: 'icon-check-circle-fill',
        warning: 'icon-warning-circle-fill',
        error: 'icon-close-circle-fill',
        loading: 'icon-loading'
    }
    const {type, content} = props
    return (
        <div className={`toast-notice ${type}`}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref={`#${icons[type]}`}/>
            </svg>
            <span>{content}</span>
        </div>
    )
}
