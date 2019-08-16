import Toast from '@/components/Toast'

/****
 *
 * BrowserNotification
 * @description
 * 全局消息通知
 * @param()
 *  _notificationEnable(是否开启)
 *  permission(判断浏览器是否支持)
 *  notify(对外暴露的接口--window.notification)
 *
 * ******/
export default class BrowserNotification {

    constructor() {
        this._notificationEnable = false;
        this._checkOrRequirePermission();
    }

    _checkOrRequirePermission() {
        if (!this.notification) {
            // eslint-disable-next-line no-alert
            Toast.warn('此浏览器不支持浏览器提示');
            return;
        }
        if (this.hasPermission) {
            this._notificationEnable = true;
            return;
        }
        if (this.permission && this.permission !== 'denied') {
            this.notification.requestPermission((status) => {
                if (this.permission !== status) {
                    this.permission = status;
                }
                if (status === 'granted') {
                    this._notificationEnable = true;
                }
            });
        }
    }

    notify({title, text, icon, onClick, audio}) {
        if (!this._notificationEnable) {
            return;
        }
        const n = new window.Notification(title, {body: text, icon});
        n.onclick = () => {
            onClick();
            n.close();
        };
        this._onPlay(audio);
    }

    _onPlay(src) {
        let audio = document.createElement("audio");
        audio.setAttribute('src', src);
        audio.play();
    }

    get permission() {
        return this.notification.permission;
    }

    set permission(value) {
        if (value) {
            this.notification.permission = value;
        }
    }

    get hasPermission() {
        return this.permission && (this.permission === 'granted');
    }

    get notification() {
        return window.Notification;
    }
}
