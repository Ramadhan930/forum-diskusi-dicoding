import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';

function AddThreadPage() {
  const navigate = useNavigate();

  const onAddThreadSuccess = () => {
    navigate('/'); // Balik ke home setelah berhasil posting
  };

  return (
    <section className="add-thread-page">
      <h2>Buat Diskusi Baru</h2>
      <ThreadInput onAddSuccess={onAddThreadSuccess} />
    </section>
  );
}

export default AddThreadPage;