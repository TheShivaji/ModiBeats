import React, { useState } from 'react'
import "../style/login.scss"
import Formgroup from '../components/Fromgroup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const navigate = useNavigate()
    const { loading, handleLogin } = useAuth()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        
        if (!formData.email || !formData.password) {
            alert("Email and Password required")
            return
        }

        const success = await handleLogin(formData)

        if (success) {
            navigate("/")
        }
    }

    return (
        <main className='login-form'>
            <div className='login-form-container'>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <Formgroup
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                    />

                    <Formgroup
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    <Formgroup
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <button >
                        Login
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Login