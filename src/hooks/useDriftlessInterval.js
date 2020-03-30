import {clearDriftless, setDriftlessInterval} from 'driftless';
import {useEffect, useRef} from 'react';

function useDriftlessInterval(callback, delay) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setDriftlessInterval(() => callbackRef.current(), delay);
    return () => clearDriftless(id);
  }, [delay]);
}

export default useDriftlessInterval;
