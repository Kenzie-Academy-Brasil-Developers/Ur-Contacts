import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactData, schema } from "./schema"
import { Modal } from "../Modal"
import { Form } from "./style"
import { ContactsListContext } from "../../../../providers/ContactsListContext"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button"
import { StyledTitle } from "../../../../styles/typography"


interface ModalAddTaskProps {
  toggleModal: () => void
  setIsOpenAdd: Dispatch<SetStateAction<boolean>>
}


export const AddContactModal = ({ toggleModal, setIsOpenAdd }: ModalAddTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<ContactData>({
      resolver: zodResolver(schema)
  })
  const { addContact } = useContext(ContactsListContext)

  const createContact = async (data: ContactData) => {
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

              <StyledButton type="submit">Registrar contato</StyledButton>
          </Form>

      </Modal>
  )
}