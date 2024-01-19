import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TContactSchema, contactSchema } from "./schema"
import { Modal } from "../Modal"
import { ContactsListContext } from "../../../../providers/ContactsListContext"
import { Form } from "./style"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button";
import { StyledTitle } from "../../../../styles/typography"
import { handlePhone } from "./schema"


interface ModalEditTaskProps {
    toggleModal: () => void;
    setIsOpenEdit: Dispatch<SetStateAction<boolean>>;
    contactId: string;
  }


export const EditContactModal = ({ toggleModal, setIsOpenEdit, contactId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema)
})
  const { editContact, contacts } = useContext(ContactsListContext)

  const currentContact = contacts.find(contact => contact.id === contactId)


  const onSubmit = async (data: TContactSchema, e: any) => {
    e.preventDefault()
    try {
      await editContact(data, contactId);
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Erro ao editar o contato", error);
    }
  };


  return (
      <Modal toggleModal={toggleModal}>

          <Form onSubmit={handleSubmit(onSubmit)}>

            <StyledTitle>Edite o contato</StyledTitle>
              <Input 
                title="Nome" 
                type="text" 
                defaultValue={currentContact!.name}
                placeholder="Digite aqui o nome" 
                {...register("name")} 
                error={errors.name as { message: string } | undefined}/>

              <Input 
                title="Contato" 
                type="text" 
                onKeyUp={
                  handlePhone
                } 
                defaultValue={currentContact!.telephone}
                placeholder="Digite aqui o contato" 
                {...register("telephone")} 
                error={errors.telephone as { message: string } | undefined}/>

              <Input 
                title="Email" 
                type="email" 
                defaultValue={currentContact!.email}
                placeholder="Digite aqui o email" 
                {...register("email")} 
                error={errors.email as { message: string } | undefined}/>   

              <StyledButton type="submit">Editar contato</StyledButton>
          </Form>
      </Modal>
  )
}