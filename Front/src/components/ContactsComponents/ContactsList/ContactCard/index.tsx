import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Contact } from "../../../../pages/HomePage"
import { Container } from "./styles"
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";



interface CardProps {
    contact: Contact
    setContacts: Dispatch<SetStateAction<Contact[]>>
    editContact: (id: string) => void;
    removeContact: (id: string) => void;
}

export const Card = ({ contact, setContacts, editContact, removeContact}: CardProps) => {

    return (
        <Container>
            <div className="infos">
                <h3 className="nome">{contact.name}</h3>
                <div className="contacts">
                    <p>{contact.email}</p>
                    <p>{contact.telephone}</p>

                </div>
            </div>

            <div className="buttons">
                <MdEdit onClick={() => editContact(contact.id)}/>
                <FaTrashAlt onClick={() => removeContact(contact.id)} />

            </div>
            
        </Container>
    )

}