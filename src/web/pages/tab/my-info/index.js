import React, {useState} from 'react';
import UserAvatar from "@common/user-avatar";
import PersonalInfo from "@/pages/personal-info";
import ShareModal from '@/pages/share-modal'
import './index.less'

export const MyInfo = (props) => {
    /*personalInfo的显示*/
    const [personalInfoVisible, setVisible] = useState(false);
    /*分享弹层的显示*/
    const [shareModal, setShowShareModal] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {name} = userInfo;

    /*隐藏和显示personalInfo的动画优化*/
    function showPersonalInfo() {
        setVisible(true);
        setShowShareModal(false);
    }

    function hidePersonalInfo() {
        setVisible(false);
    }

    function toggleShareModal(shouldShow = true) {
        setShowShareModal(shouldShow);
        shouldShow && setVisible(false);
    }

    return (
        <div className='myInfo'>
            <UserAvatar
                name={name}
                clickAvatar={showPersonalInfo}
                size="36"/>
            <PersonalInfo
                userInfo={userInfo}
                visible={personalInfoVisible}
                hideModal={hidePersonalInfo}
                showShareModal={toggleShareModal}
                showShareIcon={true}
                showContactButton={false}
            />
            <ShareModal
                shareModal={shareModal}
                showShareModal={toggleShareModal}
                homePageList={[]}
            />
        </div>
    );
};
