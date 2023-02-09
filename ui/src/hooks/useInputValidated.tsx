import { useState } from "react";

function useValidatedInput(
    validationFunction: Function
) {
    const [ value, setValue ] = useState('');
    const [ isTouched, setIsTouched ] = useState(false);
    
    const isValid = validationFunction(value);
    const hasError = !isValid && isTouched;

    const changeHandler = (event: any) => {
        setValue(event.target.value);
    }

    const blurHandler = () => {
        return new Promise(resolve => {
            setIsTouched(true);
            resolve('');
        })
    }

    const reset = () => {
        setValue('');
        setIsTouched(false);
    }

    return { value, isValid, hasError, changeHandler, blurHandler, reset }
}

export default useValidatedInput;