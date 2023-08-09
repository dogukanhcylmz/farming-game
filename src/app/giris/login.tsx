import { useRouter } from "next/navigation";
import { object, string } from 'yup';
import { useState } from 'react';

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const user = {
        Username: "dogukan",
        Password: "123123123"
    };

    let userSchema = object({
        Username: string().required(),
        Password: string().required().min(8).max(15),
    });

    const validateUser = async () => {
        try {
            const enteredUser = {
                Username: username,
                Password: password
            };
            const validatedUser = await userSchema.validate(enteredUser);
            console.log('Validation successful. User:', validatedUser);
            router.push('/game'); // Doğrulama başarılıysa /game'e yönlendir

        } catch (error: any) {
            console.error('Validation error:', error.message);
            alert("Invalid username or password. Try again");
        }
    }

    return (
        <div className="login-container">
            <div className="welcome-section">
                <h3>Welcome to</h3>
                <h1>Basic Farming Simulator</h1>
            </div>
            <div className="login-section">
                <form className="login-form">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={validateUser}>Login</button>
                </form>
            </div>
        </div>
    );
}
