const debounce =(cb, timer=500) =>{
  let timerId;
  return ()=>{
    clearTimeout(timerId);
    setTimeout(cb, timer);
  };
};
export {debounce};
