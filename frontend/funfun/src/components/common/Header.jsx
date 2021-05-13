import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom"

class Header extends Component {

    logout = () => {
        window.sessionStorage.clear();
        window.location.replace("/");
    }

    render() {
        return (
            <div className="header">
                <Link to="/" className="btn logo">

                </Link>
                <Link to="/game/goGame" className="btn goGame">
                    <span>Go Game</span>
                </Link>
                {sessionStorage.getItem('id') ?
                    <div className="loginWraps">
                        <a onClick={this.logout} className="btn login" href="">로그아웃</a>
                        <Link to="/mypage" className="btn login">
                            마이 페이지
                        </Link>
                    </div>
                    :
                    <Link to="/login" className="btn login">
                        로그인
                    </Link>
                }
            </div>
        );
    }
}

export default Header;