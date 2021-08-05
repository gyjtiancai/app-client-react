import React from 'react';
import './index.less';
import Organization from "@/components/Organization/index.jsx";
import { Button } from 'antd'
import {dayjs} from '@/plugins';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.departmentList = [];
        this.memberList = [];
        this.checkedList = [{ id: '1211841814905937920-1211842032510623744', name: '前端-部门经理' }];
        // this.checkedList = [{id:'1214479701862023168',name:'李诗瑜'}];
        this.disabledList = ['1178593554835001344'];
        this.multipleChoice = true;
        this.activeTab = 3;
        this.state = { modalVisible: false };
    }
    changeModalVisible = (isShow) => {
        this.departmentList = [{ "positions": [{ "id": "1211842032510623744", "name": "部门经理" }, { "id": "1211842067340124160", "name": "助理" }, { "id": "1211842118133145600", "name": "高级工程师" }, { "id": "1211842158138417152", "name": "中级工程师" }], "id": "1211841814905937920", "name": "前端", "parentId": "" }, { "positions": [{ "id": "1211842032510623744", "name": "部门经理" }, { "id": "1211842118133145600", "name": "高级工程师" }, { "id": "1211842158138417152", "name": "中级工程师" }], "id": "1211841850901454848", "name": "后端", "parentId": "" }, { "positions": [{ "id": "1211842032510623744", "name": "部门经理" }, { "id": "1211842118133145600", "name": "高级工程师" }, { "id": "1211842158138417152", "name": "中级工程师" }], "id": "1211841869964566528", "name": "测试", "parentId": "" }, { "positions": [{ "id": "1211842032510623744", "name": "部门经理" }, { "id": "1211842118133145600", "name": "高级工程师" }], "id": "1211841888960569344", "name": "ui", "parentId": "" }, { "positions": [], "id": "1211841925199355904", "name": "产品", "parentId": "" }, { "positions": [{ "id": "1211842032510623744", "name": "部门经理" }], "id": "1214479916065128448", "name": "销售", "parentId": "1211841925199355904" }, { "positions": [{ "id": "1211842067340124160", "name": "助理" }, { "id": "1211842118133145600", "name": "高级工程师" }], "id": "42Q4ZjeVjao", "name": "后端1", "parentId": "1211841850901454848" }, { "positions": [{ "id": "1211842067340124160", "name": "助理" }], "id": "42Q7dAt4q5H", "name": "后端2", "parentId": "42Q4ZjeVjao" }, { "positions": [{ "id": "1211842032510623744", "name": "部门经理" }], "id": "42Q7e6ZnKh1", "name": "后端3", "parentId": "42Q7dAt4q5H" }, { "positions": [{ "id": "1211842067340124160", "name": "助理" }], "id": "42Q7vD9i5bM", "name": "后端4", "parentId": "42Q7e6ZnKh1" }, { "positions": [{ "id": "1211842032510623744", "name": "部门经理" }, { "id": "1211842158138417152", "name": "中级工程师" }], "id": "42Q7xZmutrT", "name": "后端5", "parentId": "42Q7vD9i5bM" }, { "positions": [], "id": "47cqNy5au19", "name": "前端", "parentId": "1211841814905937920" }, { "positions": [{ "id": "1211842118133145600", "name": "高级工程师" }], "id": "47dBQoPWJF9", "name": "后端5", "parentId": "42Q4ZjeVjao" }]
        this.memberList = [{ "id": "1178593554835001344", "name": "王东浩", "profilePicture": "", "active": true, "deptIdList": ["1211841850901454848"] }, { "id": "1214479701862023168", "name": "李诗瑜", "profilePicture": "https://dl-platform.effio.cn/1214708162554937344/user-head/133571917231583739623418.png", "active": true, "deptIdList": ["1211841814905937920", "42Q7xZmutrT", "42Q4ZjeVjao", "47dBQoPWJF9", "1211841869964566528"] }, { "id": "3q5TCzakAGo", "name": "卢奇峰", "profilePicture": "https://dl-platform.effio.cn/user-head/132919499901547548161838.jpeg", "active": true, "deptIdList": ["42Q4ZjeVjao"] }, { "id": "3rbrT78FZYT", "name": "钟超", "profilePicture": "https://dl-platform.effio.cn/3geFfAPn4mM/user-head/135808002901572240468200.jpg", "active": true, "deptIdList": ["1211841814905937920"] }, { "id": "3rr5B7hdypT", "name": "李琪", "profilePicture": "", "active": true, "deptIdList": ["1211841869964566528"] }, { "id": "3rwe3y6berK", "name": "李姜侠", "profilePicture": "https://dl-platform.effio.cn/3hjcSriafM9/user-head/9a6c021a-dc77-45ff-baf6-ab130f5a355b.jpg", "active": true, "deptIdList": ["1211841814905937920"] }, { "id": "3sHRBhg6F2P", "name": "叶丹", "profilePicture": "", "active": true, "deptIdList": ["1211841888960569344"] }, { "id": "3sLP7bNgKnX", "name": "员工C1", "profilePicture": "https://dl-platform.effio.cn/3sLNrqNJUBy/user-head/a9aa371b-bbc0-481b-b59a-4ea220ba6c50.jpg", "active": true, "deptIdList": ["1211841814905937920"] }, { "id": "3sLQC8LCJvK", "name": "小李的测试账号2", "profilePicture": "", "active": true, "deptIdList": ["1211841850901454848"] }, { "id": "3sLXki4LTNF", "name": "小迪", "profilePicture": "", "active": true, "deptIdList": ["1211841850901454848"] }, { "id": "3sXXRhnzzdV", "name": "葛宇杰", "profilePicture": "https://dl-platform.effio.cn/6f5fd011-4dee-42c5-b6ce-3dba3b0209bd/user-head/178558276421571880647742.jpg", "active": true, "deptIdList": ["1211841869964566528"] }, { "id": "3sXes3J6iAT", "name": "顾静微", "profilePicture": "https://dl-platform.effio.cn/e184a940-12d6-44b7-906f-556ef1180654/user-head/ab67f1c4-091e-403a-a989-b4e75dd1b1a3.jpg", "active": true, "deptIdList": ["1211841850901454848"] }, { "id": "3siEAoJu49M", "name": "牟皋", "profilePicture": "https://dl-platform.effio.cn/95cd1c79-2681-40a6-b652-7a69a5cd17f6/user-head/180742054111569741307285.jpg", "active": true, "deptIdList": ["1211841850901454848"] }, { "id": "3t1LJwYvVip", "name": "陈素云", "profilePicture": "", "active": true, "deptIdList": ["42Q7vD9i5bM"] }, { "id": "3t1LJwYvVis", "name": "毛海华", "profilePicture": "", "active": true, "deptIdList": ["42Q7xZmutrT"] }, { "id": "3t1LJwYvViy", "name": "方赛娟", "profilePicture": "", "active": true, "deptIdList": ["42Q7dAt4q5H"] }, { "id": "3t1LJwZHzXs", "name": "李玉英", "profilePicture": "", "active": true, "deptIdList": ["42Q7e6ZnKh1"] }, { "id": "3u2i7Y8xVCj", "name": "zqp", "profilePicture": "https://dl-platform.effio.cn/84217038-aa79-4bb8-a499-5dd0fc7ef06b/user-head/137384615141574997944474.gif", "active": true, "deptIdList": ["1211841850901454848"] }, { "id": "3ucoQs6eKsD", "name": "刘鑫", "profilePicture": "https://dl-platform.effio.cn/3ucoGEE1GKZ/user-head/70f9c204-a6f3-4061-8530-9ae2971111ce.jpg", "active": true, "deptIdList": ["1211841869964566528"] }, { "id": "3x1R9bE6GET", "name": "打发", "profilePicture": "", "active": true, "deptIdList": ["1211841888960569344"] }, { "id": "3xe9sJKohNo", "name": "八零", "profilePicture": "https://dl-platform.effio.cn/aaa13799999980/user-head/ba498041-9f3d-4749-af1d-a60de370a030.jpg", "active": true, "deptIdList": ["1211841850901454848"] }, { "id": "3y5kpMb59wd", "name": "任世浩", "profilePicture": "https://dl-platform.effio.cn/3y5kDGXcsMy/user-head/e1ba510d-9cd4-4381-9d9a-50665f1c7666.jpg", "active": true, "deptIdList": ["1211841814905937920"] }, { "id": "4363XhWCb1q", "name": "王一文", "profilePicture": "", "active": true, "deptIdList": ["1214479916065128448"] }]
        // this.checkedList = [{ "id": "1214479701862023168", "name": "李诗瑜", "profilePicture": "https://dl-platform.effio.cn/1214708162554937344/user-head/133571917231583739623418.png", "active": true, "deptIdList": ["1211841814905937920", "42Q7xZmutrT", "42Q4ZjeVjao", "47dBQoPWJF9", "1211841869964566528"] }]
        this.setState((state, props) => {
            console.log(isShow)
            return {
                modalVisible: isShow
            }
        })
    }
    confirm = (checkedList) => {
        console.log('已选列表', checkedList)
        this.checkedList = checkedList.map(checked => {
            return {
                id: this.activeTab === 1 ? checked.id : checked.key,
                name: this.activeTab === 1 ? checked.name : checked.title
            }
        })
        this.setState((state, props) => {
            return {
                modalVisible: false
            }
        })
    }
    stop = (e)=>  {
        console.log(e)
        e.stopPropagation()
        this.props.history.push({pathname:'/two',query:{id:2}})
    }
    render() {
        console.log(dayjs.duration(1000))
        console.log(this.props.history)
        return (
            <div className="container-main">
                <pre onClick={()=>this.props.history.push({pathname:'/two',query:{id:1}})}>
                    <p onClick={this.stop}>dayjs：</p>
                    {`${dayjs(Date.now())}\n`}
                    format：<br/>
                    {`${dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')}\n`}
                    {`${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}\n`}
                    time from now：<br/>
                    {`${dayjs('2020-05-01').fromNow()}\n`}
                    {`${dayjs('2020-05-01').fromNow(true)}\n`}
                    {`${dayjs(Date.now() - 3600*1000).fromNow()}\n`}
                    {`${dayjs(Date.now()+3600*1000).fromNow()}\n`}
                    diff：<br/>
                    {`${dayjs('2021-7-30').diff('2020-07-30','d')}\n`}
                    duration：<br/>
                    {`${JSON.stringify(dayjs.duration(1000).$d)}\n`}
                </pre>

                <Button type="primary" onClick={() => this.changeModalVisible(true)}>openModal</Button>
                {this.state.modalVisible?<Organization
                    modalVisible={this.state.modalVisible}
                    departmentList={this.departmentList}
                    memberList={this.memberList}
                    checkedList={this.checkedList}
                    disabledList={this.disabledList}
                    multipleChoice={this.multipleChoice}
                    activeTab={this.activeTab}
                    changeModalVisible={this.changeModalVisible}
                    onConfirm={this.confirm}
                ></Organization>:null}
            </div>
        )
    }
}
export default Home