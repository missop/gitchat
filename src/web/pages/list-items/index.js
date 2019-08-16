import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import './index.less'
import classnames from 'classnames';
import UserAvatar from '@common/user-avatar';
import GroupAvatar from "@common/group-avatar";
import {toNormalTime} from "@/utils/transformTime";

const ListItems = (props) => {
    const {
        dataList, allGroupChats, match,
        showRobot, isSearching, showAsContacts
    } = props;

    /*****_clickItem
     * 点击用户头像或者群后跳转至聊天窗口
     * @param({chatFromId, isGroupChat})
     * chatFromId:to_group_id||user_id
     * *****/
    function _clickItem({chatFromId, isGroupChat}) {
        /*调用父组件的clickItem方法*/
        props.clickItem(chatFromId);
        const chatUrl = isGroupChat ? `/group_chat/${chatFromId}` : `/private_chat/${chatFromId}`;
        props.history.push(chatUrl);
    }

    /*机器人头像组件*/
    const robotChat = (
        <li
            key="-1"
            style={props.match.path === '/robot_chat' ? {backgroundColor: '#f5f5f5'} : {}}
        >
            <Link to="/robot_chat" className="robotItem">
                <UserAvatar
                    name="机器人小R"
                    size="46"/>
                <div className="content">
            <span className="title robotTitle">
              机器人小R
            </span>
                </div>
            </Link>
        </li>
    );

    /*******
     * 好友及群列表组件
     * 点击跳转相应的聊天页面_clickItem
     * 显示头像（群头像还是个人头像）
     * 未读消息条数
     * 最新消息时间
     * 有人@我或者邀请卡片之类的特殊标记
     * ********/
    const listItems = dataList && dataList.map((data, index) => {
        // 是否需要显示邀请卡片
        let message = data.message;
        const isShareUrl = message && /::share::{"/.test(message);
        if (isShareUrl) {
            message = '[邀请卡片]';
        }

        // 获取chatFromId
        const chatFromId = data.to_group_id || (data.user_id && data.user_id.toString());
        const isGroupChat = !!data.to_group_id;
        let GroupMembers;
        if (isGroupChat) {
            const chatItem = allGroupChats && allGroupChats.get(data.to_group_id);
            GroupMembers = chatItem && chatItem.groupInfo && chatItem.groupInfo.members;
        }

        // 未读消息
        const {params} = match;
        const unreadColor = data.to_group_id ? 'groupUnread' : 'privateUnread';
        let unreadCircular;
        switch (data.unread && (data.unread).toString().length) {
            case 2:
                unreadCircular = 'twoDigitsUnread';
                break;
            case 3:
                unreadCircular = 'threeDigitsUnread';
                break;
            default:
                unreadCircular = 'oneDigitUnread';
        }

        return (
            <li
                key={index}
                style={!showAsContacts && (params.user_id || params.to_group_id) === chatFromId ? {backgroundColor: '#f5f5f5'} : {}}
                onClick={() => _clickItem({chatFromId, isGroupChat})}
                value={chatFromId}>
                {isGroupChat
                    ? <GroupAvatar members={GroupMembers || []}/>
                    : <UserAvatar src={data.avatar} name={data.name} size="46" showLogo={!!data.github_id}/>}

                {!!data.unread && !showAsContacts && (
                    <span className={classnames(unreadColor, unreadCircular)}>
              {data.unread > 99 ? '99+' : data.unread}
            </span>
                )}

                <div className="content">
                    <div className="title">
                        <p className="name">{data.name}</p>
                        {!showAsContacts
                        && (
                            <span className="time">{!!data.time && toNormalTime(data.time)}</span>
                        )}
                    </div>
                    {!showAsContacts
                    && (
                        <div className="message">
                            {data.showCallMeTip && <span className="callMe">[有人@我]</span>}
                            {message || '暂无消息'}
                        </div>
                    )}
                </div>
            </li>
        )
    });

    return (
        <ul className="homePageList">
            {showRobot && !isSearching && robotChat}
            {listItems}
        </ul>
    );
};

export default withRouter(ListItems);

ListItems.propTypes = {
    allGroupChats: PropTypes.instanceOf(Map),
    dataList: PropTypes.array,
    showRobot: PropTypes.bool,
    clickItem: PropTypes.func,
    match: PropTypes.object.isRequired,
    isSearching: PropTypes.bool,
    showAsContacts: PropTypes.bool
};

ListItems.defaultProps = {
    allGroupChats: new Map(),
    dataList: [],
    showRobot: false,
    clickItem() {
    },
    isSearching: false,
    showAsContacts: false
};
