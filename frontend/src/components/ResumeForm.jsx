import React from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1.5 mb-5">
    <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium"
    />
  </div>
);

const SectionHeader = ({ title, onAdd }) => (
  <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
    <h4 className="text-xl font-bold text-slate-800">{title}</h4>
    {onAdd && (
      <button type="button" onClick={onAdd} className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
        <Plus size={16} strokeWidth={3} /> Add
      </button>
    )}
  </div>
);

const ResumeForm = ({ data, onUpdate, onAdd, onRemove }) => {
  return (
    <div className="flex flex-col gap-10 pb-10">
      
      {/* Personal Info */}
      <section className="bg-white">
        <SectionHeader title="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <InputField label="Full Name" value={data.personalInfo.fullName} onChange={e => onUpdate('personalInfo', 'fullName', e.target.value)} placeholder="E.g. John Doe" />
          <InputField label="Email" type="email" value={data.personalInfo.email} onChange={e => onUpdate('personalInfo', 'email', e.target.value)} placeholder="john@example.com" />
          <InputField label="Phone" type="tel" value={data.personalInfo.phone} onChange={e => onUpdate('personalInfo', 'phone', e.target.value)} placeholder="+1 234 567 890" />
          <InputField label="Date of Birth" type="date" value={data.personalInfo.dob} onChange={e => onUpdate('personalInfo', 'dob', e.target.value)} />
          <div className="col-span-1 md:col-span-2">
            <InputField label="Address" value={data.personalInfo.address} onChange={e => onUpdate('personalInfo', 'address', e.target.value)} placeholder="123 Main St, City, Country" />
          </div>
          <div className="col-span-1 md:col-span-2">
             <InputField label="WhatsApp Number (For sharing)" type="tel" value={data.whatsappNumber} onChange={e => onUpdate('whatsappNumber', null, e.target.value)} placeholder="+1234567890" />
          </div>
        </div>
      </section>

      {/* Summary */}
      <section>
        <SectionHeader title="Professional Summary" />
        <textarea 
          value={data.summary}
          onChange={e => onUpdate('summary', null, e.target.value)}
          rows="4"
          placeholder="Brief overview of your professional background..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium resize-none"
        />
      </section>

      {/* Experience */}
      <section>
        <SectionHeader title="Work Experience" onAdd={() => onAdd('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })} />
        <div className="flex flex-col gap-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-blue-200 transition-colors">
               <button type="button" onClick={() => onRemove('experience', index)} className="absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white p-2 rounded-full transition-colors shadow-sm cursor-pointer z-10 opacity-0 group-hover:opacity-100">
                 <Trash2 size={16} strokeWidth={2.5} />
               </button>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                 <InputField label="Company" value={exp.company} onChange={e => onUpdate('experience', 'company', e.target.value, index)} placeholder="Google" />
                 <InputField label="Position" value={exp.position} onChange={e => onUpdate('experience', 'position', e.target.value, index)} placeholder="Software Engineer" />
                 <InputField label="Start Date" type="month" value={exp.startDate} onChange={e => onUpdate('experience', 'startDate', e.target.value, index)} />
                 <InputField label="End Date" type="month" value={exp.endDate} onChange={e => onUpdate('experience', 'endDate', e.target.value, index)} />
                 <div className="col-span-1 md:col-span-2">
                   <label className="text-sm font-semibold text-slate-700 ml-1 mb-1.5 block">Description</label>
                   <textarea value={exp.description} onChange={e => onUpdate('experience', 'description', e.target.value, index)} rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium" placeholder="Led a team of 5..."></textarea>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionHeader title="Education" onAdd={() => onAdd('education', { institution: '', degree: '', startDate: '', endDate: '', description: '' })} />
        <div className="flex flex-col gap-6">
          {data.education.map((edu, index) => (
             <div key={index} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-blue-200 transition-colors">
                <button type="button" onClick={() => onRemove('education', index)} className="absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white p-2 rounded-full transition-colors shadow-sm cursor-pointer z-10 opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                   <InputField label="Institution" value={edu.institution} onChange={e => onUpdate('education', 'institution', e.target.value, index)} placeholder="University of Tech" />
                   <InputField label="Degree" value={edu.degree} onChange={e => onUpdate('education', 'degree', e.target.value, index)} placeholder="B.S. Computer Science" />
                   <InputField label="Start Date" type="month" value={edu.startDate} onChange={e => onUpdate('education', 'startDate', e.target.value, index)} />
                   <InputField label="End Date" type="month" value={edu.endDate} onChange={e => onUpdate('education', 'endDate', e.target.value, index)} />
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionHeader title="Skills" onAdd={() => onAdd('skills', '')} />
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-100 p-1.5 pl-3 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
               <input 
                 type="text" 
                 value={skill} 
                 onChange={e => onUpdate('skills', null, e.target.value, index)} 
                 placeholder="E.g. React"
                 className="outline-none bg-transparent w-28 text-slate-700 font-medium"
               />
               <button type="button" onClick={() => onRemove('skills', index)} className="text-slate-400 hover:text-red-500 bg-white shadow-sm p-1.5 rounded-lg transition-colors">
                 <Trash2 size={14} />
               </button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <SectionHeader title="Projects" onAdd={() => onAdd('projects', { title: '', technologies: '', link: '', description: '' })} />
        <div className="flex flex-col gap-6">
          {data.projects.map((proj, index) => (
             <div key={index} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-blue-200 transition-colors">
                <button type="button" onClick={() => onRemove('projects', index)} className="absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white p-2 rounded-full transition-colors shadow-sm cursor-pointer z-10 opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                   <InputField label="Project Title" value={proj.title} onChange={e => onUpdate('projects', 'title', e.target.value, index)} placeholder="Resume Builder" />
                   <InputField label="Technologies" value={proj.technologies} onChange={e => onUpdate('projects', 'technologies', e.target.value, index)} placeholder="React, Node.js" />
                   <div className="col-span-1 md:col-span-2">
                     <InputField label="Project Link" type="url" value={proj.link} onChange={e => onUpdate('projects', 'link', e.target.value, index)} placeholder="https://github.com/..." />
                   </div>
                   <div className="col-span-1 md:col-span-2">
                     <label className="text-sm font-semibold text-slate-700 ml-1 mb-1.5 block">Description</label>
                     <textarea value={proj.description} onChange={e => onUpdate('projects', 'description', e.target.value, index)} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium" placeholder="Built a full-stack App..."></textarea>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeForm;
