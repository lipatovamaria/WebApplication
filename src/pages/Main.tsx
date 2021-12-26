import React from "react";
import imageRun from "../resuorces/img/image_run.jpg"
import UserContext from "../context/UserContext";
import {Link} from "react-router-dom";

class Main extends React.Component<any, any> {
    static contextType = UserContext;

    render() {
        let currentUser = this.context.user
        if(currentUser == null) {
            document.location.href="/auth";
        }
        return <>
            <div className="container-fluid">
                <div className="row" style={{height: '130px'}}>
                    <h1>Здоровый образ жизни</h1>
                </div>
            </div>

            <div className="container">
                <div className="row" style={{height: '300px'}}>
                    <div className="col-md-4">
                        <img src={imageRun} alt="running" style={{ alignSelf: 'left' }}/>
                    </div>
                    <div className="col-md-8">
                        <p className="text">
                            Здоровый образ жизни помогает нам выполнять наши цели и задачи,
                            успешно реализовывать свои планы, справляться с трудностями, а если придётся,
                            то и с колоссальными перегрузками. Крепкое здоровье, поддерживаемое и укрепляемое самим
                            человеком,
                            позволит ему прожить долгую и полную радостей жизнь.
                            Здоровье - бесценное богатство каждого человека в отдельности, и всего общества в целом.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <p className="text">
                        Здоровый образ жизни — это индивидуальная система поведения человека,
                        обеспечивающая ему физическое, душевное и социальное благополучие в реальной окружающей среде
                        (природной, техногенной и социальной) и активное долголетие.
                    </p>
                </div>

                <div className="row">
                    <h4 className="text">Преимущества ЗОЖ:</h4>
                    <ul className="text">
                        <li>Сокращается частота рецидивов хронических заболеваний;</li>
                        <li>При пробуждении нет усталости, чувствуется прилив сил;</li>
                        <li>Наблюдается повышенная выносливость на спортивных тренировках;</li>
                        <li>Сокращается частота простудных заболеваний и снижается их тяжесть;</li>
                        <li>Кожа становится более упругой и чистой.</li>
                    </ul>
                </div>

                <div className="row">
                    <p className="text">Для эффективного подбора программы тренировок рекомендуем узнать Ваш <a
                        href="/bmi"><b><u>индекс массы тела</u></b></a>
                        — величина, позволяющая оценить степень соответствия массы человека и его роста и тем самым
                        косвенно судить о том,
                        является ли масса недостаточной, нормальной или избыточной. </p>
                </div>
                <div className="row">
                    <p className="text">Каллорийность продуктов является одной из важнейших характеристик продуктов.
                        Основываясь на ней, вы можете построить рацион как для похудения, так и для набора веса.
                        Посмотреть таблицу каллорий Вы можете <a href="/calories"><b><u>здесь</u></b></a></p>
                </div>
                <div>
                    <p>
                        Вы авторизованы как '{currentUser.username}'{' '}
                        <a onClick={this.LogOutUser}><b><u>Выход</u></b></a>
                    </p>
                </div>
            </div>
        </>
    }

    LogOutUser = async () => {
        await this.context.logoutUser()
        document.location.href="/auth";
    }
}

export default Main