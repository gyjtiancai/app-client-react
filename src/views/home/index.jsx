import React from 'react';
import './index.less';
import { GetNotesList } from "@/request/api";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes:[]
        }
    }
    componentDidMount(){
        this.getNotesList()
    }
    getNotesList = async ()=>{
        console.log('执行')
        const res = await GetNotesList()
        console.log(res)
        this.setState(()=>{
            return {
                notes:res.data
            }
        })        
    }
    render() {
        const {notes} = this.state
        return (
            <div className="home-container">
                <div className="notes-list">
                    <h3>个人笔记</h3>
                    <ul>
                        {notes.map((note) =>
                            (<li key={note.id}>{note.title}</li>)
                        )}
                        
                    </ul>
                </div>
                <div className="notes-types">
                    <h3>笔记分类</h3>
                </div>
            </div>
        )
    }
}
export default Home