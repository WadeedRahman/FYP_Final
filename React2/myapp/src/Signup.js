import React, { useState } from "react";
import "./Signup.css";
import { RiUser3Fill, RiLockPasswordFill, RiMailAddFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();

        const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_)[a-zA-Z\d_]{4,15}$/;
        if (!usernameRegex.test(username)) {
            toast.error(
                "Username must include lowercase, uppercase, number, underscore (4–15 chars)",
                { position: "top-right", autoClose: 3000 }
            );
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,9}$/;
        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must include lowercase, uppercase, number, symbol (4–9 chars)",
                { position: "top-right", autoClose: 3000 }
            );
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                toast.success("Signup successful! Please login.", {
                    position: "top-right",
                    autoClose: 3000,
                });

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Signup failed", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Network error. Please try again later.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <ToastContainer />

            <div className="wa">
                <div className="signup">
                    <h2 className="heading">SIGNUP</h2>

                    <form className="ff" onSubmit={handleSignup}>
                        <div className="signup-form">
                            <label className="form-label">
                                <RiUser3Fill /> Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="signup-form">
                            <label className="form-label">
                                <RiMailAddFill /> Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="signup-form">
                            <label className="form-label">
                                <RiLockPasswordFill /> Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="signup-button">
                            Submit
                        </button>

                        <div className="signupform-footer">
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
