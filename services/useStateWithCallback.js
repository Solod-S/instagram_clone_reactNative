import React, { useState, useRef, useEffect } from "react";

export const useStateWithCallback = (initialState) => {
  const [state, setState] = useState(initialState);

  const previousState = useRef(initialState);
  const myCallbacksList = useRef([]);

  const setStateWithCallback = (state, callback) => {
    setState(state);
    if (callback) {
      myCallbackList.current.push(callback);
    }
  };

  useEffect(() => {
    myCallbacksList.current.forEach((callback) =>
      callback(previousState.current, state)
    );
    myCallbacksList.current = [];
    previousState.current = state;
  }, [state]);

  return [state, setStateWithCallback];
};
