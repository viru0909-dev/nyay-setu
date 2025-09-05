# Nyay-Setu ⚖️

A **5G-powered virtual judiciary system** prototype that enables secure, remote court hearings.  
Nyay-Setu bridges the gap between citizens and the justice system by allowing judges, lawyers, and victims to connect virtually—saving time, cost, and risk.

---

## 🚀 Features
- **Remote Court Hearings** – Seamless video conferencing using WebRTC/5G.  
- **Digital Evidence Management** – Upload, verify, and store case evidence.  
- **Chain-of-Custody with Blockchain** – Immutable record of evidence integrity.  
- **Audit Logging** – Every action is tracked for accountability.  
- **Secure Architecture** – Spring Boot backend with JWT authentication and React frontend.  

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite  
- **Backend:** Spring Boot  
- **Database:** PostgreSQL  
- **Storage:** MinIO / S3  
- **Video Calls:** WebRTC (Jitsi/Janus)  
- **Blockchain (Optional):** web3j (for evidence anchoring)  

---

## 📂 Project Structure
nyay-setu/
├── nyay-setu-api/     # Spring Boot backend
├── nyay-setu-web/     # React + Vite frontend
└── nyay-setu-infra/   # Docker, config, infra setup
---

## 🎯 Problem it Solves
Currently, citizens from remote states must physically travel to higher courts (e.g., Tamil Nadu → Delhi for Supreme Court).  
This causes:
- High travel cost  
- Life threats to victims/witnesses  
- Delays and risk of evidence tampering  

**Nyay-Setu reduces the distance to justice to the latency of a 5G call.**

---

## 📸 Demo Flow (MVP)
1. User logs in (Judge, Lawyer, Victim, Clerk).  
2. Case is created → hearing scheduled.  
3. Participants join via **secure video room**.  
4. Victim uploads evidence → system generates **SHA-256 hash + Certificate PDF**.  
5. Judge views case, verifies integrity, and issues order.  
6. All logs and recordings are stored securely.  

---

## 🔒 Compliance & Security
- Data Privacy: Aligns with **DPDP Act 2023**  
- Electronic Evidence: Supports **Bharatiya Sakshya Adhiniyam, 2023**  
- Role-based Access Control (RBAC)  
- TLS Encryption + Hash-based Integrity  

---

## 👨‍💻 Author
**Virendra Gadekar** ([@viru0909-dev](https://github.com/viru0909-dev))  
Hardworking BCA student, passionate about **Java Full-Stack Development** and building impactful tech solutions.  

---

## 📌 Status
🚧 Work in Progress – Prototype for Hackathon 2025  
