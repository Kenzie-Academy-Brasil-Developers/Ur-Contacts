import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { Contact } from "../pages/HomePage";

interface ContactsValues {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  addContact: (formData: any) => Promise<void>;
  editContact: (formData: any, contactId: string) => Promise<void>;
  deleteContact: (contactId: string) => Promise<void>;
  isOpenAdd: boolean;
  setIsOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenEdit: boolean;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenRemove: boolean; 
  setIsOpenRemove: React.Dispatch<React.SetStateAction<boolean>>;
}


interface ContactProviderProps {
  children: React.ReactNode
}


export const ContactsListContext = createContext<ContactsValues>({} as ContactsValues);

export const ContactsListProvider = ({ children }:ContactProviderProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);


  useEffect(() => {
    const getContactsToList = async () => {
      try {
        const { data } = await api.get("/contacts");
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getContactsToList();

  }, []);

  const addContact = async (formData) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      const newContact = {
        ...formData,
      };

      const { data } = await api.post("/contacts", newContact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((contacts) => [...contacts, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      await api.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts((contactList) => contactList.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.log(error);
    }
  };

  const editContact = async (formData, contactId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      const newContact = {
        id: contactId,
        ...formData,
      };

      const { data } = await api.patch(`/contacts/${contactId}`, newContact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((contacts) =>
        contacts.map((contact) => {
          if (contact.id === contactId) {
            return { ...contact, ...data };
          } else {
            return contact;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContactsListContext.Provider
      value={{
        contacts,
        setContacts,
        addContact,
        editContact,
        deleteContact,
        isOpenAdd,
        setIsOpenAdd,
        isOpenEdit,
        setIsOpenEdit,
        isOpenRemove, 
        setIsOpenRemove,
      }}
    >
      {children}
    </ContactsListContext.Provider>
  );
};
