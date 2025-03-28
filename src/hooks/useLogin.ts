import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function useLogin()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email.trim()) return setError("Email is required!");
        if (!isValidEmail(email)) return setError("Invalid email format!");
        if (!password.trim()) return setError("Password is required!");
        if (password.length < 6) return setError("Password must be at least 6 characters long!");

        try {
            const response = await fetch(`https://reqres.in/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("Invalid credentials. Please try again.");
                }
                throw new Error("Something went wrong. Please try again later.");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/users");
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
    };

    return {handleLogin,setEmail,email,password,setPassword,error,setError,navigate}
}

export default useLogin;