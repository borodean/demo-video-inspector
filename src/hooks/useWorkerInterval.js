import {clearInterval, setInterval} from 'worker-timers';
import {useEffect, useRef} from 'react';

function useWorkerInterval(callback, delay) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useWorkerInterval;
