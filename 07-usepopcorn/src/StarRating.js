import { useState } from 'react';
import PropTypes from 'prop-types';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

StarRating.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  defaultRating: PropTypes.number,
  maxRating: PropTypes.number,
  messages: PropTypes.array,
  onSetRating: PropTypes.func,
  size: PropTypes.number
}

export default function StarRating({
  color = '#fcc419',
  className = '',
  defaultRating = 0,
  maxRating = 5,
  messages = [],
  onSetRating,
  size = 48
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    if (onSetRating) {
      onSetRating(rating);
    }
  };

  const handleTempRating = (tempRating) => {
    setTempRating(tempRating);
  }

  const handleFull = (index) => {
    return (tempRating > 0) ? index < tempRating : index < rating;
  }

  const textStyle = {
    color,
    fontSize: `${size / 1.5}px`,
    lineHeight: '1',
    margin: '0',
  };

  return (
    <>
      <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              color={color}
              full={handleFull(i)}
              mouseOver={() => handleTempRating(i + 1)}
              mouseOut={ () => handleTempRating(0) }
              onRate={() => handleRating(i + 1)}
              size={size}
            />
          ))}
        </div>
        <p style={textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ''}</p>
      </div>
    </>
  );
}

function Star({ color, full, mouseOver, mouseOut, onRate, size }) {
  const starStyle = {
    cursor: 'pointer',
    display: 'block',
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <span role="button" style={starStyle} onClick={onRate} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      {full ? (
        <FullStar color={color} />
      ) : (
        <EmptyStar color={color} />
      )}
    </span>
  );
}

const FullStar = ({ color }) => {
  return (<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={color}
    stroke={color}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>);
}

const EmptyStar = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/