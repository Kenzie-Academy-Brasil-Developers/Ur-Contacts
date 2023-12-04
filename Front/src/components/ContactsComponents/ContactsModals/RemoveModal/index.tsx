import { Dispatch, SetStateAction, useContext } from "react"
import { Contact } from "../../../../pages/HomePage"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { ContactData, schema } from "./schema"
import { Modal } from "../Modal"
import { ContactsListContext } from "../../../../providers/ContactsListContext"


interface ModalEditTaskProps {
    toggleModal: () => void;
    setIsOpenRemove: Dispatch<SetStateAction<boolean>>;
    contactId: string;
  }


export const RemoveContactModal = ({ toggleModal, setIsOpenRemove, contactId  }: ModalEditTaskProps) => {
  const { deleteContact } = useContext(ContactsListContext)


  const onSubmit = async () => {
    try {
      await deleteContact(contactId);
      console.log(contactId)
      setIsOpenRemove(false);
    } catch (error) {
      console.error("Erro ao remover o contato:", error);
    }
  };


  return (
      <Modal toggleModal={toggleModal}>

        <h1>Deseja mesmo excluir esse contato?</h1>
        <button onClick={() => onSubmit()}>Sim</button>
        <button>Não</button>

      </Modal>
  )
}