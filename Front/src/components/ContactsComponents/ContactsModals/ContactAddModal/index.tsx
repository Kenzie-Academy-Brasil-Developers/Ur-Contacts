import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TContactSchema, contactSchema } from "./schema"
import { Modal } from "../Modal"
import { Form } from "./style"
import { ContactsListContext } from "../../../../providers/ContactsListContext"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button"
import { StyledTitle } from "../../../../styles/typography"
import 'jquery-mask-plugin';
import { handlePhone } from "./schema"


interface ModalAddTaskProps {
  toggleModal: () => void
  setIsOpenAdd: Dispatch<SetStateAction<boolean>>
}


export const AddContactModal = ({ toggleModal, setIsOpenAdd }: ModalAddTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TContactSchema>({
      resolver: zodResolver(contactSchema), mode: "onChange"
  })
  const { addContact } = useContext(ContactsListContext)

  const createContact = async (data: TContactSchema) => {
    addContact(data)
    setIsOpenAdd(false)
  }


  return (
      <Modal toggleModal={toggleModal}>

          <Form onSubmit={handleSubmit(createContact)}>
              <StyledTitle>Adicione novo contato</StyledTitle>
              <Input 
                title="Nome" 
                type="text" 
                placeholder="Digite aqui o nome" 
                {...register("name")} 
                error={errors.name as { message: string } | undefined}/>

              <Input 
                id="telephone"
                title="Contato" 
                type="text" 
                onKeyUp={
                  handlePhone
                } 
                minLength={10}
                maxLength={12}
                placeholder="Digite aqui o contato" 
                {...register("telephone")} 
                error={errors.telephone as { message: string } | undefined}/>

              <Input 
                title="Email" 
                type="email" 
                placeholder="Digite aqui o email" 
                {...register("email")} 
                error={errors.email as { message: string } | undefined}/>      

              <StyledButton type="submit">Registrar contato</StyledButton>
          </Form>
      </Modal>
  )
}