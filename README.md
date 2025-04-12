# ATS Resume Checker

A web-based tool that helps job seekers evaluate how well their resume aligns with job descriptions by simulating Applicant Tracking System (ATS) behavior. This tool analyzes keyword match, skills overlap, and overall compatibility between a resume and job listing.

🌐 **Live Site**: [ats-checker.netlify.app](https://ats-checker.netlify.app/)

---

## 🚀 Features

- ✅ Upload resume (PDF or Text format)
- 📝 Paste job description for matching
- 📊 ATS-friendly analysis report
- 🔍 Keyword and skills matching
- 💡 Suggestions to improve resume compatibility

---

## 📸 Demo

Take a quick look at how the **ATS Resume Checker** works:

### 🧾 The Input Form

Upload your resume and paste the job description you'd like to match against. The interface is clean, intuitive, and user-friendly.

![ATS Resume Checker Form](./images/form.png)

---

### 📊 The Compatibility Report

Once submitted, you'll receive a detailed compatibility analysis showing keyword overlap, skill matches, and improvement suggestions to make your resume more ATS-friendly.

![ATS Resume Checker Result](./images/result.png)

---

## 🛠 Tech Stack

- **Frontend**: Next.js + TailwindCSS  
- **Backend**: Flask (Python)
- **Deployment**: Frontend on Netlify, Backend on Render

---

## 🧑‍💻 Getting Started

Follow these instructions to set up the project locally on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/Digaa2710/Resume-ATS-Checker.git
cd Resume-ATS-Checker/
```

---

### 2. Install and Run the Project

```bash
# Start the frontend
npm install
npm run dev

# In a new terminal, start the backend
cd server
pip install -r requirements.txt
python app.py
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

> ⚠️ Make sure both Node.js and Python are installed in your system.

---
