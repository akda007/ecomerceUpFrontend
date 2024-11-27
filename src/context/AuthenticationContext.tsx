import { createContext, FC, ReactNode, useContext, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface AuthContextType {
    token: string | null
    login: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false
})

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

    const navigate = useNavigate()

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            logout()
            navigate("/login")
          }
          return Promise.reject(error);
        }
    );

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    const isAuthenticated = () => {
        if (!token) return false

        try {
            const decoded = jwtDecode(token)

            return decoded.exp ? decoded.exp > Date.now() / 1000 : false;
        } catch {
            return false
        }
    }


    return (
        <AuthContext.Provider value={{
            token,
            login,
            logout,
            isAuthenticated: isAuthenticated()
        }}>
            {children}
        </AuthContext.Provider>
    )    
}


export const useAuth = () => useContext(AuthContext)