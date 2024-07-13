
import PropTypes from 'prop-types';

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
    }
    ]
  
  
    return (
    <div className='navbar'>
        <ul className=''>
            {tabs.map((el) => {
                return <li key={el.id} onClick={() => onClick(el.id)}>{el.name}</li>
            })}
        </ul>
    </div>
  )
}


NavBar.propTypes = {
    onClick: PropTypes.func.isRequired
};