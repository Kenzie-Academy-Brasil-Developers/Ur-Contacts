
import { LoginForm } from "../../components/LoginForm"
import { StyledContainer } from "./style"

export const LoginPage = () => {
    return(
        <StyledContainer>
            <div className="formBox">
                <h1>Ur Contact</h1>

                <LoginForm/>
            </div>
        </StyledContainer>
    )
}