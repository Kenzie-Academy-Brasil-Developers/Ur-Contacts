import styled, {css} from "styled-components";


export const HeadlineStyles = css`
    font-weight: ${({fontWeight}) => fontWeight === "bold" ? 700 : 400};
    color: var(--grey-0);
`

export const StyledLogo = styled.h1`
    ${HeadlineStyles};
    font-size: 45px;

    > span {
        color: var(--color-primary);
}
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


