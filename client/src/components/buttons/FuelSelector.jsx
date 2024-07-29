import PropTypes from 'prop-types';

import styles from '../../styles/FuelSelector.module.css'

export default function FuelSelector({selected, setSelected, options}) {

    return (
        <div>
            <fieldset className={styles.selector}>
                {
                    options.map((e) => {
                        return <label htmlFor={e} key={e} className={`${styles.defaultDiv} ${e === selected ? styles.selectedDiv : ""}`}> 
                            {e} FUEL
                            <input type="radio" className={styles.radioInput} name="fuelselector" id={e} onClick={() => setSelected(e)} defaultChecked={e === selected}></input>
                        </label>
                    })
                }
            </fieldset>
        </div>
    )
}

FuelSelector.propTypes = {
    selected: PropTypes.number.isRequired,
    setSelected: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};