import React from 'react';
import {
    withRouter,
    Link
} from 'react-router-dom';
import {MyInfo} from './my-info'
import './index.less'

const Tab = (props) => {
    const {pathname} = props.location;
    const showMessageIcon = pathname === '/' || /\/group_chat|\/private_chat|\/robot_chat/.test(pathname);
    return (
        <div className="tabs-wrapper">
            <MyInfo/>
            <div className="tab">
                <Link to="/">
                    <svg className="icon " aria-hidden="true">
                        <use xlinkHref={showMessageIcon ? '#icon-message-copy' : '#icon-message'}/>
                    </svg>
                </Link>
            </div>
            <div className="tab">
                <Link to="/setting">
                    <svg className="icon " aria-hidden="true">
                        <use xlinkHref={pathname === '/setting' ? '#icon-setting-copy' : '#icon-setting'}/>
                    </svg>
                </Link>
            </div>
        </div>
    )
};

export default withRouter(Tab);
