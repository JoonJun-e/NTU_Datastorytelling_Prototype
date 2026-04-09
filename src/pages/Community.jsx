import { useState } from 'react';
import { MessageCircle, Heart, X, Edit2, Send, Trash2 } from 'lucide-react';
import adImage from '../assets/adimage.png';

export default function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      tag: 'Burnout',
      title: 'Anyone else feel guilty for resting?',
      content: 'I hit my $8k/mo target but taking a Sunday off feels like I\'m losing money. How do you disconnect? It feels like the hustle culture has completely rewired my brain to view free time as a failure. Every hour I watch Netflix feels like an hour I could have spent padding my emergency fund. Does the guilt ever go away?',
      likes: 245,
      comments: 84,
      isMine: false
    },
    {
      id: 2,
      tag: 'Career',
      title: 'Negotiating a 4-day work week',
      content: 'Just successfully traded a 15% pay bump for Fridays off. Best decision for my mental health. Here is my script: I focused on productivity and outputs rather than hours. Employers are starting to listen! If you want to know how I pitched it, focus on the async communication systems you plan to put in place to ensure nothing drops.',
      likes: 892,
      comments: 124,
      isMine: false
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [postToDelete, setPostToDelete] = useState(null);

  const handlePostSubmit = () => {
    if (!newTitle || !newContent) return;
    const newPost = {
      id: Date.now(),
      tag: 'Discussion',
      title: newTitle,
      content: newContent,
      likes: 0,
      comments: 0,
      isMine: true
    };
    setPosts([newPost, ...posts]);
    setIsWriting(false);
    setNewTitle('');
    setNewContent('');
  };

  const confirmDelete = (post) => {
    setPostToDelete(post);
  };

  const executeDelete = () => {
    if (postToDelete) {
      setPosts(posts.filter(p => p.id !== postToDelete.id));
      setPostToDelete(null);
      if (selectedPost && selectedPost.id === postToDelete.id) {
        setSelectedPost(null);
      }
    }
  };

  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      <header className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Community</h1>
          <p>Real Gen Z stories</p>
        </div>
        <button className="write-button" onClick={() => setIsWriting(true)}>
          <Edit2 size={16} /> Write
        </button>
      </header>

      <div className="list-spacing">
        {posts.map((post, index) => (
          <>
            <div key={post.id} className="card forum-post clickable" onClick={() => setSelectedPost(post)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="post-tag">{post.tag}</div>
                {post.isMine && (
                  <button
                    className="icon-button"
                    onClick={(e) => { e.stopPropagation(); confirmDelete(post); }}
                    style={{ color: '#c9184a', padding: '4px', margin: '-4px -4px 0 0' }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <h4>{post.title}</h4>
              <p className="line-clamp-2">{post.content}</p>
              <div className="post-meta">
                <span><Heart size={14} /> {post.likes}</span>
                <span><MessageCircle size={14} /> {post.comments}</span>
              </div>
            </div>
            {index === 0 && (
              <div key="ad" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <img src={adImage} alt="Sponsored" style={{ width: '100%', display: 'block' }} />
                <div style={{ background: '#f8f9fa', padding: '4px 10px', fontSize: '10px', color: '#adb5bd', letterSpacing: '0.5px' }}>SPONSORED</div>
              </div>
            )}
          </>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="post-tag">{selectedPost.tag}</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {selectedPost.isMine && (
                  <button className="icon-button" onClick={() => confirmDelete(selectedPost)}>
                    <Trash2 size={20} color="#c9184a" />
                  </button>
                )}
                <button className="close-button inline" onClick={() => setSelectedPost(null)}><X size={20} /></button>
              </div>
            </div>
            <h2 style={{ marginTop: '12px', marginBottom: '16px' }}>{selectedPost.title}</h2>
            <p style={{ lineHeight: 1.6, color: 'var(--color-text-body)' }}>{selectedPost.content}</p>
            <div className="post-meta" style={{ marginTop: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
              <span><Heart size={16} /> {selectedPost.likes} Likes</span>
              <span><MessageCircle size={16} /> {selectedPost.comments} Comments</span>
            </div>
            <p style={{ marginTop: '24px', color: 'var(--color-text-muted)', textAlign: 'center', fontSize: '14px' }}>Be the first to leave a comment!</p>
          </div>
        </div>
      )}

      {/* Write Modal */}
      {isWriting && (
        <div className="modal-overlay" onClick={() => setIsWriting(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>Create Post</h2>
              <button className="close-button inline" onClick={() => setIsWriting(false)}><X size={20} /></button>
            </div>
            <input
              type="text"
              placeholder="Give it a title..."
              className="write-input"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="What's on your mind?"
              className="write-textarea"
              rows="6"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
            ></textarea>
            <button className="submit-button" onClick={handlePostSubmit}>
              <Send size={16} /> Post completely anonymized
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="confirm-overlay" onClick={() => setPostToDelete(null)}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <h3 style={{ marginTop: 0, fontSize: '18px' }}>Delete Post?</h3>
            <p style={{ color: 'var(--color-text-body)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.5 }}>
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="submit-button"
                style={{ backgroundColor: 'var(--color-track)', color: 'var(--color-text-title)' }}
                onClick={() => setPostToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="submit-button"
                style={{ backgroundColor: '#c9184a' }}
                onClick={executeDelete}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
