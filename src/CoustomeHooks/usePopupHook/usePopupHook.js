import { useState } from 'react';

function usePopupHook() {
    const [state, setState] = useState() 

    const toggleFun = (state) => { 
        setState(state) 
    }

    return [state, toggleFun]
}

export default usePopupHook