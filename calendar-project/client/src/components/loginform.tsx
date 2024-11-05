import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLogin: (token: string) => void;
}

interface FormState {
  username: string;
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [action, setAction] = React.useState<"Login" | "Sign Up">("Login");
  const [formState, setFormState] = React.useState<FormState>({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (action === "Login") {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.email,
            password: formState.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Login failed!');
        }

        const data = await response.json();
        console.log("Logged in successfully:", data);

        localStorage.setItem('yourToken', data.token);

        onLogin(data.token);
        navigate('/app');
      } catch (error) {
        console.error(error);
        alert('Login failed! Please check your credentials.');
      }
    } else {
      console.log("Signing up with:", formState.username, formState.email, formState.password);
      alert("Signup successful! You can now log in.");
      setAction("Login");
    }
  };

  return (
    <div className='login-container'>
      <div className="login-header">
        <div className="login-text">{action}</div>
        <div className="login-underline"></div>
      </div>
      <form className="login-inputs" onSubmit={handleSubmit}>
        {action === "Sign Up" && (
          <div className="login-input">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formState.username} 
              onChange={handleChange} 
              required 
            />
          </div>
        )}
        <div className="login-input">
          <input 
            type="email" 
            name="email" 
            placeholder="Email ID" 
            value={formState.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="login-input">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formState.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        {action === "Login" ? (
          <div className="forgot-password">Forgot Password? <span>Click Here</span></div>
        ) : null}
        <div className="submit-container">
          <button type="submit" className="submit">{action}</button>
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;