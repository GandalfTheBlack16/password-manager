import { FormEvent } from "react"
import './Form.css'

type Props = {
    children: JSX.Element | JSX.Element[],
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void
    onReset?: (event: FormEvent<HTMLFormElement>) => void
}

export function Form ({ children, onSubmit, onReset }: Props) {
    return (
        <form 
            onSubmit={onSubmit} 
            onReset={onReset}
            className="form"
        >{ children }
        </form>
    )
}