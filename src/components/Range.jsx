import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Range component that accepts props, including fixedRange to determine fixed or dynamic range
const Range = ({ fixedRange }) => {
  const [range, setRange] = useState('');
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);

  //Effect to load data when mounting the component, depending on fixedRange
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (!fixedRange) {
          response = await axios.get('http://demo8256533.mockable.io/');
          setMinValue(response.data.min);
          setMaxValue(response.data.max);
        } else {
          response = await axios.get('http://demo8256533.mockable.io/range');
          setRange(response.data);
          setMinValue(response.data[0]);
          setMaxValue(response.data[response.data.length - 1]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fixedRange]);

  //States to handle editing minimum and maximum values
  const defaultValue = range ? range[0] : minValue;
  const defaultMaxValue = range ? range[range.length - 1] : maxValue;
  const [editingMinValue, setEditingMinValue] = useState(defaultValue.toString());
  const [editingMaxValue, setEditingMaxValue] = useState(defaultMaxValue.toString());
  const [isEditingMin, setIsEditingMin] = useState(false);
  const [isEditingMax, setIsEditingMax] = useState(false);
  
  //States and functions to manage movement and selection of points in the range
  const [activePoint, setActivePoint] = useState(null);
  const [startPosition, setStartPosition] = useState(0);
  const calculateNewValue = (diffX, pointValue) => {
    const svgWidth = 400;
    let scale = 100;
    if (range) {
      const rangeSpan = range[range.length - 1] - range[0];
      scale = rangeSpan;
    }
    let newValue = ((diffX / svgWidth) * scale + pointValue).toFixed(2);
    if (range) {
      newValue = parseFloat(newValue);
      newValue = range.reduce((prev, curr) => (Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev));
    } else {
      newValue = parseFloat(newValue);
      newValue = Math.min(Math.max(newValue, 0), 100);
    }
    return newValue;
  };

  //Handles mouse movement to update values
  const handleMouseMove = e => {
    if (!activePoint) return;
    const diffX = e.clientX - startPosition;
    const newValue = calculateNewValue(diffX, activePoint === 'min' ? minValue : maxValue);
    if (activePoint === 'min' && newValue < maxValue) {
      setMinValue(newValue);
      setEditingMinValue(newValue.toString());
    } else if (activePoint === 'max' && newValue > minValue) {
      setMaxValue(newValue);
      setEditingMaxValue(newValue.toString());
    }
    setStartPosition(e.clientX);
  };

  //Prepare the component for dragging motion
  const handleMouseDown = (e, point) => {
    setActivePoint(point);
    setStartPosition(e.clientX);
    document.body.style.cursor = 'grabbing';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  //End the movement by dragging
  const handleMouseUp = () => {
    setActivePoint(null);
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  //Functions to handle changes and blurring in value inputs
  const handleValueChange = (e, type) => {
    const { value } = e.target;
    if (type === 'min') {
      setEditingMinValue(value);
    } else if (type === 'max') {
      setEditingMaxValue(value);
    }
  };

  //Validate and fix the value at the end of the edit
  const handleBlur = type => {
    let newValue = parseFloat(type === 'min' ? editingMinValue : editingMaxValue);
    if (!isNaN(newValue)) {
      if (type === 'min') {
        newValue = Math.min(Math.max(newValue, 0), maxValue - (range ? range[1] - range[0] : 1));
        setMinValue(newValue);
      } else if (type === 'max') {
        newValue = Math.max(Math.min(newValue, 100), minValue + (range ? range[1] - range[0] : 1));
        setMaxValue(newValue);
      }
    } else {
      if (type === 'min') {
        setMinValue(range ? range[0] : 0);
      } else if (type === 'max') {
        setMaxValue(range ? range[range.length - 1] : 100);
      }
    }
    setIsEditingMin(false);
    setIsEditingMax(false);
  };

  //Function to display the value or an input to edit
  const displayValueOrInput = (value, type) => {
    const isEditing = type === 'min' ? isEditingMin : isEditingMax;
    const setIsEditing = type === 'min' ? setIsEditingMin : setIsEditingMax;
    const editingValue = type === 'min' ? editingMinValue : editingMaxValue;
    return isEditing ? (
      <input
        type="number"
        value={editingValue}
        onChange={e => handleValueChange(e, type)}
        onBlur={() => handleBlur(type)}
        style={{ width: '60px' }}
      />
    ) : (
      <span onClick={() => !range && setIsEditing(true)}>
        {parseFloat(value).toFixed(2)}€
      </span>
    );
  };

  //Renders the component with its display logic
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', width: '60px', justifyContent: 'space-between' }}>
        {displayValueOrInput(minValue, 'min')}
      </div>
      <svg
        width="400"
        height="50"
        viewBox="0 0 400 50"
        xmlns="http://www.w3.org/2000/svg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ margin: '0 10px' }}
      >
        <line x1="0" y1="25" x2="400" y2="25" stroke="#ccc" strokeWidth="2" />
        <circle
          cx={Math.max(
            Math.min((minValue / (range ? range[range.length - 1] : 100)) * 400, 400 - (activePoint === 'min' ? 12 : 8)),
            activePoint === 'min' ? 12 : 8
          )}
          cy="25"
          r={activePoint === 'min' ? '12' : '8'}
          fill="black"
          onMouseDown={e => handleMouseDown(e, 'min')}
        />
        <circle
          cx={Math.max(
            Math.min((maxValue / (range ? range[range.length - 1] : 100)) * 400, 400 - (activePoint === 'max' ? 12 : 8)),
            activePoint === 'max' ? 12 : 8
          )}
          cy="25"
          r={activePoint === 'max' ? '12' : '8'}
          fill="black"
          onMouseDown={e => handleMouseDown(e, 'max')}
        />
      </svg>
      <div
        style={{
          display: 'flex',
          width: '60px',
          justifyContent: 'space-between',
        }}
      >
        {displayValueOrInput(maxValue, 'max')}
      </div>
    </div>
  );
};

export default Range;
