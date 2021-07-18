import React from 'react'
import styled from 'styled-components'

import './filters.css'

const Selection = styled.select`
    border: 3px solid #FFE60A;
    width: 100%;
    padding: .7em;
    border-radius: .5em;
`

const Filter = ({ onOpenFilter, onChange, isOpen, cbContent,  content, onReset, title}) => {
    //console.log("CONTENT: ", content, cbContent)

    return (
        <div className="multiselect">
            <div className="selectBox pointer" onClick={() => onOpenFilter()}>
                <Selection>
                    <option>{title}</option>
                </Selection>
                <div className="overSelect"></div>
            </div>
            { isOpen &&
                <div id="dropdown">
                    <div id="checkboxes">
                        {
                            content && Object.keys(content).map((item, key) => {
                                return  <label key={key} className="pointer no-select" htmlFor={key}>
                                    <input 
                                        onClick={(e) => onChange(e.target.id)} 
                                        onChange={() => console.log()}
                                        type="checkbox" 
                                        id={key} 
                                        checked={cbContent[key]}
                                    />
                                        {content[item]}
                                </label>
                            })
                        }
                    </div>
                    <button 
                        className="pointer no-select"  
                        onClick={() => {
                            onReset()
                            onOpenFilter()
                        }}>Alle löschen</button>
                </div>
            }
        </div>
    )
}

export default Filter
