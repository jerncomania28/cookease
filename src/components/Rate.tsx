/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface RateProps {
  count?: number;
  rating?: number;
  onRating?: (_idx: number) => void;
  color?: {
    filled: string;
    unfilled: string;
  };
}

const defaultRateProps: RateProps = {
  count: 5,
  rating: 0,
  color: {
    filled: '#f5eb3b',
    unfilled: '#DCDCDC',
  },
};

const Rate: React.FC<RateProps> = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return color?.filled;
    } else if (!hoverRating && rating && rating >= index) {
      return color?.filled;
    }

    return color?.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className="cursor-pointer"
          icon={faStar}
          onClick={() => onRating?.(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};

Rate.defaultProps = defaultRateProps;

export default Rate;
