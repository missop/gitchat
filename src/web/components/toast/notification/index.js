import React, {Component} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Notice from '../notice'

class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {notices: []}
        this.transitionTime = 300
        this.maxLen = 4
        this.removeNotice = this.removeNotice.bind(this)
    }

    getNoticeKey() {
        const {notices} = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }

    addNotice(notice) {
        const {notices} = this.state
        notice.key = this.getNoticeKey()
        if (notices.every(item => item.key !== notice.key)) {
            if (notices.length >= this.maxLen) {
                notices.shift()
            }
            notices.push(notice)
            this.setState({notices})
            if (notice.duration > 0) {
                setTimeout(() => {
                    this.removeNotice(notice.key)
                }, notice.duration)
            }
        }
        return () => {
            this.removeNotice(notice.key)
        }
    }

    removeNotice(key) {
        this.setState(previousState => ({
            notices: previousState.notices.filter(notice => {
                /*删除的元素return false，就会被过滤掉*/
                if (notice.key === key) {
                    if (notice.onClose) notice.onClose()
                    return false
                }
                return true
            })
        }))
    }

    render() {
        const {notices} = this.state
        return (
            <TransitionGroup className="toast-notification">
                {
                    notices.map(notice => (
                        <CSSTransition key={notice.key}
                                       classNames="toast-notice-wrapper notice"
                                       timeout={this.transitionTime}>
                            <Notice {...notice} />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        );
    }
}

export default Notification
