import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'
import './index.less'

export default function Modal(props) {
    const {showModal, afterConfirm, afterClose, title, content, customFooter} = props;
    const computedModalClass = showModal ? 'modal-fixed on' : 'modal-fixed';
    return (
        <div className={computedModalClass}>
            <div className="modal" style={{width: '400px'}}>
                <button className='modal-close' onClick={afterClose}>
                    <span className="modal-close_x">
                        <i className="anticon">
                             <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em"
                                  height="1em" fill="currentColor" aria-hidden="true">
                            <path
                                d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                            </path>
                        </svg>
                        </i>
                    </span>
                </button>
                <div className="modal-header">
                    <h2 className='modal-title'>{title}</h2>
                </div>
                <div className="modal-main">
                    <div className="modal-content">{content}</div>
                </div>
                {
                    customFooter || (
                        <div className="modal-footer">
                            <p className="modal-right">
                                <Button click={afterConfirm}>确认</Button>
                                <Button click={afterClose} type='cancel'>取消</Button>
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    showModal: PropTypes.bool,
    content: PropTypes.node,
    customFooter: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    afterConfirm: PropTypes.func,
    afterClose: PropTypes.func,
};

Modal.defaultProps = {
    title: '',
    showModal: false,
    content: '',
    afterConfirm: () => {
    },
    afterClose: () => {
    },
};
