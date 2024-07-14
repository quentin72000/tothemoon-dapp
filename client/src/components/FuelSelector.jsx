import PropTypes from 'prop-types';

export default function FuelSelector({selected, setSelected}) {
    const options = [1, 10, 100]

    return (
        <div>
            <fieldset>
                {
                    options.map((e) => {
                        return <div key={e}> 
                            <label htmlFor={e}>{e}</label>
                            <input type="radio" name="fuelselector" id={e} onClick={() => setSelected(e)} checked={e === selected} />
                        </div>
                    })
                }
            </fieldset>
            <p>Select option : {selected} fuel.</p>
        </div>
    )
}

FuelSelector.propTypes = {
    selected: PropTypes.number.isRequired,
    setSelected: PropTypes.func.isRequired
};