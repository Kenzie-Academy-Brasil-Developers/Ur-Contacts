import { Dispatch, SetStateAction, useContext } from "react"
import { Contact } from "../../../../pages/HomePage"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactData, schema } from "./schema"
import { Modal } from "../Modal"
import { ContactsListContext } from "../../../../providers/ContactsListContext"


interface ModalEditTaskProps {
    toggleModal: () => void;
    setIsOpenEdit: Dispatch<SetStateAction<boolean>>;
    contactId: string;
  }


export const EditContactModal = ({ toggleModal, setIsOpenEdit, contactId  }: ModalEditTaskProps) => {
  const { register, handleSubmit } = useForm<ContactData>({
      resolver: zodResolver(schema)
  })
  const { editContact } = useContext(ContactsListContext)


  const onSubmit = async (data: ContactData) => {
    try {
      await editContact(data, contactId);
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Erro ao editar o contato", error);
    }
  };


  return (
      <Modal toggleModal={toggleModal}>

          <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" {...register("name")} />

              <label htmlFor="telephone">Número</label>
              <input type="text" id="telephone" {...register("telephone")} />

              <label htmlFor="email">Email</label>
              <input type="text" id="email" {...register("email")} />

              <button type="submit">Registrar contato</button>
          </form>

          <p></p>

      </Modal>
  )
}