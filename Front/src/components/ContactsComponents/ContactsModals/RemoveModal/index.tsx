import { Dispatch, SetStateAction, useContext } from "react"
import { Modal } from "../Modal"
import { ContactsListContext } from "../../../../providers/ContactsListContext"
import { StyledTitle } from "../../../../styles/typography"
import { Div } from "./style";

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
      setIsOpenRemove(false);
    } catch (error) {
      console.error("Erro ao remover o contato:", error);
    }
  };


  return (
      <Modal toggleModal={toggleModal}>
        <Div>

          <StyledTitle>Deseja mesmo excluir esse contato?</StyledTitle>
          <button onClick={() => onSubmit()}>Sim</button>
          <button onClick={() => setIsOpenRemove(false)}>Não</button>
        </Div>


      </Modal>
  )
}