import React, { useState } from 'react';
import { Download, Printer, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { generateEncryptedPdf, downloadPdfBlob } from '../utils/pdfGenerator';
import axios from 'axios';
import toast from 'react-hot-toast';

const ActionBar = ({ data }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      setIsProcessing(true);
      const { pdfBytes, password } = await generateEncryptedPdf('resume-preview', data.personalInfo);
      setPasswordInfo(password);
      setShowModal(true);

      // Delay download slightly to show modal first
      setTimeout(() => {
        downloadPdfBlob(pdfBytes, `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
        setIsProcessing(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate PDF: ' + err.message);
      setIsProcessing(false);
    }
  };

  const handleEmail = async () => {
    if (!data.personalInfo.email) {
      toast.error("Please enter an email address in Personal Information to send an email.");
      return;
    }
    try {
      setIsProcessing(true);
      const { pdfBase64, password } = await generateEncryptedPdf('resume-preview', data.personalInfo);

      const res = await axios.post('/api/email', {
        toEmail: data.personalInfo.email,
        pdfBase64: pdfBase64,
        password: password
      });
      toast.success(res.data.previewUrl ? `Test Email sent! Check Ethereal console.` : `Resume sent to ${data.personalInfo.email} successfully!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to send email: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWhatsApp = async () => {
    if (!data.whatsappNumber) {
      toast.error("Please enter a WhatsApp number in Personal Info.");
      return;
    }
    try {
      setIsProcessing(true);
      const { pdfBase64, password } = await generateEncryptedPdf('resume-preview', data.personalInfo);

      await axios.post('/api/whatsapp', {
        phone: data.whatsappNumber,
        pdfBase64: pdfBase64,
        password: password
      });

      setWhatsappSent(true);
      toast.success('Sent successfully via Mock WhatsApp!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send WhatsApp message: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white flex flex-col sm:flex-row gap-4 items-center justify-between no-print">
        <div className="flex flex-wrap gap-3 w-full justify-center lg:justify-start">
          <button
            onClick={handlePrint}
            disabled={isProcessing}
            className="flex justify-center items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-all font-semibold text-sm whitespace-nowrap"
          >
            <Printer size={18} /> Print
          </button>
          <button
            onClick={handleDownload}
            disabled={isProcessing}
            className="flex justify-center items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 text-white rounded-xl transition-all font-semibold text-sm whitespace-nowrap"
          >
            <Download size={18} /> Download Secured PDF
          </button>
          <button
            onClick={handleEmail}
            disabled={isProcessing}
            className="flex justify-center items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:-translate-y-0.5 text-white rounded-xl transition-all font-semibold text-sm whitespace-nowrap"
          >
            <Mail size={18} /> Email Resume
          </button>
          {data.whatsappNumber && (
            <button
              onClick={handleWhatsApp}
              disabled={isProcessing || whatsappSent}
              className={`flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-semibold text-sm whitespace-nowrap ${whatsappSent ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-md shadow-green-500/20 hover:shadow-lg hover:-translate-y-0.5 text-white'}`}
            >
              {whatsappSent ? <CheckCircle size={18} /> : <MessageCircle size={18} />}
              {whatsappSent ? 'Sent to WA' : 'Send via WhatsApp'}
            </button>
          )}
        </div>
        {isProcessing && <div className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold animate-pulse whitespace-nowrap">Processing...</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-300 border border-white">
            <h3 className="text-xl font-extrabold text-slate-800 mb-3 flex items-center gap-2"><div className="w-1.5 h-6 bg-blue-500 rounded-full"></div> Success! PDF Encrypted</h3>
            <p className="text-slate-600 font-medium mb-5">
              Your resume PDF is downloading and has been password-protected for your security.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 mb-6 shadow-inner">
              <p className="text-sm text-blue-900 font-bold mb-2">Your Resume Password format is <code className="bg-white px-2 py-0.5 rounded-md border border-blue-200 font-mono text-blue-600">UserName-DOB</code>.</p>
              <p className="text-sm text-blue-800 font-medium mb-3">Example: JohnDoe-15081995</p>
              <div className="mt-4 pt-4 border-t border-blue-200/50">
                <span className="text-xs text-blue-500 font-extrabold uppercase tracking-wider block mb-1.5">Generated Password:</span>
                <code className="text-lg bg-white px-4 py-1.5 rounded-lg border border-blue-200 font-mono text-slate-800 select-all shadow-sm font-bold block w-max">{passwordInfo}</code>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-6">You will need this password to open your exported resume file.</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-800/20 active:scale-[0.98]"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionBar;
