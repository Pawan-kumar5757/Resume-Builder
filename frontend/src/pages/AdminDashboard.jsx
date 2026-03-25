import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Eye, Edit, ShieldAlert } from 'lucide-react';
import ResumePreview from '../components/ResumePreview';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewResume, setViewResume] = useState(null);

  const checkAuth = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Hardcoded simple auth
      setIsAuthenticated(true);
      fetchResumes();
    } else {
      alert('Invalid password');
    }
  };

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/resume');
      setResumes(res.data.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await axios.delete(`/api/resume/${id}`);
      fetchResumes(); // reload
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-sm w-full">
           <div className="flex justify-center mb-4 text-indigo-600"><ShieldAlert size={48} /></div>
           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Access</h2>
           <form onSubmit={checkAuth} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter admin password (admin123)"
                  autoFocus
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors">
                Login
              </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[80vh]">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <button onClick={fetchResumes} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700">Refetch</button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium animate-pulse">Loading Database Entries...</div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">No resumes found in the system.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Created At</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Full Name</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Email</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm">Experience</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map(resume => (
                <tr key={resume._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(resume.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{resume.personalInfo.fullName || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{resume.personalInfo.email || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{resume.experience?.length || 0} roles</td>
                  <td className="px-4 py-3 text-sm text-right flex justify-end gap-2">
                    <button onClick={() => setViewResume(resume)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Layout">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => alert('Full edit UI omitted for brevity, logic exists in backend routes.')} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded transition-colors" title="Edit Data">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(resume._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete Entry">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal View for Resume Layout */}
      {viewResume && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 pt-10 pb-10">
          <div className="bg-gray-100 rounded-xl shadow-2xl relative w-full h-full max-w-5xl flex flex-col">
            <div className="bg-white px-6 py-4 flex justify-between items-center rounded-t-xl border-b border-gray-200">
               <h3 className="text-xl font-bold text-gray-800">Viewing Resume: {viewResume.personalInfo.fullName}</h3>
               <button onClick={() => setViewResume(null)} className="text-gray-500 hover:text-gray-800 text-xl font-bold px-2">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex justify-center pb-20">
               <div className="scale-90 origin-top">
                 <ResumePreview data={viewResume} />
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
