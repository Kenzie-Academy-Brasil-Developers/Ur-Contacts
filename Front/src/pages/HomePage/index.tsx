import { StyledTitle } from "../../styles/typography"
import { StyledContainer } from "./style"
import { Card } from "../../components/ContactsComponents/ContactsList/ContactCard";
import { AddContactModal } from "../../components/ContactsComponents/ContactsModals/ContactAddModal";
import { EditContactModal } from "../../components/ContactsComponents/ContactsModals/ContactEditModal";
import { RemoveContactModal } from "../../components/ContactsComponents/ContactsModals/RemoveModal";
import { UserEditModal } from "../../components/UserComponents/UserModals/UserEditModal";
import { RemoveUserModal } from "../../components/UserComponents/UserModals/UserRemoveModal";

import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../providers/UserContext";
import { ContactsListContext } from "../../providers/ContactsListContext";
import { FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

import { StyledLogo } from "../../styles/typography";


export interface Contact {
    id: string
    name: string
    telephone: string
    email: string
}


export const HomePage = () => {

    const { user, userLogout, isOpenEditUser, setIsOpenEditUser, setIsOpenRemoveUser, isOpenRemoveUser } = useContext(UserContext)
    const { contacts, setContacts, setIsOpenAdd, setIsOpenEdit, isOpenAdd, isOpenEdit, isOpenRemove, setIsOpenRemove } = useContext(ContactsListContext)

    const [editingContactId, setEditingContactId] = useState<string | null>(null);
    const [removingContactId, setRemovingContactId] = useState<string | null>(null);



    useEffect(() => {
        (
            async () => {
                const response = await api.get("/contacts")
                setContacts(response.data)
            }
        )()
    }, [contacts])


    const toggleModalAdd = () => setIsOpenAdd(!isOpenAdd)
    const toggleModalEdit = () => setIsOpenEdit(!isOpenEdit)
    const toggleModalRemove = () => setIsOpenRemove(!isOpenRemove)
    const toggleModalEditUser = () => setIsOpenEditUser(!isOpenEditUser)
    const toggleModalRemoveUser = () => setIsOpenRemoveUser(!isOpenRemoveUser)


    const handleEditContact = (contact: Contact) => {
        setEditingContactId(contact.id);
        toggleModalEdit();
      };
    const handleRemoveContact = (contact: Contact) => {
        setRemovingContactId(contact.id);
        toggleModalRemove();
      };


    const renderContacts = (contactsToRender: Contact[]) => contactsToRender.map(contact => <Card key={contact.id} contact={contact} 
        editContact={() => handleEditContact(contact)} removeContact={() => handleRemoveContact(contact)
        }/>)


    return(
        <StyledContainer>
            <div className="formBox">

                <div className="navBar">
                    <StyledLogo> <span>Ur</span> Contact</StyledLogo>
                    <Link onClick={() => {userLogout()}} to="/">Sair</Link>
                </div>


                <section className="headerSection">
                    <header>
                            <StyledTitle>{user.name}</StyledTitle>
                            <div>
                                <MdEdit style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={toggleModalEditUser}/>
                                <FaTrashAlt style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={toggleModalRemoveUser}/>
                            </div>

                    </header>
                </section>
                
                <div className="principalContent">
                    <section>
                        <StyledTitle>Atualmente <span>{contacts.length}</span> contatos</StyledTitle>

                        <FaPlusCircle style={{ width: '20px', height: '20px', cursor: 'pointer'}} type="button" onClick={toggleModalAdd}/>

                    </section>
                <ul>
                    {renderContacts(contacts)}
                </ul>

                </div>


                {isOpenAdd && <AddContactModal toggleModal={toggleModalAdd} setIsOpenAdd={setIsOpenAdd} />}

                {isOpenEdit && (
                <EditContactModal
                    toggleModal={toggleModalEdit}
                    setIsOpenEdit={setIsOpenEdit}
                    contactId={editingContactId || ''}
                />
                )}
                {
                isOpenRemove && <RemoveContactModal toggleModal={toggleModalRemove} setIsOpenRemove={setIsOpenRemove} contactId={removingContactId || ''} />
                }

                {isOpenEditUser && <UserEditModal toggleModal={toggleModalEditUser} setIsOpenEditUser={setIsOpenEditUser} clientId={user.id || ''}/>}

                {isOpenRemoveUser && <RemoveUserModal toggleModal={toggleModalRemoveUser} setIsOpenRemoveUser={setIsOpenRemoveUser} clientId={user.id || ''}/>}

            </div>
        </StyledContainer>
    )
}