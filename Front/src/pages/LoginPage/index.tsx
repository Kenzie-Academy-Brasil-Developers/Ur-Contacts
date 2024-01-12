
import { LoginForm } from "../../components/LoginForm"
import { StyledContainer } from "./style"
import { StyledLogo } from "../../styles/typography"

export const LoginPage = () => {
    return(
        <StyledContainer>
            <div className="formBox">
                <StyledLogo><span>Ur</span> Contact</StyledLogo>

                <LoginForm/>
            </div>
        </StyledContainer>
    )
}