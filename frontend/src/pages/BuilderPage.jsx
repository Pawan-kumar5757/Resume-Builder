import React, { useState } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import ActionBar from '../components/ActionBar';

const initialResumeData = {
  personalInfo: { fullName: '', email: '', phone: '', address: '', dob: '' },
  summary: '',
  education: [],
  experience: [],
  skills: [''],
  projects: [],
  whatsappNumber: ''
};

const BuilderPage = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);

  const handleUpdate = (section, field, value, index = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        if (field) {
          newData[section][index][field] = value;
        } else {
          newData[section][index] = value;
        }
      } else if (field) {
        newData[section][field] = value;
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };

  const addItem = (section, defaultItem) => {
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], defaultItem] }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const saveToBackend = async () => {
    try {
      await axios.post('/api/resume', { resumeData });
      toast.success('Resume data saved to database successfully!');
    } catch (err) {
      toast.error('Failed to save data. See console.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Top Controller */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-white">
        <div>
           <h2 className="text-xl font-bold text-slate-800">Create Your Resume</h2>
           <p className="text-sm text-slate-500 font-medium">Real-time dynamic updates</p>
        </div>
        <button 
          onClick={saveToBackend}
          className="mt-4 sm:mt-0 px-6 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Save size={18} /> Save Progress
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Pane - Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden hide-scrollbar flex flex-col lg:max-h-[82vh]">
           <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-slate-100 p-6">
              <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                 <div className="w-2 h-6 bg-blue-500 rounded-full"></div> Detail Input
              </h3>
           </div>
           <div className="p-6 overflow-y-auto">
             <ResumeForm 
               data={resumeData} 
               onUpdate={handleUpdate} 
               onAdd={addItem} 
               onRemove={removeItem}
             />
           </div>
        </div>

        {/* Right Pane - Preview */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
           <ActionBar data={resumeData} />
           
           <div className="bg-slate-200/50 rounded-3xl p-6 overflow-x-auto shadow-inner flex lg:justify-center items-start lg:max-h-[82vh] lg:overflow-y-auto">
             <div className="origin-top shadow-2xl min-w-max">
               <ResumePreview data={resumeData} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
