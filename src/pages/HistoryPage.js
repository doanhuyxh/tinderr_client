import * as React from "react";
import "./HistoryPage.scss"
import {Link} from "react-router-dom";

export default function HistoryPage() {
    return (
        <>
            <div className="nav-bar">
                <Link to="/votingHall" className="nav-bar__left ">
                    <i className="fa-solid fa-chevron-left"></i>
                </Link>
                <div className="nav-bar__content">Lịch sử</div>
            </div>

            <table className="history-table text-center">
                <thead>
                <tr>
                    <th>Phiên</th>
                    <th>Thời gian</th>
                    <th>Tổng cược</th>
                    <th>Tiền thắng/thua</th>
                    <th>Kết quả</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2023071811311</td>
                        <td></td>
                        <td>100000</td>
                        <td>+200000</td>
                        <td>Thắng</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
