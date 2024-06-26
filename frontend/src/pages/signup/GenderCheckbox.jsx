import React, { useState } from 'react'

const GenderCheckbox = ({ handleCheckBoxChange, selectedGender }) => {
  const handleChange = (e) => {
    handleCheckBoxChange(e.target.value)
  }

  return (
    <div className="flex">
      <div className="form-control">
        <label
          htmlFor="male"
          className={`cursor-pointer label gap-2 ${
            selectedGender === 'male' ? 'selected ' : ''
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            name="gender"
            value="male"
            checked={selectedGender === 'male'}
            onChange={handleChange}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label
          htmlFor="female"
          className={`cursor-pointer label gap-2 ${
            selectedGender === 'female' ? 'selected ' : ''
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            name="gender"
            value="female"
            checked={selectedGender === 'female'}
            onChange={handleChange}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label
          htmlFor="other"
          className={`cursor-pointer label gap-2 ${
            selectedGender === 'other' ? 'selected ' : ''
          }`}
        >
          <span className="label-text">Other</span>
          <input
            type="checkbox"
            name="gender"
            value="other"
            checked={selectedGender === 'other'}
            onChange={handleChange}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckbox
