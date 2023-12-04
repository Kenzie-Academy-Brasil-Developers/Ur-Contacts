import { forwardRef } from "react"
import { StyledParagraph } from "../../../styles/typography"
import styles from "./style.module.css";

export const Input = forwardRef(({error, title, ...rest}, ref) => {
    return(
        <div className={styles.container}>
            <StyledParagraph fontWeight="bold">{title}</StyledParagraph>
            <input ref={ref} type="password" {...rest} re/>
            {error ? <p>{error.message}</p> : null}
        </div>
    )
})