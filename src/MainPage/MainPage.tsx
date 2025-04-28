

import { Link } from 'react-router-dom';
import './MainPage.css';


const MainPage = () => {

  return (
      <>
        <div className="main-page__box">
          <Link to={"/nearest"} className='main-page__link'>Ближайшие станции</Link>
          <Link to={'/schedule'} className='main-page__link'>Расписание</Link>
        </div>          
      </>
  );
};

export default MainPage;