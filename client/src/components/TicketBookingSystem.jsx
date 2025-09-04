import React, { useState } from 'react';
import { Mail, User, Phone, Download, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TicketBookingSystem = ({ onClose }) => {
  const { t } = useTranslation();

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
      newErrors.fullName = t('fullName_required');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('email_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('email_invalid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateTicketId = () => {
    return 'TICKET-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const generateQRCode = (ticketData) => {
    const qrData = JSON.stringify({
      ticketId: ticketData.ticketId,
      name: ticketData.fullName,
      email: ticketData.email,
      eventDate: new Date().toISOString(),
      status: 'valid'
    });
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
  };

  const saveTicketData = async (ticketData, qrCodeUrl) => {
    try {
      const response = await fetch('/api/tickets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
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
        throw new Error(t('ticket_save_error'));
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error(t('ticket_save_error'), error);
      return { success: false, error: error.message };
    }
  };

  const getCsrfToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrftoken') return value;
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const newTicketId = generateTicketId();
      const ticketData = { ...formData, ticketId: newTicketId, createdAt: new Date().toISOString() };
      const qrUrl = generateQRCode(ticketData);
      const saveResult = await saveTicketData(ticketData, qrUrl);

      if (saveResult.success) {
        setTicketId(newTicketId);
        setQrCodeUrl(qrUrl);
        setTicketGenerated(true);
      }
    } catch (error) {
      alert(t('ticket_generation_error'));
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
    setFormData({ fullName: '', email: '', phoneNumber: '' });
    setTicketGenerated(false);
    setQrCodeUrl('');
    setTicketId('');
    setErrors({});
  };

  if (ticketGenerated) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('ticket_generated')}</h2>
        <p className="text-gray-600 mb-6">{t('ticket_generated_message')}</p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">{t('ticket_id')}</p>
          <p className="font-mono text-sm font-semibold text-gray-800">{ticketId}</p>
        </div>

        <div className="mb-6">
          <img src={qrCodeUrl} alt={t('ticket_qr_code')} className="mx-auto border-2 border-gray-200 rounded-lg" />
        </div>

        <div className="space-y-3">
          <button onClick={downloadQRCode} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> {t('download_qr')}
          </button>
          <button onClick={resetForm} className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            {t('generate_another_ticket')}
          </button>
          {onClose && (
            <button onClick={onClose} className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
              {t('close')}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('free_event_ticket')}</h1>
        <p className="text-gray-600">{t('free_ticket_qr_message')}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" /> {t('full_name')} *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder={t('enter_full_name')}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" /> {t('email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder={t('enter_email')}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1" /> {t('phone_number_optional')}
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder={t('enter_phone_number')}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? t('ticket_generating') : t('get_free_ticket')}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">{t('required_fields_note')}</p>
      </div>
    </div>
  );
};

export default TicketBookingSystem;
