import React, { useEffect, useState } from "react";
import ScheduleModal from "../components/ScheduleModal";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:8080/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLeads((prev) =>
      prev.map((lead) => (lead._id === id ? { ...lead, status } : lead))
    );
  };

  const scheduleAppointment = async (id, { date, time }) => {
    await fetch(`http://localhost:8080/api/leads/${id}/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time }),
    });
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === id ? { ...lead, appointment: `${date} ${time}` } : lead
      )
    );
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Leads Management</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Appointment</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td className="border p-2">{lead.name}</td>
              <td className="border p-2">{lead.email}</td>
              <td className="border p-2">{lead.message}</td>
              <td className="border p-2">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="border p-2">
                {lead.appointment ? lead.appointment : "Not scheduled"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => {
                    setSelectedLead(lead);
                    setModalOpen(true);
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Schedule
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ScheduleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={scheduleAppointment}
        lead={selectedLead}
      />
    </div>
  );
}
