

import { Link } from 'react-router-dom';
import './MainPage.css';

interface LinkProps { 
  id: number;
  link: string;
  title: string;
}

const linksList:LinkProps[] = [
  {id: 1, link: '/nearest', title: "Ближайшие станции"},
  {id: 2, link: '/schedule', title: "Расписание"},
  {id: 3, link: '/check-station', title: "Выбор станций"},

]
const MainPage = () => {

  return (
      <>
        <ul className="main-page__box">
          {linksList.map(link => (
            <li key={link.id} className="main-page__link">
              <Link to={link.link}>{link.title}</Link>
            </li>
          ))}
        </ul>          
      </>
  );
};

export default MainPage;