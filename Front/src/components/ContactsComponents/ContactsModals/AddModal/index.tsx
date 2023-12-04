import { Dispatch, SetStateAction, useContext } from "react"
import { Contact } from "../../../../pages/HomePage"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactData, schema } from "./schema"
import { Modal } from "../Modal"
import { ContactsListContext } from "../../../../providers/ContactsListContext"


interface ModalAddTaskProps {
  toggleModal: () => void
//   setContacts: Dispatch<SetStateAction<Contact[]>>
setIsOpenAdd: Dispatch<SetStateAction<boolean>>
}


export const AddContactModal = ({ toggleModal, setIsOpenAdd }: ModalAddTaskProps) => {
  const { register, handleSubmit } = useForm<ContactData>({
      resolver: zodResolver(schema)
  })
  const { addContact } = useContext(ContactsListContext)

  const createContact = async (data: ContactData) => {
    addContact(data)
    setIsOpenAdd(false)

  }


  return (
      <Modal toggleModal={toggleModal}>

          <form onSubmit={handleSubmit(createContact)}>
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" {...register("name")} />

              <label htmlFor="telephone">Número</label>
              <input type="text" id="telephone" {...register("telephone")} />

              <label htmlFor="email">Email</label>
              <input type="text" id="email" {...register("email")} />

              <button type="submit">Registrar contato</button>
          </form>

      </Modal>
  )
}