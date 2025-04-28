

import { Link } from 'react-router-dom';
import './MainPage.css';


const MainPage = () => {

    return (
        <>
            <Link to={"/nearest"}>Блиайшие ствнции</Link>
            <Link to={'/schedule'}>Расписание</Link>
        </>
    );
};

export default MainPage;