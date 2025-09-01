import React, { useEffect, useState } from 'react';

const API = 'http://localhost:4000/api';

function StudentForm({ onSaved, initial = {}, onCancel }) {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    roll_number: '',
    email: '',
    phone: '',
    class: '',
    section: '',
    dob: '',
    ...initial
  });

  useEffect(() => setForm(f => ({ ...f, ...initial })), [initial]);

  function setField(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    try {
      const url = initial.id ? `${API}/students/${initial.id}` : `${API}/students`;
      const method = initial.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const err = await res.json();
        alert('Error: ' + (err.error || res.statusText));
        return;
      }
      const data = await res.json();
      onSaved(data);
    } catch (err) {
      alert('Network error');
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h3>{initial.id ? 'Edit Student' : 'Add Student'}</h3>
      <div className="grid">
        <input required placeholder="First name" value={form.first_name} onChange={e=>setField('first_name', e.target.value)} />
        <input placeholder="Last name" value={form.last_name} onChange={e=>setField('last_name', e.target.value)} />
        <input required placeholder="Roll number" value={form.roll_number} onChange={e=>setField('roll_number', e.target.value)} />
        <input placeholder="Email" value={form.email} onChange={e=>setField('email', e.target.value)} />
        <input placeholder="Phone" value={form.phone} onChange={e=>setField('phone', e.target.value)} />
        <input placeholder="Class" value={form.class} onChange={e=>setField('class', e.target.value)} />
        <input placeholder="Section" value={form.section} onChange={e=>setField('section', e.target.value)} />
        <input type="date" placeholder="DOB" value={form.dob || ''} onChange={e=>setField('dob', e.target.value)} />
      </div>
      <div className="actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [meta, setMeta] = useState({});

  async function fetchStudents() {
    setFetching(true);
    const res = await fetch(`${API}/students?q=${encodeURIComponent(q)}&page=${page}&limit=10`);
    const payload = await res.json();
    setStudents(payload.data || []);
    setMeta(payload.meta || {});
    setFetching(false);
  }

  useEffect(() => { fetchStudents(); }, [q, page]);

  async function removeStudent(id) {
    if (!confirm('Delete student?')) return;
    await fetch(`${API}/students/${id}`, { method: 'DELETE' });
    fetchStudents();
  }

  function onSaved() {
    setEditing(null);
    fetchStudents();
  }

  return (
    <div className="container">
      <h1>Student Directory</h1>

      <div className="toolbar">
        <input placeholder="Search name / roll / email" value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={()=> setEditing({})}>Add Student</button>
      </div>

      {editing ? (
        <StudentForm initial={editing} onSaved={onSaved} onCancel={() => setEditing(null)} />
      ) : (
        <>
          {fetching ? <div>Loading...</div> : (
            <>
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>#</th><th>Name</th><th>Roll</th><th>Email</th><th>Class</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={s.id}>
                      <td>{(meta.page - 1) * meta.limit + i + 1}</td>
                      <td>{s.first_name} {s.last_name}</td>
                      <td>{s.roll_number}</td>
                      <td>{s.email}</td>
                      <td>{s.class} {s.section ? `(${s.section})` : ''}</td>
                      <td>
                        <button onClick={()=>setEditing(s)}>Edit</button>
                        <button onClick={()=>removeStudent(s.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pager">
                <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
                <span>Page {meta.page || 1} — {meta.total || 0} total</span>
                <button disabled={(meta.page||1)* (meta.limit||10) >= (meta.total||0)} onClick={()=>setPage(p=>p+1)}>Next</button>
              </div>
            </>
          )}
        </>
      )}

    </div>
  );
}
