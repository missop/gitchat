import React from 'react'
import Toast from '@common/toast'

export default function () {
    const buttonStyle = {
        margin: '10px 0'
    };
    const buttons = [
        {
            msg: '普通提示',
            event: function () {
                Toast.info('普通提示', 3000)
            },
            style: buttonStyle
        },
        {
            msg: '成功提示',
            event: function () {
                Toast.success('成功提示', 3000)
            },
            style: buttonStyle
        },
        {
            msg: '警告提示',
            event: function () {
                Toast.warning('警告提示', 3000)
            },
            style: buttonStyle
        },
        {
            msg: '错误提示',
            event: function () {
                Toast.error('错误提示', 3000)
            },
            style: buttonStyle
        },
        {
            msg: '加载提示',
            event: function () {
                Toast.loading('加载提示', 3000)
            },
            style: buttonStyle
        }
    ];
    return (
        <div className="page404"
             style={{display: 'flex', paddingTop: '400px', width: '80px', margin: '0 auto', flexDirection: 'column'}}>
            <h2 className="page404-tit"
                style={{position: 'absolute', top: '300px', left: '50%', transform: 'translate(-50%,0)'}}>😊 Not Found
                😊</h2>
            {
                buttons.map(button => (
                    <button key={button.msg} style={button.style} onClick={button.event}>{button.msg}</button>
                ))
            }
        </div>
    )
}
