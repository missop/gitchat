import React, {useState} from 'react';
import './index.less'
import Fuse from 'fuse.js';
import Modal from '@common/modal'
import Toast from '@common/toast'
import Search from '@common/search'
import ListItems from '@/pages/list-items'

const ShareModal = (props) => {
    const [canSearch, changeCanSearch] = useState(false)
    const [contactedItems, setcontactedItems] = useState([])
    const {
        shareModal, showShareModal, homePageList,
        allGroupChats, chatId, userInfo
    } = props;

    /*复制链接*/
    function copyShareLink() {
        const dummy = document.createElement('input');
        const text = `${window.location.origin}${window.location.pathname}`;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        Toast.success('你已复制了邀请链接，可以发给应用外的人啦');
    }

    /*定义底部复制链接按钮*/
    function CustomFooter() {
        return (
            <div className="shareShareLink" onClick={copyShareLink}>
                <svg className="icon shareIcon" aria-hidden="true">
                    <use xlinkHref="#icon-share1"/>
                </svg>
                复制链接分享给应用外的人
            </div>
        )
    }

    /*搜索*/
    function filterOptions() {
        return {
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                'name',
            ]
        };
    }

    function search(key) {
        // console.log(key);
        const stringKey = key.toString();
        if (stringKey.length > 0) {
            /*******
             * Fuse使用说明
             * @param(list(需要搜索的数组),options(搜索条件))
             * 用法:new Fuse(list,options).search(要搜索的值)
             *
             ******/
            const fuse = new Fuse(homePageList, filterOptions);
            const contactedItems = fuse.search(stringKey);
            // console.log(contactedItems);
            changeCanSearch(true);
            setcontactedItems(contactedItems);
        } else {
            changeCanSearch(false);
        }
    }

    // const _chat = new Chat();

    function _clickItemHandle() {
        // _chat.clickItemToShare({chatId, homePageList, userInfo});
    }

    /*渲染组件*/
    function FriendsList() {
        return (
            <>
                <Search
                    search={search}
                    canSearch={canSearch}
                />
                <ListItems
                    clickItem={_clickItemHandle}
                />
            </>

        )
    }

    return (
        <Modal
            style={{textAlign: 'center'}}
            showModal={shareModal}
            title='分享此联系人给'
            content={<FriendsList/>}
            customFooter={<CustomFooter/>}
            afterClose={() => showShareModal(false)}
        >
        </Modal>
    );
};

export default ShareModal;
