import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class MyQuiz extends Component {

    constructor() {
        super();
        this.state = {
            no: "",
            id: "",
            nick: "",
            email: "",
            myRooms: [],
        }
    }

    componentDidMount() {
        if (!sessionStorage.getItem('id')) {
            window.location.replace("/login");
        } else {
            this.getUserByID(sessionStorage.getItem('id'))
        }
    }

    getUserByID = (member_id) => {
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/byid/${member_id}`, {
            id: member_id
        }).then(res => {
            // console.log(res)
            this.setState({
                no: res.data.member_no,
                id: res.data.id,
                nick: res.data.nick,
                email: res.data.email,
            })
            this.getRoomsByMemberNo(res.data.member_no)
        })
    }

    getRoomsByMemberNo(member_no) {
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/room/room_memberno`, {
            params: {
                no: member_no,
            }
        }).then(res => {
            // console.log(res)
            this.setState({ myRooms: res.data })
        }).catch(err => {
            // console.log(err)
        })
    }

    logout = () => {
        window.sessionStorage.clear();
        window.location.replace("/");
    }

    render() {
        return (
            <div className="myPageContent">
                <div className="wrapContent">
                    <div className="header rec_header">
                        <Link to="/" className="btn logo">

                        </Link>
                        <Link to="/game/goGame" className="btn goGame">
                            <span>Go Game</span>
                        </Link>
                        {sessionStorage.getItem('id') ?
                            <a onClick={this.logout} className="btn login" style={{ cursor: "pointer" }}>????????????</a>
                            :
                            <Link to="/login" className="btn login">
                                ?????????
                        </Link>
                        }
                    </div>
                    <div className="sideMenu">
                        <img className="profile" src="./img/profileSample.png" />
                        <div className="idWrap">
                            {sessionStorage.getItem('id')} / {sessionStorage.getItem('nick')}
                        </div>
                        <div className="sideMenuWrap">
                            <Link to="/myquiz" className="sideMenuLink onLink">
                                FunFun ??????
                            </Link>
                            <Link to="/mypage" className="sideMenuLink">
                                Profile
                            </Link>
                            <Link to="/game/makeQuiz" className="sideMenuLink">
                                ?????? ?????????
                            </Link>
                        </div>
                    </div>
                    <div className="mainContent">
                        <div className="quizWrap">
                            <div className="quizList">
                                <label className="scrollAlert">??? ?????????????????? ???????????? ??? ??? ????????????.</label>

                                {this.state.myRooms.map((room, index) => (
                                    (
                                        <Link to={{
                                            pathname: `./admin/game/playQuiz`,
                                            state: {
                                                code: room.code,
                                                nickname: this.state.nick,
                                            }
                                        }}>
                                            {room.quiz_cnt ?
                                            <div className="quizLists" >
                                                <div className="quizData">
                                                    <div className="quizTitle">
                                                        {room.quiz_title}
                                                    </div>
                                                    <div className="quizDetail">
                                                        <span className="quizCnt">{room.quiz_cnt}?????? / </span>
                                                        <span className="quizDate">{room.quiz_date} / </span>
                                                        <span className="quizRoomCode">?????? {room.code} </span>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                            }
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyQuiz