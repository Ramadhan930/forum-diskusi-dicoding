import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/slice';
import useInput from '../hooks/useInput';

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <h2>Login ke Forum</h2>
      <form onSubmit={onLogin}>
        <input type="email" value={email} onChange={onEmailChange} placeholder="Email" required />
        <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
    </section>
  );
}

export default LoginPage;