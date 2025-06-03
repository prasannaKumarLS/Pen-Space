import React, { useState } from 'react';
import InputText from './textInput';
import TitleLogo from './projectTitle';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        // Add your login logic here
    };

    return (
        <div className="flex items-center justify-center min-h-screen background-container">
            <div className="background-overlay" />
            <form
                onSubmit={handleSubmit}
                className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-lg shadow-xl w-full max-w-sm relative z-10" >
                <TitleLogo />
                {isSignUp &&
                    (<>
                        {fullName && <h2 className="text-3xl font-semibold text-center mb-6 font-greeting text-gray-800">Hey, {fullName}</h2>}
                        <InputText onChange={e => setFullName(e.target.value)} value={fullName} field="fullName" name="Name" />
                    </>)
                }
                <InputText onChange={e => setUsername(e.target.value)} value={username} field="username" name="Username" />
                <InputText onChange={e => setPassword(e.target.value)} value={password} field="password" name={isSignUp ? "Create Password" : "Password"} />
                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-4">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
                <p className="text-center text-sm text-gray-700">
                    {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
                    <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 hover:underline" >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </form>
        </div>
    );
}
