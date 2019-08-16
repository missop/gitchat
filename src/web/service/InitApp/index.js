import io from 'socket.io-client';
import * as service from '../index'
import BrowserNotification from '../BrowserNotification';
import Chat from "../../../../ghChat/src/modules/Chat";

class InitApp {
    constructor(props) {
        this.WEBSITE_ADDRESS = process.env.NODE_ENV === 'production' ? service.WEBSITE_ADDRESS_PROD
            : service.WEBSITE_ADDRESS_DEV;
        this._userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this._hasCalledMe = false;
        this._browserNotification = new BrowserNotification();
        // this._chat = new Chat();
        this._history = props.history;
    }

    _browserNotificationHandle = data => {

    }
}
