import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/leads", form);
      alert("✅ Form submitted successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <section className="max-w-xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Contact Us
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
