import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/slice';
import useInput from '../hooks/useInput';

function ThreadInput() {
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');
  const dispatch = useDispatch();

  const onCreateThread = async (event) => {
    event.preventDefault();

    try {
      await dispatch(asyncAddThread({ title, body, category }));

      // Jika berhasil, kosongkan input
      setTitle('');
      setCategory('');
      setBody('');
    } catch {
      //
    }
  };

  return (
    <div
      className='thread-input'
      style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Buat Diskusi Baru</h3>
      <form onSubmit={onCreateThread}>
        <input
          type='text'
          placeholder='Judul Diskusi'
          value={title}
          onChange={onTitleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        <input
          type='text'
          placeholder='Kategori (contoh: react, redux, unp)'
          value={category}
          onChange={onCategoryChange}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        <textarea
          placeholder='Apa yang ingin kamu diskusikan?'
          value={body}
          onChange={onBodyChange}
          required
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            resize: 'vertical',
          }}
        />
        <button
          type='submit'
          style={{
            backgroundColor: '#0066ff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          🚀 Posting Thread
        </button>
      </form>
    </div>
  );
}

export default ThreadInput;
