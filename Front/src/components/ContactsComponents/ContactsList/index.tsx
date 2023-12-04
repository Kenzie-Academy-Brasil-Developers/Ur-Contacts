// import { useContext } from "react";
// import { ContactsListContext } from "../../../providers/ContactsListContext";
// import { ContactCard } from "./ContactCard";
// // import {  }
// // import {  }

// export const ContactsList = () => {
//     const { contactsList, isOpenAdd, setIsOpenAdd, isOpenEdit, setIsOpenEdit } = useContext(ContactsListContext)

//     return (
//         <>
//             <div>
//                 <ul>
//                     {contactsList === null ?  contactsList.map((contact) => (
//                         <ContactCard key={contact.id} contact={contact} />
//                     )): null}
//                 </ul>
//                 <button>seila</button>
//             </div>

//             {isOpenAdd ? <p>seila</p> : null}
//             {isOpenEdit ? <p>nao sei tbm</p> : null}
//         </>
//     )
// }