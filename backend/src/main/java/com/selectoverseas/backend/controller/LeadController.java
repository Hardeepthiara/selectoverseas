package com.selectoverseas.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.selectoverseas.backend.model.Lead;
import com.selectoverseas.backend.repository.LeadRepository;
import com.selectoverseas.backend.service.EmailService;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {

    @Autowired
    private LeadRepository leadRepository;
    @Autowired
    private EmailService emailService;
    
    @PostMapping
    public Lead addLead(@RequestBody Lead lead) {
        Lead savedLead = leadRepository.save(lead);
        String subject = "New Lead Submitted: " + savedLead.getName();
        String body = "Name: " + savedLead.getName() + "\n"
                    + "Email: " + savedLead.getEmail() + "\n"
                    + "Phone: " + savedLead.getPhone() + "\n"
                    + "Message: " + savedLead.getMessage();
        emailService.sendLeadNotification("hardeep02.study@gmail.com", subject, body);
        
        String userSubject = "Thank you for contacting Select Overseas!";
        String userBody = "Hi " + savedLead.getName() + ",\n\n"
                        + "Thank you for submitting your inquiry. Our team will contact you soon.\n\n"
                        + "Here is a copy of your submission:\n"
                        + "Phone: " + savedLead.getPhone() + "\n"
                        + "Immigration Type: " + savedLead.getImmigrationType() + "\n"
                        + "Country Preference: " + savedLead.getCountryPref() + "\n"
                        + "Message: " + savedLead.getMessage() + "\n\n"
                        + "Best regards,\nSelect Overseas Team";
        emailService.sendLeadNotification(savedLead.getEmail(), userSubject, userBody);

        return savedLead;
    }
	
    
    @GetMapping
    public List<Lead> getLeads() {
        return leadRepository.findAll();
    }
    @PatchMapping("/{id}")
    public Lead updateStatus(@PathVariable Long id, @RequestBody StatusUpdate statusUpdate) {
        Optional<Lead> optionalLead = leadRepository.findById(id);
        if (optionalLead.isPresent()) {
            Lead lead = optionalLead.get();
            lead.setStatus(statusUpdate.getStatus());
            return leadRepository.save(lead);
        }
        throw new RuntimeException("Lead not found with id: " + id);
    }
    // Schedule appointment
    @PostMapping("/{id}/schedule")
    public Lead scheduleAppointment(@PathVariable Long id, @RequestBody AppointmentRequest request) {
        Optional<Lead> optionalLead = leadRepository.findById(id);
        if (optionalLead.isPresent()) {
            Lead lead = optionalLead.get();
            lead.setAppointment(LocalDateTime.parse(request.getDateTime())); // "yyyy-MM-ddTHH:mm"
            return leadRepository.save(lead);
        }
        throw new RuntimeException("Lead not found with id: " + id);
    }

    // DTO classes
    static class StatusUpdate {
        private String status;
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    static class AppointmentRequest {
        private String dateTime;
        public String getDateTime() { return dateTime; }
        public void setDateTime(String dateTime) { this.dateTime = dateTime; }
    }
    
    
}
