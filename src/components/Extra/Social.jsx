import React, { useState } from 'react';
import './Social.css';

const Social = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = () => {
        setLoading(true);
        // Implement Google OAuth login
        console.log('Google login initiated');
        setLoading(false);
    };

    const handleGithubLogin = () => {
        setLoading(true);
        // Implement GitHub OAuth login
        console.log('GitHub login initiated');
        setLoading(false);
    };

    const handleFacebookLogin = () => {
        setLoading(true);
        // Implement Facebook OAuth login
        console.log('Facebook login initiated');
        setLoading(false);
    };

    return (
        <div className="social-login-container">
            <div className="social-login-card">
                <h2>Sign In</h2>
                
                <div className="email-section">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="email-input"
                    />
                </div>

                <div className="social-buttons">
                    <button 
                        onClick={handleGoogleLogin} 
                        disabled={loading}
                        className="btn btn-google"
                    >
                        Sign in with Google
                    </button>
                    
                    <button 
                        onClick={handleGithubLogin} 
                        disabled={loading}
                        className="btn btn-github"
                    >
                        Sign in with GitHub
                    </button>
                    
                    <button 
                        onClick={handleFacebookLogin} 
                        disabled={loading}
                        className="btn btn-facebook"
                    >
                        Sign in with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Social;