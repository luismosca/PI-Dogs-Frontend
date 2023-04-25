import React from 'react';
import "../MultiSelect/MultiSelect.css"

function DropdownMenu({ options, onChange, selectedOptions }) {
  return (
    <div>
        <select multiple onChange={onChange}>
        {options.map(option => (
            <option key={option.id} value={option.name} className={selectedOptions.includes(option.name) ? 'selected' : ''}>
            {option.name}
            </option>
        ))}
        </select>
        
        <p>Selected options: {selectedOptions.join(', ')}</p>
        
    </div>
  );
}

export default DropdownMenu;