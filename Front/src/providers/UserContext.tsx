// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../services/api";


// export const UserContext = createContext({})


// export const UserProvider = ({children}) => {
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(null)


//     const currentPath = window.location.pathname

//     const navigate = useNavigate();
    
//     const userLogin = async (formData) => {
//         try{
//             const {data} = await api.post('/login', formData);
//             setUser(data.user);
//             localStorage.setItem("@TOKEN", data.token);
//             localStorage.setItem("@USERID", data.user.id);


//             navigate("/home");
//         } catch(error) {
//             console.log(error);
//         } 
//     }


//     const userRegister = async (formData) => {
//         try {
//             await api.post('/clients', formData);
//             console.log("Cadastro efetuado com sucesso")

//             setTimeout(() => {navigate("/")} , 3000);
//         } catch(error) {
//             console.log(error)
//         }
//     }

//     const userLogout = () => {
//         setUser(null)
//         localStorage.removeItem("@TOKEN")
//         localStorage.removeItem("@USERID")
//     }


//     useEffect(() => {
//         const token = localStorage.getItem("@TOKEN")

//         const userLoad = async () => {
//             try {
//                 setLoading(true);
//                 const {data} = await api.get("/profile", {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
//                 setUser(data)
//                 navigate(currentPath)
//             } catch (error) {
//                 console.log(error)
//                 localStorage.removeItem("@TOKEN")
//             }
//             finally {
//                 setLoading(false);
//             }
//         }
//         if (token) {
//             userLoad()
//         }

//     }, [setUser])


import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../pages/LoginPage/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";


interface UserProviderProps {
    children: ReactNode
}

interface UserContextValues {
    userLogin: (data: LoginData) => void
    loading: boolean
}


export const UserContext = createContext<UserContextValues>({} as UserContextValues)

export const UserProvider = ({ children }: UserProviderProps) => {
    
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("@TOKEN")

        if (!token) {
            setLoading(false)
            return
        }
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        setLoading(false)
    }, [])


    const userLogin = async (data: LoginData) => {
        try {

            const response = await api.post("/login", 
            data)

            setUser(response.data.user);
            const { token } = response.data

            api.defaults.headers.common.Authorization = `Bearer ${token}`
            localStorage.setItem("@TOKEN", token)

            navigate("/home")
        } catch (error) {
            console.log(error)
        }

    }


    const userRegister = async (formData) => {
        try {
            await api.post('/clients', formData);
            console.log("Cadastro efetuado com sucesso")

            setTimeout(() => {navigate("/")} , 3000);
        } catch(error) {
            console.log(error)
        }
    }

    const userLogout = () => {
        setUser(null)
        localStorage.removeItem("@TOKEN")
        localStorage.removeItem("@USERID")
    }


    useEffect(() => {
        const token = localStorage.getItem("@TOKEN")

        const userLoad = async () => {
            try {
                setLoading(true);
                const {data} = await api.get("/profile"
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )
                setUser(data)
                navigate(currentPath)
            } catch (error) {
                console.log(error)
                localStorage.removeItem("@TOKEN")
            }
            finally {
                setLoading(false);
            }
        }
        if (token) {
            userLoad()
        }

    }, [setUser])



    return(
        <UserContext.Provider value={{ user, setUser, userRegister, userLogin, userLogout, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    )
}
