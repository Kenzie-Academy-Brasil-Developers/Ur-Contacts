import styled, {css} from "styled-components";


export const HeadlineStyles = css`
    font-family: var(--Font-Primary);
    font-weight: ${({fontWeight}) => fontWeight === "bold" ? 700 : 400};
`


export const StyledTitle = styled.h1`
    ${HeadlineStyles};
    font-size: 18px;
`


export const StyledParagraph = styled.p`
    ${HeadlineStyles};
    font-size: 12px;
    font-style: ${({style}) => style === "italic" ? italic : null};

`


