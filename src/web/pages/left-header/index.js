import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/modal'
import Search from '@common/search'
import './index.less'

const LeftHeader = (props) => {
    const [showGroupModal, changeShowGroupModal] = useState(false);
    const _userInfo = JSON.parse(localStorage.getItem('userInfo'));

    function confirm({groupName, groupNotice}) {
        changeShowGroupModal(false);
        createGroup({groupName, groupNotice});
    }

    /*创建群组*/
    function createGroup({groupName, groupNotice}) {
        const {name, user_id} = _userInfo;
        const data = {
            name: groupName,
            group_notice: groupNotice,
            creator_id: user_id,
            create_time: Date.parse(new Date()) / 1000
        };
        window.socket.emit('createGroup', data, res => {
            /*这些方法是通过redux拿到的*/
            const {addGroupMessageAndInfo, updateHomePageList, homePageList, allGroupChats} = props;
            const members = [{
                user_id,
                name,
                status: 1
            }];
            const groupInfo = Object.assign({members}, res);
            res.message = `${name}: 创建群成功！`;
            res.time = res.create_time;
            res.from_user = res.creator_id;
            updateHomePageList({data: res, homePageList});
            addGroupMessageAndInfo({
                allGroupChats, message: {...res, name}, groupId: res.to_group_id, groupInfo
            });
            props.history.push(`/group_chat/${res.to_group_id}`);
        })
    }

    function openModal() {
        changeShowGroupModal(true);
    }

    function cancel() {
        changeShowGroupModal(false);
    }

    const {isSearching, searchFieldChange} = props;

    function ModalInput() {
        const [groupName, changeGroupName] = useState('');
        const [groupNotice, changeGroupNotice] = useState('');
        return (
            <div className="groupModalContent">
                <div className="pb20">
                    <span>群名:</span>
                    <input
                        name="groupName"
                        value={groupName}
                        onChange={(e) => changeGroupName(e.target.value)}
                        type="text"
                        placeholder="不超过12个字哦"
                        maxLength="12"/>
                </div>
                <div className="pb10">
                    <span>群公告:</span>
                    <textarea
                        name="groupNotice"
                        value={groupNotice}
                        onChange={(e) => changeGroupNotice(e.target.value)}
                        rows="3"
                        placeholder="不超过60个字哦"
                        maxLength="60"/>
                </div>
            </div>
        )
    }

    return (
        <div className="header-wrapper">
            <Search
                search={searchFieldChange}
                canSearch={isSearching}
            />
            <span className="add" onClick={openModal}>
                <svg className="icon" aria-hidden="true"><use xlinkHref="#icon-add"/></svg>
            </span>
            <Modal
                title="创建群组"
                showModal={showGroupModal}
                content={<ModalInput/>}
                afterConfirm={confirm}
                afterClose={cancel}
            />
        </div>
    );
};

export default LeftHeader;

LeftHeader.propTypes = {
    isSearching: PropTypes.bool,
    searchFieldChange: PropTypes.func,
    homePageList: PropTypes.array,
    allGroupChats: PropTypes.object,
    addGroupMessageAndInfo: PropTypes.func
};

LeftHeader.defaultProps = {
    isSearching: false,
    searchFieldChange: () => {
    },
    homePageList: [],
    allGroupChats: new Map(),
    addGroupMessageAndInfo: () => {
    }
};
