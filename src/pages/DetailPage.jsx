import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveThreadDetail, asyncAddComment } from '../states/threadDetail/slice';

function DetailPage() {
  const { id } = useParams();
  
  // Selector spesifik (perbaikan error "Selector unknown")
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncAddComment({ threadId: id, content }));
    setContent('');
  };

  if (!threadDetail) {
    return <p>Sedang memuat detail...</p>;
  }

  return (
    <section className="detail-page">
      <div className="thread-header">
        <h2>{threadDetail.title}</h2>
        <p>
          Dibuat oleh <strong>{threadDetail.owner.name}</strong>, {new Date(threadDetail.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="thread-body" dangerouslySetInnerHTML={{ __html: threadDetail.body }} />
      
      {authUser && (
        <div className="comment-form">
          <h3>Beri Komentar</h3>
          <form onSubmit={onCommentSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis komentarmu..."></textarea>
            <button type="submit">Kirim</button>
          </form>
        </div>
      )}

      <div className="comments-list">
        <h3>Komentar ({threadDetail.comments.length})</h3>
        {threadDetail.comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <p>
              <strong>{comment.owner.name}</strong> ({new Date(comment.createdAt).toLocaleDateString()})
            </p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DetailPage;