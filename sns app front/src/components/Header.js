import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">SNS Project</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/profile">프로필</Link></li>
                    <li><Link to="/login">로그인</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;