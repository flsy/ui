import React, { useEffect, useState } from 'react';
import { toDateTimeSeconds } from '../../utils/utils';

const Time = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    () => clearInterval(timer);
  }, []);

  return <div>{toDateTimeSeconds(date)}</div>;
};

export default Time;
