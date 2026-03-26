import React, { useState } from 'react'
import "../style/signup.scss"
import Formgroup from '../components/Fromgroup'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const { loading, handleSignup } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        
        if (!formData.username || !formData.email || !formData.password) {
            alert("All fields are required")
            return
        }

        const success = await handleSignup(formData)

        if (success) {
            navigate("/")
        }
    }

    return (
        <main className='signup-form'>
            <div className='signup-form-container'>
                <h1>Signup</h1>

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

                    <button type='submit' disabled={loading}>
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Signup