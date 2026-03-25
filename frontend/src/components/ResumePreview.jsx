import React from 'react';

const ResumePreview = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // We use direct HEX colors inside this component to bypass the 'oklch' parsing crash in HTML2Canvas which does not support Tailwind CSS v4's oklch profiles.
  return (
    <div className="flex justify-center bg-[#e5e7eb] py-8 a4-wrapper">
       <div id="resume-preview" className="a4-page font-sans text-[#1f2937] bg-white">
         {/* Header */}
         <div className="text-center border-b-2 border-[#1f2937] pb-4 mb-6">
           <h1 className="text-3xl font-bold uppercase tracking-wider text-[#111827]">{personalInfo.fullName || 'YOUR NAME'}</h1>
           <div className="mt-2 text-sm text-[#4b5563] flex justify-center gap-4 flex-wrap">
             {personalInfo.email && <span className="flex items-center gap-1">{personalInfo.email}</span>}
             {personalInfo.phone && <span className="flex items-center gap-1">| {personalInfo.phone}</span>}
             {personalInfo.address && <span className="flex items-center gap-1">| {personalInfo.address}</span>}
           </div>
         </div>

         {/* Summary */}
         {summary && (
           <div className="mb-6">
             <h2 className="text-lg font-bold uppercase border-b border-[#d1d5db] pb-1 mb-2 text-[#1f2937]">Professional Summary</h2>
             <p className="text-sm leading-relaxed text-[#374151] break-words whitespace-pre-wrap">{summary}</p>
           </div>
         )}

         {/* Experience */}
         {experience.length > 0 && experience.some(e => e.company) && (
           <div className="mb-6">
             <h2 className="text-lg font-bold uppercase border-b border-[#d1d5db] pb-1 mb-3 text-[#1f2937]">Experience</h2>
             <div className="flex flex-col gap-4">
               {experience.map((exp, index) => exp.company && (
                 <div key={index}>
                   <div className="flex justify-between items-baseline mb-1">
                     <h3 className="font-bold text-[#111827]">{exp.position}</h3>
                     <span className="text-sm font-medium text-[#4b5563] whitespace-nowrap">
                       {formatDate(exp.startDate)} {exp.startDate || exp.endDate ? '-' : ''} {formatDate(exp.endDate)}
                     </span>
                   </div>
                   <div className="text-sm font-semibold text-[#374151] mb-1">{exp.company}</div>
                   {exp.description && <p className="text-sm text-[#4b5563] break-words whitespace-pre-wrap">{exp.description}</p>}
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Education */}
         {education.length > 0 && education.some(e => e.institution) && (
           <div className="mb-6">
             <h2 className="text-lg font-bold uppercase border-b border-[#d1d5db] pb-1 mb-3 text-[#1f2937]">Education</h2>
             <div className="flex flex-col gap-4">
               {education.map((edu, index) => edu.institution && (
                 <div key={index}>
                   <div className="flex justify-between items-baseline mb-1">
                     <h3 className="font-bold text-[#111827]">{edu.institution}</h3>
                     <span className="text-sm font-medium text-[#4b5563] whitespace-nowrap">
                       {formatDate(edu.startDate)} {edu.startDate || edu.endDate ? '-' : ''} {formatDate(edu.endDate)}
                     </span>
                   </div>
                   <div className="text-sm font-semibold text-[#374151]">{edu.degree}</div>
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Projects */}
         {projects.length > 0 && projects.some(p => p.title) && (
           <div className="mb-6">
             <h2 className="text-lg font-bold uppercase border-b border-[#d1d5db] pb-1 mb-3 text-[#1f2937]">Projects</h2>
             <div className="flex flex-col gap-4">
               {projects.map((proj, index) => proj.title && (
                 <div key={index}>
                   <div className="flex justify-between items-baseline mb-1">
                     <h3 className="font-bold text-[#111827]">
                        {proj.title} {proj.link && <a href={proj.link} className="text-[#4f46e5] text-xs ml-2 font-normal hover:underline" target="_blank" rel="noreferrer">(Link)</a>}
                     </h3>
                   </div>
                   {proj.technologies && <div className="text-sm font-medium italic text-[#4b5563] mb-1">{proj.technologies}</div>}
                   {proj.description && <p className="text-sm text-[#4b5563] break-words whitespace-pre-wrap">{proj.description}</p>}
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Skills */}
         {skills.length > 0 && skills.some(s => s.trim() !== '') && (
           <div>
             <h2 className="text-lg font-bold uppercase border-b border-[#d1d5db] pb-1 mb-3 text-[#1f2937]">Skills</h2>
             <div className="flex flex-wrap gap-x-2 gap-y-1">
               {skills.map((skill, index) => skill.trim() !== '' && (
                 <span key={index} className="text-sm bg-[#f3f4f6] px-2 py-1 rounded text-[#374151] border border-[#e5e7eb]">
                   {skill}
                 </span>
               ))}
             </div>
           </div>
         )}

       </div>
    </div>
  );
};

export default ResumePreview;
