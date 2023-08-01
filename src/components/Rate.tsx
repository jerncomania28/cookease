/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

//utils
import { updateOrAddRating } from '../utils/firebase';
import storageUtils from '../utils/storageUtils';

interface RateProps {
  count?: number;
  rating?: number;
  onRating?: (_idx: number) => void;
  color?: {
    filled: string;
    unfilled: string;
  };
  uniqueId?: string;
}

const defaultRateProps: RateProps = {
  count: 5,
  rating: 0,
  color: {
    filled: '#f5eb3b',
    unfilled: '#DCDCDC',
  },
  uniqueId: '',
};

/***
 *@param uniqueId
 - receive uniqueId and get user uid with rating value,
 - fetch current product from db
 - destructure the rating array object
 - push the currently formed object into the rating array
 - object should consist of user.uid and rating value.
 - on fetching products , find out if the user uid matches the currrent user uid
 - if yes, passing in rating values as default
 *
 *
 */

const Rate: React.FC<RateProps> = ({
  count,
  rating,
  color,
  onRating,
  uniqueId,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const user = storageUtils.getItem();

  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return color?.filled;
    } else if (!hoverRating && rating && rating >= index) {
      return color?.filled;
    }

    return color?.unfilled;
  };

  const handleRating = (idx: number) => {
    onRating?.(idx);
    updateOrAddRating(uniqueId as string, user.id, idx);
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
          onClick={() => handleRating(idx)}
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
