import { useRef, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

import TitleHeader from "../components/TitleHeader";
import LogoAnimation from "../components/LogoAnimation";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactType: "",
    message: "",
  });

  // Add status state for success/error messages
  const [status, setStatus] = useState({
    message: "",
    type: "" // 'success' or 'error'
  });

  const contactOptions = [
    { value: "", label: "Seleziona un'opzione..." },
    { value: "collabora", label: "Collabora con noi" },
    { value: "sponsor", label: "Diventa Sponsor" },
    { value: "vendor", label: "Diventa Vendor" },
    { value: "generale", label: "Generale" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: "", type: "" }); // Clear previous status

    try {
      const response = await axios.post(
        getApiUrl('contact'), // Uses the API config
        form,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setStatus({
          message: "Messaggio inviato con successo! Ti risponderemo presto.",
          type: "success"
        });
        // Reset form
        setForm({ name: "", email: "", contactType: "", message: "" });
      }
    } catch (error) {
      let errorMessage = "Si è verificato un errore. Riprova più tardi.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        errorMessage = Object.values(errors).flat().join(', ');
      }

      setStatus({
        message: errorMessage,
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contatti" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Contattaci"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Qual'e' il tuo nome??"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Indirizzo email"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="contactTopic">Tipo di Contatto</label>
                  <select
                    id="contactType"
                    name="contactType"
                    value={form.contactTopic}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    {contactOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message">Messaggio</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Come possiamo aiutare?"
                    rows="5"
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Invio..." : "Invia Messaggio"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>

                {/* Status message */}
                {status.message && (
                  <div className={`mt-4 p-4 rounded-lg text-center ${
                    status.type === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className=" w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <LogoAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;