const services = [
  { title: "Study Visa", desc: "Expert support for international students." },
  { title: "Work Permit", desc: "Guidance for overseas employment." },
  { title: "Permanent Residency", desc: "Smooth PR process with expert advice." },
];

export default function Services() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600">{s.title}</h3>
            <p className="text-gray-600 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
