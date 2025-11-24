import React, { useState } from "react";

/**
 * Simple Signup component
 * - Controlled inputs: name, email, password, confirmPassword
 * - Basic client-side validation
 * - POSTs JSON to /api/signup (replace with your endpoint)
 * - Shows loading, success, and error states
 */

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    const emailIsValid = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    function validate() {
        const errs = [];
        if (!form.name.trim()) errs.push("Name is required.");
        if (!form.email.trim()) errs.push("Email is required.");
        else if (!emailIsValid(form.email)) errs.push("Email is invalid.");
        if (!form.password) errs.push("Password is required.");
        else if (form.password.length < 6)
            errs.push("Password must be at least 6 characters.");
        if (form.password !== form.confirmPassword)
            errs.push("Passwords do not match.");
        return errs;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setSuccess("");
        const validation = validate();
        if (validation.length) {
            setErrors(validation);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    password: form.password,
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                const message = data.error || data.message || "Signup failed.";
                setErrors([message]);
            } else {
                setSuccess("Signup successful. You can now log in.");
                setForm({ name: "", email: "", password: "", confirmPassword: "" });
            }
        } catch (err) {
            setErrors(["Network error. Please try again."]);
        } finally {
            setLoading(false);
        }
    }

    function updateField(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div style={{ maxWidth: 420, margin: "0 auto", padding: 16 }}>
            <h2>Sign up</h2>

            {errors.length > 0 && (
                <div style={{ color: "crimson", marginBottom: 12 }}>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            {success && (
                <div style={{ color: "green", marginBottom: 12 }}>{success}</div>
            )}

            <form onSubmit={handleSubmit}>
                <label style={{ display: "block", marginBottom: 8 }}>
                    Name
                    <input
                        name="name"
                        value={form.name}
                        onChange={updateField}
                        type="text"
                        autoComplete="name"
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 8 }}>
                    Email
                    <input
                        name="email"
                        value={form.email}
                        onChange={updateField}
                        type="email"
                        autoComplete="email"
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 8 }}>
                    Password
                    <input
                        name="password"
                        value={form.password}
                        onChange={updateField}
                        type="password"
                        autoComplete="new-password"
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 12 }}>
                    Confirm Password
                    <input
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={updateField}
                        type="password"
                        autoComplete="new-password"
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "10px 16px",
                        background: "#0366d6",
                        color: "#fff",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Signing up..." : "Sign up"}
                </button>
            </form>
        </div>
    );
}