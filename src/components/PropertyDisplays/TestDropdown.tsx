import React, { useState, useRef, useEffect } from 'react';

interface DisplayedItems {
    value: string;
    label: string;
}

interface DropdownProps {
  selection: string[];
  objects: DisplayedItems[];
  updateValues: Function;
  dropdownLabel: string;
}

const Dropdown: React.FC<DropdownProps> = ({ objects, selection, updateValues, dropdownLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(selection);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleOptionClick = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];

      updateValues(updatedSelectedValues);

    setSelectedValues(updatedSelectedValues);
  };

  return (
    <div style={{ position: 'relative', minWidth: '100px' }} ref={dropdownRef}>
      <button onClick={toggleDropdown} style={{ marginBottom: '8px', backgroundColor: 'var(--dark)', color: 'var(--text-color)' }}>
        {dropdownLabel}
      </button>
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, borderRadius: '4px', padding: '8px', zIndex: 100, backgroundColor: 'var(--dark)' }}>
          {objects.map((object: DisplayedItems) => (
            <label key={object.value} style={{ display: 'block', marginBottom: '4px' }}>
              <input
                type="checkbox"
                checked={selectedValues.includes(object.value.toString())}
                onChange={() => handleOptionClick(object.value.toString())}
              />
              {object.label}
            </label>
          ))}
        </div>
      )}
      {selectedValues.length > 0 && (
        <div style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
            {selectedValues.map((value) => (
                <div key={value} style={{ backgroundColor: 'var(--dark)', color: 'var(--text-color)', padding: '4px', marginRight: '4px', marginBottom: '4px' }}>
                    {value}
                </div>
            ))}
        </div>
        )}
    </div>
  );
};

export default Dropdown;
