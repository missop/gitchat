import React from 'react';
import './index.less'
import classnames from '@/utils/classnames';

/*高阶组件*/
const ModalBase = (Comp) => {
    return (props) => {
        const {visible = false, cancel, modalWrapperClassName} = props;
        return (
            <div className={classnames('modal-base', visible ? 'showModalBase' : 'hideModalBase')}>
                <div onClick={cancel} className="mask"/>
                <div className={classnames('modalWrapper', modalWrapperClassName)}>
                    {cancel && <span onClick={cancel} className="xIcon">x</span>}
                    <Comp {...props} />
                </div>
            </div>
        )
    }
};

export default ModalBase;
