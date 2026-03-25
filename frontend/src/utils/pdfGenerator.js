import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generateEncryptedPdf = async (elementId, personalInfo) => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Preview element not found.');

  // Render to canvas
  const canvas = await html2canvas(element, { 
    scale: 2, 
    useCORS: true,
    logging: false
  });
  
  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  
  // Password Logic
  const namePart = (personalInfo?.fullName || 'User').replace(/\s+/g, '');
  let dobPart = '01012000';
  if (personalInfo?.dob) {
    const parts = personalInfo.dob.split('-');
    if (parts.length === 3) {
      dobPart = `${parts[2]}${parts[1]}${parts[0]}`;
    }
  }
  const password = `${namePart}-${dobPart}`;

  // jsPDF implementation with built-in encryption capability
  // Note: standard pdf-lib lacks output encryption support (can only read encrypted files)
  const a4Width = 210;
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    encryption: {
      userPassword: password,
      ownerPassword: password,
      userPermissions: ["print", "modify", "copy", "annot-forms"]
    }
  });

  const imgWidth = a4Width;
  const imgHeight = (canvas.height * a4Width) / canvas.width;
  
  pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  
  // Generate the raw buffer and base64 strings
  const pdfBytes = pdf.output('arraybuffer');
  const dataUri = pdf.output('datauristring');
  const pdfBase64 = dataUri.split(',')[1];
  
  return { pdfBytes, pdfBase64, password };
};

export const downloadPdfBlob = (pdfBytes, filename = 'resume.pdf') => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
