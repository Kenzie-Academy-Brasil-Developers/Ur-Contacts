import styled from "styled-components"

export const StyledButton = styled.button`
    height: 48px;
    width: 100%;
    
    background-color: ${({tp}) => tp === "login" ?  "var(--color-primary-focus)"  : "var(--color-primary-negative)"};
    border-radius: var(--border-radious);

    color: var(--grey-0);

    &:hover{
        background-color: var(--color-primary-focus);
    }
`