import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange, stepRange, minDiff }) => {

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef(null);

    // Set width of the range to decrease from the left side
    const setLeftValue = () => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    };

        // Set width of the range to decrease from the right side
        const setRightValue = () => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    };

    useEffect(() => {
        setLeftValue()
        setRightValue()
        onChange([minVal, maxVal])
    }, [minVal, maxVal])

  /*useEffect(() => setLeftValue(), [minVal]);

  useEffect(() => setRightValue(), [maxVal]);

  useEffect(() => {
      onChange([minVal, maxVal])
  }, [minVal, maxVal])*/

  // Convert to percentage
  const getPercent = value => Math.round(((value - min) / (max - min)) * 100);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={stepRange}
        onChange={event => {
            setMinVal(Math.min(Number(event.target.value), maxVal - minDiff))
        }
        }
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={stepRange}
        onChange={event => {
            setMaxVal(Math.max(event.target.value, minVal + minDiff))
        }
        }
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default MultiRangeSlider;
