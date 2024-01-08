import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./registerFormSchema";
import { Input } from "./Input";
import styles from "./style.module.css";
import { StyledButton } from "../Button/Button";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";


export const RegisterForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: {errors}  
    } = useForm({
        resolver: zodResolver(registerFormSchema)
    });

    const { userRegister } = useContext(UserContext)

    const submit = (formData) => {
        userRegister(formData)
    }

    return(
        <form className={styles.container} onSubmit={handleSubmit(submit)} noValidate>
            <h2>Crie sua conta</h2>

            <p>Rápido e grátis, vamos nessa!</p>

            <Input 
                title="Nome" 
                type="text" 
                placeholder="Digite aqui seu nome" 
                {...register("name")} 
                error={errors.name}/>

            <Input 
                title="Email" 
                type="email" 
                placeholder="Digite aqui seu email" 
                {...register("email")} 
                error={errors.email}/>

            <Input 
                title="Senha" 
                type="password" 
                placeholder="Digite aqui sua senha" 
                {...register("password")} 
                error={errors.password}/>

            <Input 
                title="Confirmar senha" 
                type="password" 
                placeholder="Digite novamente sua senha" 
                {...register("confirm")} 
                error={errors.confirm}/>

            <Input 
                title="Contato" 
                type="text" 
                placeholder="Opção de contato" 
                {...register("telephone")} 
                error={errors.telephone}/>


            <StyledButton type="submit">Cadastrar</StyledButton>
        </form>
    )
}