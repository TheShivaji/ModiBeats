import React from 'react'
import "../style/formgroup.scss"
const Fromgroup = ({ type, value, onChange , placeholder}) => {
  return (
    <div className='form-group'>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
  )
}

export default Fromgroup