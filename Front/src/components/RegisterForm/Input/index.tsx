import { forwardRef, HTMLProps} from "react"
import { StyledParagraph } from "../../../styles/typography"
import { Container }from "./style";

interface InputProps extends HTMLProps<HTMLInputElement> {
    error?: { message: string } | undefined;
    type: string;
    placeholder: string;
    title: string;
  }


export const Input = forwardRef<HTMLInputElement, InputProps>(({error, title, ...rest}, ref) => {
    return(
        <Container>
            <StyledParagraph 
            fontItalic="italic"
            >{title}</StyledParagraph>
            
            <input ref={ref} {...rest}/>
            {error ? <p className="errorMessage">{error.message}</p> : null}
        </Container>

    )
})