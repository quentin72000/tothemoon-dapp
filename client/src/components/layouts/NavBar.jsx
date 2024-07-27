
import PropTypes from 'prop-types';

import styles from "../../styles/NavBar.module.css";

export default function NavBar({onClick}) {  
    const tabs = [{
        id: 1,
        name: "Swap",
    },
    {
        id: 2,
        name: "Rocket",
    },
    {
        id: 3,
        name: "Quests"
    }]
  
  
    return (
    <div className={styles.navbar}>
        <ul>
            {tabs.map((el) => {
                return <li className={styles.link} key={el.id} onClick={() => onClick(el.id)}>{el.name}</li>
            })}
        </ul>
    </div>
  )
}


NavBar.propTypes = {
    onClick: PropTypes.func.isRequired
};