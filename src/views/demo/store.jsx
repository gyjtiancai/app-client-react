import React, { useState, useEffect } from 'react';
import store from '@/store'
import { connect } from 'react-redux'
import { sleep } from '@/utils'
import { Button } from 'antd'
import './style.less';
async function set() {
    await sleep(1000)
    store.dispatch({
        type: 'setUserInfo',
        data: { name: '亦云', code: 315502 }
    })
}
function PageTwo(props) {
    console.log('props', props)
    console.log('store', store)
    const [count, setCount] = useState(0)

    //更新store视图方法一
    const [user, setUser] = useState(props.userInfo)
    store.subscribe(() => {
        console.log('subscribe', store.getState())
        setUser(store.getState().common.userInfo)
    })
    //hook副作用
    useEffect(() => {
        console.log('useEffect', count)
    })

    return (
        <div>
            {`hook:${count}`}<br /><br />
            {`store视图一:${JSON.stringify(user)}`}<br /><br />
            {`store视图二:${JSON.stringify(props.userInfo)}`}<br /><br />
            <Button type="primary" onClick={() => set()}>
                change store
            </Button><br /><br />
            <Button type="primary" onClick={() => setCount(count + 1)}>
                hook
            </Button>
        </div>
    )
}
// export default PageTwo

//更新store视图方法二
function mapStateToProps(state) {
    return {
        userInfo: state.common.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // setStore: dispatch({
        //     type: 'setUserInfo',
        //     data: { name: 'geyujie', age: 26 }
        // })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageTwo)