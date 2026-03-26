import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { Signup, Login, getMe, Logout } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }

    const { user, setuser, loading, setloading } = context

    const handleSignup = async ({ username, email, password }) => {
        setloading(true)
        try {
            const data = await Signup({ username, email, password })
            setuser(data.user)
            return true   
        } catch (error) {
            console.log("Error in handleSignup", error.message)
            return false 
        } finally {
            setloading(false)
        }
    }

    const handleLogin = async ({ username, email, password }) => {
        setloading(true)
        try {
            const data = await Login({ username, email, password })
            setuser(data.user)
            return true   
        } catch (error) {
            console.log("Error in handleLogin", error.message)
            return false  
        } finally {
            setloading(false)
        }
    }

    const handleGetMe = async () => {
        setloading(true)
        try {
            const data = await getMe()
            setuser(data.user)
            return true
        } catch (error) {
            console.log("Error in handleGetMe", error.message)
            return false
        } finally {
            setloading(false)
        }
    }

    const handleLogout = async () => {
        setloading(true)
        try {
            await Logout()
            setuser(null)
            return true
        } catch (error) {
            console.log("Error in handleLogout", error.message)
            return false
        } finally {
            setloading(false)
        }
    }

   useEffect(() => {
    handleGetMe()
   }, [])

    return {
        user,
        loading,
        handleSignup,
        handleLogin,
        handleGetMe,
        handleLogout
    }
}