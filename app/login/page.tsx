"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css"

function LoginPage() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className="mb-6 text-center">
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>
                        Please enter your credentials to sign in
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="name"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </form>

                <div className={styles.footer}>
                    Don’t have an account?{" "}
                    <Link href="/register" className="font-medium text-black hover:underline">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage