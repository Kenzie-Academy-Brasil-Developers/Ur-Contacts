import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../pages/LoginPage/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";


interface UserProviderProps {
    children: ReactNode
}

interface UserContextValues {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  userLogin: (data: LoginData) => void;
  userLogout: () => void;
  loading: boolean;
  isOpenEditUser: boolean;
  setIsOpenEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenRemoveUser: boolean;
  setIsOpenRemoveUser: React.Dispatch<React.SetStateAction<boolean>>;
  userRegister: (formData: any) => void;
  deleteUser: (userId: string) => void;
  editUser: (formData: any, userId: string) => void;
}



export const UserContext = createContext<UserContextValues>({} as UserContextValues)

export const UserProvider = ({ children }: UserProviderProps) => {
    
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isOpenEditUser, setIsOpenEditUser] = useState(false);
    const [isOpenRemoveUser, setIsOpenRemoveUser] = useState(false);

    const currentPath = window.location.pathname

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

    const deleteUser = async (userId: string) => {
        try {
          const token = localStorage.getItem("@TOKEN");
    
          await api.delete(`/clients/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTimeout(() => {navigate("/")} , 3000);
        } catch (error) {
          console.log(error);
        }
      };


    const editUser = async (formData, userId: string) => {
        try {
          const token = localStorage.getItem("@TOKEN");
          
          const newUser = {
            id: userId,
            ...formData,
          };
          console.log(newUser)
          console.log(typeof(userId))
          
          const { data } = await api.patch(`/clients/${userId}`, newUser, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setUser((user) => {if (user && user.id === userId) {
            return { ...user, ...data };
          } else {
            return user;
          }})

        } catch (error) {
          console.log(error);
        }
      };


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
        <UserContext.Provider value={{ user, setUser, userRegister, userLogin, userLogout, deleteUser, editUser, loading, setLoading, isOpenEditUser, setIsOpenEditUser, isOpenRemoveUser, setIsOpenRemoveUser }}>
            {children}
        </UserContext.Provider>
    )
}
