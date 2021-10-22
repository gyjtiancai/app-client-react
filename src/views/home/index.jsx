import React from 'react';
import { connect } from 'react-redux'
import './index.less';
// import { GetNotes, CollectNotes } from "@/request/api";
import { LikeOutlined } from '@ant-design/icons';
import { message, Spin, Pagination } from 'antd';
import Calendar from './calendar.jsx'
import reactImage from "./images/react.png"
import vueImage from "./images/vue.png"
import nodeImage from "./images/node.png"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                { id: 1, title: 'React JS', image: reactImage, ENdescription:'Content to be filled。。。',CNdescription: '内容待填充。。。', createTime: Date.now() },
                { id: 2, title: 'Vue JS', image: vueImage,  ENdescription:'Content to be filled。。。',CNdescription: '内容待填充。。。', createTime: Date.now() },
                { id: 3, title: 'Node JS', image: nodeImage,  ENdescription:'Content to be filled。。。',CNdescription: '内容待填充。。。', createTime: Date.now() }
            ],
            isShowLoading: false,
        }
    }
    async likeNote() {
        const { currentLanguage } = this.props
        this.setState(() => {
            return {
                isShowLoading: true
            }
        })
        setTimeout(() => {
            this.setState(() => {
                return {
                    isShowLoading: false
                }
            })
            message.success(`${currentLanguage==='CN'?'点赞成功':'Like success'}`);
        }, 1000)
    }
    render() {
        const { currentLanguage } = this.props
        const { notes, isShowLoading } = this.state
        return (
            <div className="app-home">
                <Spin tip={currentLanguage === 'CN' ?"加载中...":"Loading..."} spinning={isShowLoading} className={`loading ${isShowLoading ? 'is-show' : 'is-hide'}`}>

                </Spin>
                {/* <div className="app-home-tools">
                    <input className="tools-search" type="text" maxLength="20" placeholder="搜索" />
                </div> */}
                <div className="app-home-title">{currentLanguage === 'CN' ? '个人笔记' : 'personal notes'}</div>
                <div className="app-home-notes">
                    <Calendar></Calendar>
                    <div className="notes-container">
                        {notes.map((note) => {
                            return (<div className="note-option" key={note.id}>
                                <img className="note-option-image" src={note.image} alt="" />
                                <div className="note-option-introduction">
                                    <p className="introduction-title">{note.title}<LikeOutlined className="good-icon" onClick={() => this.likeNote()} /></p>
                                    <div className="introduction-description">{currentLanguage === 'CN' ?note.CNdescription:note.ENdescription}</div>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
                <div className="app-home-pagination">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentLanguage: state.common.currentLanguage
    }
}

export default connect(
    mapStateToProps,
)(Home)
// export default Home