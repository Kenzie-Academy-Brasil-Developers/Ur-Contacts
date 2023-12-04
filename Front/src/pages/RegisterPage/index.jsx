import { Link } from "react-router-dom"
import { RegisterForm } from "../../components/RegisterForm"
import { StyledContainer } from "./style"

export const RegisterPage = () => {
    return(
        <StyledContainer>
            <div className="formBox">
                <div className="navBar">
                    <h1>Ur Contact</h1>

                    <Link to="/">Voltar</Link>
                </div>

                <RegisterForm/>
            </div>

        </StyledContainer>
    )
}