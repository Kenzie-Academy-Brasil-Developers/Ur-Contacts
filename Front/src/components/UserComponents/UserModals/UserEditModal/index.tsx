import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserData, schema } from "./schema"
import { Modal } from "../Modal"
import { UserContext } from "../../../../providers/UserContext"
import { Form } from "./styles"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button";
import { StyledTitle } from "../../../../styles/typography"


interface ModalEditTaskProps {
    toggleModal: () => void;
    setIsOpenEditUser: Dispatch<SetStateAction<boolean>>;
    clientId: string;
  }


export const UserEditModal = ({ toggleModal, setIsOpenEditUser, clientId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<UserData>({
    resolver: zodResolver(schema)
})
  const { editUser } = useContext(UserContext)


  const onSubmit = async (data: UserData) => {
    try {
      await editUser(data, clientId);
      setIsOpenEditUser(false);
    } catch (error) {
      console.error("Erro ao editar o usuário", error);
    }
  };


  return (
      <Modal toggleModal={toggleModal}>

          <Form onSubmit={handleSubmit(onSubmit)}>

          <StyledTitle>Edite seu usuário</StyledTitle>
          <Input 
                title="Nome" 
                type="text" 
                placeholder="Digite aqui o nome" 
                {...register("name")} 
                error={errors.name}/>

              <Input 
                title="Contato" 
                type="text" 
                placeholder="Digite aqui o contato" 
                {...register("telephone")} 
                error={errors.telephone}/>

              <Input 
                title="Email" 
                type="email" 
                placeholder="Digite aqui o email" 
                {...register("email")} 
                error={errors.email}/> 

              <Input 
                title="Senha" 
                type="password" 
                placeholder="Digite aqui sua senha" 
                {...register("password")} 
                error={errors.password}/> 

              <StyledButton type="submit">Atualizar usuário</StyledButton>
          </Form>


      </Modal>
  )
}