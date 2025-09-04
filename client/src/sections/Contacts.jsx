import { useRef, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";
import TitleHeader from "../components/TitleHeader";
import LogoAnimation from "../components/LogoAnimation";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [status, setStatus] = useState({ message: "", type: "" });

  const contactOptions = [
    { value: "", label: t("contact_topic_placeholder") },
    { value: "collaborate", label: t("topic_collaborate") },
    { value: "sponsor", label: t("topic_sponsor") },
    { value: "vendor", label: t("topic_vendor") },
    { value: "general", label: t("topic_general") },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: "", type: "" });

    const apiUrl = getApiUrl("contact");

    try {
      const response = await axios.post(apiUrl, form, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        timeout: 10000,
      });

      if (response.data.success) {
        setStatus({ message: t("status_success"), type: "success" });
        setForm({ name: "", email: "", topic: "", message: "" });
      }
    } catch (error) {
      setStatus({ message: t("status_error"), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contatti" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title={t("contact_title")} />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
                <div>
                  <label htmlFor="name">{t("contact_name")}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("contact_name_placeholder")}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email">{t("contact_email")}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("contact_email_placeholder")}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="topic">{t("contact_topic")}</label>
                  <select id="topic" name="topic" value={form.topic} onChange={handleChange} required disabled={loading}>
                    {contactOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message">{t("contact_message")}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contact_message_placeholder")}
                    rows="5"
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">{loading ? t("contact_sending") : t("contact_submit")}</p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>

                {status.message && (
                  <div
                    className={`mt-4 p-4 rounded-lg text-center ${
                      status.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <LogoAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
