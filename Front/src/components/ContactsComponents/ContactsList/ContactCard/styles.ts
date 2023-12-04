import styled from "styled-components";


export const Container = styled.li`
    display: flex;
    justify-content: space-around;
    gap: 5px;

    width: 300px;
    /* height: 100px; */

    background-color: var(--color-primary);
    color: var(--color-gray-900);

    margin: 10px;
    padding: 10px;
    
    .buttons{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

` 