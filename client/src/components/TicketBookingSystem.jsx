import React, { useState } from 'react';
import { Mail, User, Phone, Download, CheckCircle } from 'lucide-react';

const TicketBookingSystem = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Il nome completo è obbligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Inserisci un indirizzo email valido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateTicketId = () => {
    return 'TICKET-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const generateQRCode = (ticketData) => {
    // Using QR Server API to generate QR code
    const qrData = JSON.stringify({
      ticketId: ticketData.ticketId,
      name: ticketData.fullName,
      email: ticketData.email,
      eventDate: new Date().toISOString(),
      status: 'valid'
    });
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    return qrUrl;
  };

  const saveTicketData = async (ticketData, qrCodeUrl) => {
    try {
      const response = await fetch('/api/tickets/', {  // Adjust URL to match your Django endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(), // If you're using CSRF protection
        },
        body: JSON.stringify({
          full_name: ticketData.fullName,
          email: ticketData.email,
          phone_number: ticketData.phoneNumber,
          ticket_id: ticketData.ticketId,
          qr_code_url: qrCodeUrl,
          created_at: ticketData.createdAt
        })
      });

      if (!response.ok) {
        throw new Error('Impossibile salvare i dati del biglietto');
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error('Errore nel salvare i dati del biglietto:', error);
      return { success: false, error: error.message };
    }
  };

  // Helper function to get CSRF token (if needed)
  const getCsrfToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrftoken') {
        return value;
      }
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate ticket ID
      const newTicketId = generateTicketId();
      
      // Create ticket data
      const ticketData = {
        ...formData,
        ticketId: newTicketId,
        createdAt: new Date().toISOString()
      };
      
      // Generate QR code
      const qrUrl = generateQRCode(ticketData);
      
      // Save ticket data to Django backend
      const saveResult = await saveTicketData(ticketData, qrUrl);
      
      if (saveResult.success) {
        setTicketId(newTicketId);
        setQrCodeUrl(qrUrl);
        setTicketGenerated(true);
      }
      
    } catch (error) {
      console.error('Errore nella generazione del biglietto:', error);
      alert('Si è verificato un errore nella generazione del biglietto. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `ticket-${ticketId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: ''
    });
    setTicketGenerated(false);
    setQrCodeUrl('');
    setTicketId('');
    setErrors({});
  };

  if (ticketGenerated) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Biglietto Generato!</h2>
        <p className="text-gray-600 mb-6">
          Il tuo biglietto gratuito e' stato generato e inviato al tuo indirizzo email.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">ID Biglietto</p>
          <p className="font-mono text-sm font-semibold text-gray-800">{ticketId}</p>
        </div>
        
        <div className="mb-6">
          <img 
            src={qrCodeUrl} 
            alt="QR Code Biglietto" 
            className="mx-auto border-2 border-gray-200 rounded-lg"
          />
        </div>
        
        <div className="space-y-3">
          <button
            onClick={downloadQRCode}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Scarica QR Code
          </button>
          
          <button
            onClick={resetForm}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Genera Altro Biglietto
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Chiudi
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Biglietto Evento Gratuito</h1>
        <p className="text-gray-600">Ottieni il tuo biglietto gratuito con QR code</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Nome Completo *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Inserisci il tuo nome completo"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Indirizzo Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Inserisci il tuo indirizzo email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Numero di Telefono (Opzionale)
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Inserisci il tuo numero di telefono"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Generazione Biglietto...' : 'Ottieni Biglietto Gratuito'}
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          * Campi obbligatori. Il biglietto verra' inviato al tuo indirizzo email.
        </p>
      </div>
    </div>
  );
};

export default TicketBookingSystem;