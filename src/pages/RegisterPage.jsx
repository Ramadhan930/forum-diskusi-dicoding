import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import useInput from '../hooks/useInput';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const navigate = useNavigate();

  const onRegister = async (event) => {
    event.preventDefault();
    try {
      await api.register({ name, email, password });
      alert('Pendaftaran berhasil! Silakan login.');
      navigate('/'); // Balik ke login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="register-page">
      <h2>Buat Akun Baru</h2>
      <form onSubmit={onRegister}>
        <input type="text" value={name} onChange={onNameChange} placeholder="Nama Lengkap" required />
        <input type="email" value={email} onChange={onEmailChange} placeholder="Email" required />
        <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>Sudah punya akun? <Link to="/">Login di sini</Link></p>
    </section>
  );
}

export default RegisterPage;