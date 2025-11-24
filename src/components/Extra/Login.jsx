import React, { useState } from "react";

/**
 * Simple, accessible login component.
 *
 * Props:
 * - endpoint: API endpoint to POST { email, password, remember } (default: /api/auth/login)
 * - onSuccess: function(responseData) called on successful login
 *
 * Usage:
 * <Login endpoint="/api/login" onSuccess={(data) => { ... }} />
 */
export default function Login({ endpoint = "/api/auth/login", onSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validate = () => {
        if (!email.trim()) return "Email is required.";
        // simple email check
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email)) return "Enter a valid email address.";
        if (!password) return "Password is required.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, remember }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                // prefer server message, fallback to status text
                setError(data?.message || res.statusText || "Login failed");
                setLoading(false);
                return;
            }

            setLoading(false);
            if (typeof onSuccess === "function") onSuccess(data);
            else console.log("Login success:", data);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Network error");
        }
    };

    const inputStyle = {
        display: "block",
        width: "100%",
        padding: "8px 10px",
        marginBottom: "10px",
        borderRadius: 4,
        border: "1px solid #ccc",
        boxSizing: "border-box",
    };

    const labelStyle = { fontSize: 14, marginBottom: 6, display: "block" };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ maxWidth: 360, margin: "0 auto", fontFamily: "system-ui, Arial" }}
            aria-live="polite"
            noValidate
        >
            <div style={{ marginBottom: 12 }}>
                <label htmlFor="login-email" style={labelStyle}>
                    Email
                </label>
                <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    autoComplete="email"
                    required
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <label htmlFor="login-password" style={labelStyle}>
                    Password
                </label>
                <div style={{ position: "relative" }}>
                    <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ ...inputStyle, paddingRight: 40 }}
                        autoComplete="current-password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        style={{
                            position: "absolute",
                            right: 6,
                            top: 6,
                            height: 32,
                            padding: "0 8px",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <input
                    id="login-remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    style={{ marginRight: 8 }}
                />
                <label htmlFor="login-remember" style={{ fontSize: 14 }}>
                    Remember me
                </label>
            </div>

            {error && (
                <div
                    role="alert"
                    style={{
                        marginBottom: 12,
                        color: "#b00020",
                        background: "#fff0f1",
                        padding: "8px 10px",
                        borderRadius: 4,
                        fontSize: 14,
                    }}
                >
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "10px 12px",
                    background: "#0366d6",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: loading ? "default" : "pointer",
                }}
            >
                {loading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}