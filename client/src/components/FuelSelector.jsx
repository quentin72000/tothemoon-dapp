import PropTypes from 'prop-types';

export default function FuelSelector({selected, setSelected}) {
    const options = [1, 10, 100]

    return (
        <div>
            <fieldset className='selector'>
                {
                    options.map((e) => {
                        return <div key={e}> 
                            <label htmlFor={e}>{e} FUEL</label>
                            <input type="radio" name="fuelselector" id={e} onClick={() => setSelected(e)} defaultChecked={e === selected} />
                        </div>
                    })
                }
            </fieldset>
        </div>
    )
}

FuelSelector.propTypes = {
    selected: PropTypes.number.isRequired,
    setSelected: PropTypes.func.isRequired
};