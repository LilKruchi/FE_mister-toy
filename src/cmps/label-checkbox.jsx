import React from 'react'
import Select from 'react-select'


export function LabelCheckbox({ toy, label, handleChange }) {
    return (
        <div key={label}>
            <input type="checkbox" name="labels" id={label} value={label} onChange={handleChange} />
            <label htmlFor={label}>{label}</label>
        </div>
    )
}