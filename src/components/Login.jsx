import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in user:", user);
                console.log("Firebase Auth Object:", auth); 
                navigate("/notes");
            })
            .catch((error) => {
                console.error("Error logging in:", error.message);
            });

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="border rounded-md p-2 w-full mb-4"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input
                        className="border rounded-md p-2 w-full"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md mt-4"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-between mt-4 text-sm">
                    <Link
                        to="/signup"
                        className="bg-gray-200 text-blue-600 hover:underline p-2 rounded-lg block text-right">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
