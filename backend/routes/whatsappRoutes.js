import express from 'express';

const router = express.Router();

// Mock endpoint for WhatsApp API
router.post('/', async (req, res) => {
  const { phone, pdfBase64, password } = req.body;
  
  if (!phone || !pdfBase64) {
    return res.status(400).json({ success: false, error: 'Phone and PDF data are required' });
  }

  // MOCK EXECUTION
  // In a real scenario, you'd use Twilio API here, uploading the PDF to an accessible URL 
  // or sending it via WhatsApp media messages.
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`[MOCK WHATSAPP] Sending document to ${phone}. Password required: ${password}`);
    
    res.json({ 
      success: true, 
      message: 'Document successfully sent via WhatsApp (Mocked)',
      deliveredTo: phone
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'WhatsApp sending failed' });
  }
});

export default router;
