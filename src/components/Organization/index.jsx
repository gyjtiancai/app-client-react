import React from "react";
import "./style.less";
import { Modal, Input, Tree } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { removeRepeat } from '@/utils';
import DeptIcon from './images/dept.png';
import PostIcon from './images/post.png';
class Organization extends React.Component {
    constructor(props) {
        super(props)
        //备份成员集合用于搜索
        this.memberList = []
        //备份树
        this.tree = []
        //渲染
        this.state = {
            //选择模式：1.部门-成员  3.部门-岗位
            activeTab: 1,
            //搜索关键词
            keyword: "",
            //组织架构树
            treeData: [
                {
                    title: '0-0',
                    key: '0-0',
                    children: [
                        {
                            title: '0-0-0',
                            key: '0-0-0',
                            children: [
                                { title: '0-0-0-0', key: '0-0-0-0' },
                                { title: '0-0-0-1', key: '0-0-0-1' },
                                { title: '0-0-0-2', key: '0-0-0-2' },
                            ],
                        },
                        {
                            title: '0-0-1',
                            key: '0-0-1',
                            children: [
                                { title: '0-0-1-0', key: '0-0-1-0' },
                                { title: '0-0-1-1', key: '0-0-1-1' },
                                { title: '0-0-1-2', key: '0-0-1-2' },
                            ],
                        },
                        {
                            title: '0-0-2',
                            key: '0-0-2',
                        },
                    ],
                },
                {
                    title: '0-1',
                    key: '0-1',
                    children: [
                        { title: '0-1-0-0', key: '0-1-0-0' },
                        { title: '0-1-0-1', key: '0-1-0-1' },
                        { title: '0-1-0-2', key: '0-1-0-2' },
                    ],
                },
                {
                    title: '0-2',
                    key: '0-2',
                },
            ],
            //展开的节点
            expandedKeys:[],
            //右侧已选成员集合
            checkedList: [],
            //左侧复选框选中key集合
            checkedKeys: [],
        }
    }
    //组件实例创建时
    componentDidMount = () => {
        console.log("挂载",this.props)
        const { activeTab, checkedList } = this.props
        this.tree = this.spliceDeptMemberTree()
        const checkedIds = checkedList.map(checked => checked.id)
        const checkedMembers = this.memberList.filter(member => checkedIds.includes(member.id))
        const checkedKeys = checkedMembers.map(checkedMember => checkedMember.key)
        let checkedList_removeRepeat = removeRepeat(checkedMembers, 'id');
        this.setState(()=>{
            return {
                keyword: "",
                activeTab: activeTab,
                treeData: activeTab === 1 ? this.spliceDeptMemberTree() : this.spliceDeptPostTree(),
                checkedKeys: activeTab === 1 ?checkedKeys:checkedList.map(checked => checked.id),
                expandedKeys: activeTab === 1 ? this.spliceDeptMemberTree().map(v=>v.key) : this.spliceDeptPostTree().map(v=>v.key),
                checkedList: activeTab === 1 ?checkedList_removeRepeat : checkedList.map(checked=>{
                    return {
                        id:checked.id,
                        name:checked.name,
                        key:checked.id,
                        title:checked.name,
                    }
                })
            }
        })
    }
    //监听父组件props变化
    componentDidUpdate = (props, state) => {
        console.log('触发更新', props, state)
    }
    static getDerivedStateFromProps = (props, state) => {
        return null
    }
    //组件实例销毁时
    componentWillUnmount() {
        console.log('销毁')
    }
    //关闭组织架构弹框
    handleCancel = () => {
        this.props.changeModalVisible(false)
    };
    //确认组织架构选择
    handleConfirm = () => {
        this.props.onConfirm(this.state.checkedList)
    }
    //切换组织架构选择模式
    changeTab = (tab) => {
        if (this.state.activeTab === tab) {
            return;
        }
        this.setState({
            keyword: "",
            treeData: tab === 1 ? this.spliceDeptMemberTree() : this.spliceDeptPostTree(),
            activeTab: tab,
            checkedList: [],
            checkedKeys: [],
        })
    }
    //组装部门-成员树
    spliceDeptMemberTree = () => {
        const memberList = this.props.memberList.map(member => {
            return {
                active: member.active,
                deptIdList: member.deptIdList,
                id: member.id,
                name: member.name,
                key: member.id,
                title: member.name,
                profilePicture: member.profilePicture,
                disabled: this.props.disabledList.includes(member.id) ? true : false  //禁用
            }
        })
        const departmentList = this.props.departmentList.map(dept => {
            return {
                id: dept.id,
                name: dept.name,
                key: dept.id,
                title: dept.name,
                parentId: dept.parentId,
                positions: dept.positions,
                children: [],
                disabled: this.props.multipleChoice ? false : true  //禁用
            }
        })
        this.memberList = []
        let list = [];
        departmentList.forEach((department) => {
            departmentList.forEach((child) => {
                //排部门父子结构
                if (child.parentId === department.id) {
                    child.key = `${department.key}_${child.id}`
                    department.children.push(child);
                }
            });
            if (!department.parentId) {
                //顶级部门
                list.push(department);
            }
        });
        memberList.forEach((member) => {
            let memberNew = null
            //没有所属部门的成员
            if (!member.deptIdList) {
                memberNew = JSON.parse(JSON.stringify(member))
                memberNew.key = memberNew.id
                list.unshift(member);
                this.memberList.push(member)
            } else {
                departmentList.forEach((department) => {
                    if (member.deptIdList.includes(department.id)) {
                        memberNew = JSON.parse(JSON.stringify(member))
                        memberNew.key = `${department.key}_${memberNew.id}`
                        department.children.unshift(memberNew)
                        this.memberList.push(memberNew)
                    }
                })
            }
        });
        return list
    }
    //组装部门-岗位树
    spliceDeptPostTree = () => {
        const departmentList = this.props.departmentList.map(dept => {
            return {
                id: dept.id,
                name: dept.name,
                parentId: dept.parentId,
                key: dept.id,
                title: dept.name,
                children: dept.positions.map((post) => {
                    return {
                        id: post.id,
                        name: post.name,
                        key: `${dept.id}-${post.id}`,
                        title: `${dept.name}-${post.name}`,
                        disabled: false  //禁用
                    };
                }),
                disabled: this.props.multipleChoice ? false : true  //禁用
            }
        })
        let list = [];
        departmentList.forEach((dept) => {
            if (!dept.parentId) {
                //顶级部门
                list.push(dept);
            }
            departmentList.forEach((child) => {
                if (child.parentId === dept.id) {
                    dept.children.push(child);
                }
            });
        });
        return list
    }
    //展开收缩节点
    onExpand = (expandedKeys, {expanded: bool, node})=> {
        this.setState((state, props) => {
            return {
                expandedKeys:expandedKeys
            }
        })
    }
    //搜索成员
    onSearch = (e) => {
        let data = null
        if (e.target.value) {
            //搜索后未去重的成员集合
            let members = this.memberList.filter(member => member.title.includes(e.target.value))
            for (let i = members.length - 1; i >= 0; i--) {
                for (let checked of this.state.checkedList) {
                    if (checked.id === members[i].id && checked.key !== members[i].key) {
                        members.splice(i, 1)
                    }
                }
            }
            data = removeRepeat(members, 'id')
        } else {
            data = JSON.parse(JSON.stringify(this.tree))
        }
        this.setState((state, props) => {
            return {
                keyword: e.target.value,
                treeData: data,
            }
        })
    }
    //选择节点
    onCheck = (checkedKeys, { checked, checkedNodes, node, event, halfCheckedKeys }) => {
        //如果是单选模式
        if (!this.props.multipleChoice) {
            this.setState((state, props) => {
                return {
                    checkedList: checked ? [node] : [],
                    checkedKeys: checked ? [node.key] : []
                }
            })
        } else {
            //非搜索状态下
            if (!this.state.keyword) {
                const checkedList_new = checkedNodes.filter(checked => !checked.children)
                //对多个部门下的同一个成员去重
                let checkedList_removeRepeat = removeRepeat(checkedList_new, 'id');
                this.setState((state, props) => {
                    return {
                        checkedList: this.state.activeTab === 1 ? checkedList_removeRepeat : checkedList_new,
                        checkedKeys: checkedKeys
                    }
                })
            } else {
                let checkedMemberList = []
                let checkedKeyList = []
                if (checked) {
                    checkedMemberList = this.state.checkedList.concat([node])
                    checkedKeyList = this.state.checkedKeys.concat([node.key])
                } else {
                    checkedMemberList = this.state.checkedList.filter(member => member.key !== node.key)
                    //不同部门下重复成员的key集合
                    const sameMemberKeys = this.state.checkedKeys.filter(checkedKey => checkedKey.includes(node.id))
                    //所有跟该成员相关的部门和重复成员的key集合（未去重）
                    const clearKeys = []
                    this.state.checkedKeys.forEach(checkedKey => {
                        sameMemberKeys.forEach(memberKey => {
                            if (memberKey.includes(checkedKey)) {
                                clearKeys.push(checkedKey)
                            }
                        })
                    })
                    //所有跟该成员相关的部门和重复成员的key集合（去重后）
                    checkedKeyList = this.state.checkedKeys.filter(checkedKey => ![...new Set(clearKeys)].includes(checkedKey))
                }
                this.setState((state, props) => {
                    return {
                        checkedList: checkedMemberList,
                        checkedKeys: checkedKeyList
                    }
                })
            }
        }

    }
    //删除某个已选对象
    delChecked = (checked, index) => {
        //不同部门下重复成员的key集合
        const sameMemberKeys = this.state.checkedKeys.filter(checkedKey => checkedKey.includes(checked.id))
        //所有跟该成员相关的部门和重复成员的key集合（未去重）
        const clearKeys = []
        this.state.checkedKeys.forEach(checkedKey => {
            sameMemberKeys.forEach(memberKey => {
                if (memberKey.includes(checkedKey)) {
                    clearKeys.push(checkedKey)
                }
            })
        })
        this.setState((state, props) => ({
            checkedList: state.checkedList.filter((checked, sno) => sno !== index),
            checkedKeys: state.checkedKeys.filter(checkedKey => ![...new Set(clearKeys)].includes(checkedKey))
        }))
    }
    render() {
        const { modalVisible } = this.props
        const { activeTab, keyword, treeData, checkedKeys, expandedKeys, checkedList } = this.state
        return (
            <Modal
                title="组织架构"
                visible={modalVisible}
                maskClosable={false}
                keyboard={false}
                destroyOnClose={true}
                onCancel={this.handleCancel}
                onOk={this.handleConfirm}>
                <div className="modal-container">
                    <div className="container-tree">
                        <div className="tree-search">
                            <Input onChange={this.onSearch} value={keyword} prefix={<SearchOutlined />} disabled={activeTab === 3} placeholder="请输入关键词" />
                        </div>
                        <div className="tree-tabs">
                            <div className={`tab-option ${activeTab === 1 ? 'tab-active' : ''}`} onClick={() => this.changeTab(1)}>按部门-成员</div>
                            {/* <div className="tab-option">按部门</div> */}
                            <div className={`tab-option ${activeTab === 3 ? 'tab-active' : ''}`} onClick={() => this.changeTab(3)}>按部门-岗位</div>
                        </div>
                        <div className="tree-nodes">
                            <Tree
                                checkable
                                expandedKeys={expandedKeys}
                                onExpand={this.onExpand}
                                onCheck={this.onCheck}
                                treeData={treeData}
                                checkedKeys={checkedKeys}
                                titleRender={(nodeData) => {
                                    if (activeTab === 1) {
                                        return (
                                            <div className="tree-node-custom">
                                                {nodeData.children ? null : <img className="member-icon" src="https://dl-yiyunappclient.effio.cn/resource/common/avatar.png" alt="" />}
                                                <div className="node-name">{nodeData.title}</div>
                                            </div>
                                        )
                                    }
                                    if (activeTab === 3) {
                                        return (
                                            <div className="tree-node-custom">
                                                {nodeData.children ? <img className="dept-icon" src={DeptIcon} alt="" /> : <img className="post-icon" src={PostIcon} alt="" />}
                                                <div className="node-name">{nodeData.children ?nodeData.title.split('-')[0]:nodeData.title.split('-')[1]}</div>
                                            </div>
                                        )
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="container-checked">
                        <div className="checked-tip">已选：{checkedList.length}个</div>
                        <div className="checked-options">
                            {checkedList.map((checked, index) =>
                            (
                                <div className="checked-option" key={checked.key}>
                                    <div
                                        className="option-member"
                                    >
                                        <p className="option-member-name">{activeTab === 1 ? checked.title : checked.title}</p>
                                        <div className="opiton-member-close" onClick={() => this.delChecked(checked, index)}>+</div>
                                    </div>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default Organization