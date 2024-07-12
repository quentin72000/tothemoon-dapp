import { useState } from "react"

export default function FuelSelector() {
    const options = [1, 10, 100]

    const [selected, setSelected] = useState(1)


    return (
        <div>
            <fieldset>
                {
                    options.map((e) => {
                        return <div key={e}> 
                            <label htmlFor={e}>{e}</label>
                            <input type="radio" name="fuelselector" id={e} onClick={() => setSelected(e)} />
                        </div>
                    })
                }
            </fieldset>
            <p>Select option : {selected} fuel.</p>
        </div>
    )
}
