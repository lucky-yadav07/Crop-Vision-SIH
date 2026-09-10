<div align="center">
  # 🌾 Crop-Vision: AI-Powered Crop Disease Detection & Advisory System
  ### Smart India Hackathon (SIH) Project
  <p align="center">
    An intelligent precision agriculture platform leveraging computer vision and deep learning to diagnose crop diseases in real time and deliver actionable advisory solutions to farmers.
  </p>
  <!-- Badges -->
  <p align="center">
    <img src="https://img.shields.io/badge/SIH-2024%2F2025-orange?style=for-the-badge" alt="SIH" />
    <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/PyTorch%20%2F%20TensorFlow-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="Framework" />
    <img src="https://img.shields.io/badge/FastAPI%20%2F%20Flask-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="Backend" />
    <img src="https://img.shields.io/badge/React%20%2F%20Flutter-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Frontend" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  </p>
  <p align="center">
    <a href="#-problem-statement">Problem Statement</a> •
    <a href="#-features">Features</a> •
    <a href="#-system-architecture">Architecture</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-team-members">Team</a>
  </p>
</div>
---
## 📌 Problem Statement
- **Problem Statement ID:** `<Your SIH PS ID, e.g., SIH1234>`
- **Problem Title:** AI-based Crop Health Monitoring and Early Disease Detection
- **Organization / Ministry:** Ministry of Agriculture & Farmers Welfare / Government of India
- **Domain:** Smart Agriculture / Artificial Intelligence
### The Challenge
Crop diseases and pests cause significant yield loss annually across agricultural sectors. Smallholder farmers often lack access to timely agronomic expertise, resulting in delayed treatments, misuse of pesticides, and financial losses. 
### Our Solution
**Crop-Vision** provides an end-to-end automated platform that allows farmers and field workers to upload leaf imagery, receive instant disease classifications with confidence scores, and get localized treatment and fertilizer advisories.
---
## 🚀 Key Features
- **Instant Leaf Disease Diagnosis:** Deep learning-based image classification for multiple crop types (Tomato, Potato, Corn, Wheat, Rice, etc.).
- **Confidence & Severity Scoring:** Transparent confidence estimation and visual heatmaps/bounding boxes.
- **Multilingual Agronomic Advisory:** Easy-to-read treatment steps, organic remedies, and chemical spray recommendations in regional languages.
- **Offline / Low-Bandwidth Support:** Lightweight model inference designed for edge and low-connectivity deployment.
- **Farmer Query Assistance:** Chat-based agricultural advisory for follow-up questions regarding dosage and weather precautions.
---
## 🏗️ System Architecture
```text
       +---------------------------------------------+
       |           Client (Web / Mobile App)         |
       |     [Upload Leaf Image] / [Select Crop]     |
       +----------------------+----------------------+
                              | REST API Request
                              v
       +---------------------------------------------+
       |            Backend API Gateway              |
       |          (FastAPI / Flask / Node)           |
       +----------------------+----------------------+
                              |
            +-----------------+-----------------+
            |                                   |
            v                                   v
+-----------------------+           +-----------------------+
|  Preprocessing & CV   |           |  Metadata & Advisory  |
|  - Resize & Normalize |           |  - Soil/Weather API   |
|  - Noise Reduction    |           |  - Fertilizer DB      |
+-----------+-----------+           +-----------+-----------+
            |                                   |
            v                                   |
+-----------------------+                       |
| Deep Learning Model   |                       |
| (CNN / Vision Trans.) |                       |

+-----------+-----------+ |
| :--- | <br> +-----------------+-----------------+
| <br> v <br> +---------------------------------------------+
| JSON Diagnostic Response |
| (Disease, Severity %, Treatment Protocol) |

       +---------------------------------------------+
