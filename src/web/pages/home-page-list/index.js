import React, {useState, useEffect} from 'react';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {FILTEROPTIONS} from '@/constants'
import {withRouter} from 'react-router-dom';
import ListItems from '../list-items'
import LeftHeader from '@/containers/leftheader-wrap'
import './index.less';

const HomePageList = (props) => {
    /*  constructor start   */
    const [isSearching, changeSearching] = useState(false);
    const [contactedItems, changeContactedItems] = useState([]);
    const [showSearchUser, changeShowSearchUser] = useState(true);
    const [showSearchGroup, changeShowSearchGroup] = useState(true);
    const [searchResultTitle, changeSearchResultTitle] = useState({
        user: '您联系过的用户',
        group: '您联系过的群组'
    });
    const {homePageList, allGroupChats} = props;
    // const _chat = new Chat();
    let _filedStr = null, _cleanedUnread = false, _initApp = null;

    function _cleanUnreadWhenReload() {
        // const {homePageList} = props;
        const chatFromId = window.location.pathname.split(/^\/\S+_chat\//)[1];
        const goal = homePageList.filter(e => chatFromId && (chatFromId === e.to_group_id || chatFromId === (
                e.user_id && e.user_id.toString())
        ))[0];
        if (goal && goal.unread !== 0) {
            // _chat
            _cleanedUnread = true;
        }
    }

    function searchFieldChange(field) {
        _filedStr = field.toString();
        /* setState */
        changeShowSearchUser(true);
        changeShowSearchGroup(true);
        changeSearchResultTitle({
            user: '您联系过的用户',
            group: '您联系过的群组'
        });
        /* setState */
        if (_filedStr.length > 0) {
            // const {homePageList} = props;
            const homePageListCopy = [...List(homePageList)];
            const fuse = new Fuse(homePageListCopy, FILTEROPTIONS);
            const contactedItems = fuse.search(_filedStr);
            changeSearching(true);
            changeContactedItems(contactedItems);
        } else {
            changeSearching(false);
        }
    }

    function searchInDB({searchUser}) {
        window.socket.emit('fuzzyMatch', {field: _filedStr, searchUser}, data => {
            if (data.searchUser) {
                changeShowSearchUser(false);
                // useState如何拿到之前的state,当setState是一个函数的时候
                changeSearchResultTitle({...searchResultTitle, user: '所有用户'});
                data.fuzzyMatchResult.forEach((element) => {
                    element.user_id = element.id;
                });
            } else {
                changeShowSearchGroup(false);
                changeSearchResultTitle({...searchResultTitle, user: '所有群组'});
            }
            changeContactedItems({contactedItems: [...contactedItems, ...data.fuzzyMatchResult]});
        })
    }

    function clickItemHandle({homePageList, chatFromId}) {
        isSearching && changeSearching(false);
        // _chat
        // clear [有人@我] [@Me]
        props.showCallMeTip({homePageList, chatFromId, showCallMeTip: false});
    }

    /*  constructor end */

    /* componentWillMount  componentDidUpdate */
    if (!props.initializedApp) {
        // _initApp = null;
    }
    useEffect(() => {
        if (_cleanedUnread || !props.initializedApp) return;
        _cleanUnreadWhenReload();
    });
    /*  end */

    homePageList.sort((a, b) => b.time - a.time);
    const _userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const contactedUsers = contactedItems.filter(e => (e.user_id && e.user_id !== _userInfo.user_id));
    const contactedGroups = contactedItems.filter(e => e.to_group_id);
    /*公用的一些组件*/
    const ListItemsWithParams = (
        <ListItems
            isSearching={isSearching}
            dataList={contactedUsers}
            allGroupChats={allGroupChats}
            clickItem={chatFromId => this.clickItemHandle({homePageList, chatFromId})}
        />
    );
    const noData = (<p className="search-none">暂无</p>);

    return (
        <div className="home-page-list-wrapper">
            <LeftHeader
                isSearching={isSearching}
                searchFieldChange={field => searchFieldChange(field)}
            />
            {
                isSearching ? (
                    <div className="searchResult">
                        <p className="searchResultTitle">{searchResultTitle.user}</p>
                        {
                            contactedUsers.length ? ListItemsWithParams : noData
                        }
                        {
                            showSearchUser && (
                                <p
                                    className="clickToSearch"
                                    onClick={() => searchInDB({searchUser: true})}>
                                    网络查找相关的用户
                                </p>
                            )
                        }
                        <p className="searchResultTitle">{searchResultTitle.group}</p>
                        {
                            contactedGroups.length ? ListItemsWithParams : noData
                        }
                        {
                            showSearchGroup && (
                                <p
                                    className="clickToSearch"
                                    onClick={() => searchInDB({searchUser: false})}>
                                    网络查找相关的群组
                                </p>
                            )
                        }
                    </div>
                ) : (
                    <ListItems
                        dataList={homePageList}
                        allGroupChats={allGroupChats}
                        clickItem={chatFromId => clickItemHandle({homePageList, chatFromId})}
                    />
                )
            }
        </div>
    );
};

export default withRouter(HomePageList);

HomePageList.propTypes = {
    allGroupChats: PropTypes.instanceOf(Map),
    homePageList: PropTypes.array,
    showCallMeTip: PropTypes.func,
    initializedApp: PropTypes.bool,
    initApp: PropTypes.func
};

HomePageList.defaultProps = {
    allGroupChats: new Map(),
    homePageList: [],
    showCallMeTip() {
    },
    initializedApp: false,
    initApp() {
    },
};
