import React from 'react';
import './index.less';
import { GetNotes, CollectNotes } from "@/request/api";
import { LikeOutlined } from '@ant-design/icons';
import { message, Spin, Pagination } from 'antd';
import Calendar from './calendar.jsx'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            isShowLoading: false,
        }
    }
    componentDidMount() {
        this.getNotesList()
    }
    getNotesList = async () => {
        const res = await GetNotes()
        console.log(res)
        this.setState(() => {
            return {
                notes: res.data,
            }
        })
    }
    async likeNote() {
        this.setState(() => {
            return {
                isShowLoading: true
            }
        })
        await CollectNotes({
            id:1
        })
        setTimeout(() => {
            this.setState(() => {
                return {
                    isShowLoading: false
                }
            })
            message.success('点赞成功');
        }, 1000)
    }
    render() {
        const { notes, isShowLoading } = this.state
        return (
            <div className="app-home">
                <Spin tip="Loading..." spinning={isShowLoading} className={`loading ${isShowLoading ? '' : 'is-hide'}`}>

                </Spin>
                {/* <div className="app-home-tools">
                    <input className="tools-search" type="text" maxLength="20" placeholder="搜索" />
                </div> */}
                <div className="app-home-notes">
                    <Calendar></Calendar>
                    <div className="notes-container">
                        {notes.map((note) => {
                            return (<div className="note-option" key={note.id}>
                                <img className="note-option-image" src={note.image} alt="" />
                                <div className="note-option-introduction">
                                    <p className="introduction-title">{note.title}<LikeOutlined className="good-icon" onClick={() => this.likeNote()} /></p>
                                    <div className="introduction-description">{note.description}</div>
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
export default Home