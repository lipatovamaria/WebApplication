import React from "react";
import UserContext from "../context/UserContext";

class Bmi extends React.Component<any, any> {
    static contextType = UserContext;

    render() {
        let currentUser = this.context.user
        if(currentUser == null) {
            document.location.href="/auth";
        }
        return <>
            <div className="container-fluid">
                <div className="row" style={{height: '130px'}}>
                    <h1>Индекс массы тела</h1>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <p className="text">Для определения индекса массы тела воспользуйтесь формулой: I=m/(h^2), где m -
                        это масса в килограммах, h - это рост в метрах</p>
                </div>
                <div className="row">
                    <table className="table">
                        <tbody>
                        <tr style={{textAlign: "center"}}>
                            <td colSpan={2}>Таблица индекса массы тела</td>
                        </tr>
                        <tr>
                            <th>Индекс массы тела</th>
                            <th>Физическое состояние</th>
                        </tr>
                        <tr>
                            <td>Менее 18.0</td>
                            <td>Недостаток веса II степени</td>
                        </tr>
                        <tr>
                            <td>18.1-20.0</td>
                            <td>Недостаток веса I степени</td>
                        </tr>
                        <tr>
                            <td>20.1-25.0</td>
                            <td>Нормальный вес</td>
                        </tr>
                        <tr>
                            <td>25.1-27.0</td>
                            <td>Лишний вес</td>
                        </tr>
                        <tr>
                            <td>27.1-30.0</td>
                            <td>Ожирение веса I степени</td>
                        </tr>
                        <tr>
                            <td>30.1-35.0</td>
                            <td>Ожирение веса II степени</td>
                        </tr>
                        <tr>
                            <td>Более 35.0</td>
                            <td>Ожирение веса III степени</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p className="text">
                        Таблицу индекса массы тела Вы можете скачать
                        <a href="/bmi_table.pdf" download>здесь</a>
                    </p>
                </div>
            </div>
        </>;
    }
}

export default Bmi