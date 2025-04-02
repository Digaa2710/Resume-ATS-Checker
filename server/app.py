from dotenv import load_dotenv
import os
import re, json
load_dotenv()

API_KEY = os.getenv("GEMINI_KEY")

from google import generativeai as genai
genai.configure(api_key=API_KEY)

import pdfplumber
from flask import Flask, request, jsonify
import requests
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Helper function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    text = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"  # Extract text from each page
    return text

# Helper function to call the LLM API for resume analysis
def analyze_resume_with_llm(resume_text, job_description):
    sample_output = """{
        score: 78,
        keywords: {
          matched: ['collaboration', 'project management', 'JavaScript'],
          missing: ['React', 'TypeScript', 'team leadership']
        },
        sections: {
          experience: 85,
          education: 90,
          skills: 70
        }
      }"""
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    # prompt = f"""Analyze the following resume against the job description:\n\nResume:\n{resume_text}\n\nJob Description:\n{job_description} \nOutput format: JSON \n\nOutput: {sample_output}"""
    prompt = f"""Analyze this resume against the job description and output a JSON object that can be directly parsed with JSON.parse().

Resume:
{resume_text}

Job Description:
{job_description}

Your response must be ONLY a valid JSON object with NO additional text, markdown formatting, or explanations.
The JSON structure should include:
- score: (0-100) Overall match percentage
- keywords: {{"matched": ["keyword1", "keyword2"], "missing": ["keyword3", "keyword4"]}}
- sections: {{"experience": (0-100), "education": (0-100), "skills": (0-100)}}
- recommendations: ["specific improvement suggestion 1", "specific improvement suggestion 2"]

Response format example:
{{
  "score": 78,
  "keywords": {{
    "matched": ["collaboration", "project management", "JavaScript"],
    "missing": ["React", "TypeScript", "team leadership"]
  }},
  "sections": {{
    "experience": 85,
    "education": 90,
    "skills": 70
  }},
  "recommendations": [
    "Add experience with React to your resume",
    "Highlight team leadership examples in your work history"
  ]
}}

Return ONLY the JSON object."""
    
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            temperature=0.7,
            max_output_tokens=1500,
        )
    )

    clean_text = re.sub(r"^```(?:json)?\s*|```$", "", response.text, flags=re.MULTILINE)
    data = json.loads(clean_text)

    return data

@app.route('/')
def index():
    return "Welcome to the Resume Analyzer API!"

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    try:
        # Get the uploaded PDF file and job description from the frontend
        if 'resume' not in request.files:
            return jsonify({"error": "No resume file provided"}), 400
        
        pdf_file = request.files['resume']
        job_description = request.form.get('job_description', '')

        # Ensure a job description was provided
        if not job_description:
            return jsonify({"error": "Job description is missing"}), 400
        
        # Extract text from the PDF file
        resume_text = extract_text_from_pdf(pdf_file)
        
        # Call the LLM API to analyze the resume and job description
        result = analyze_resume_with_llm(resume_text, job_description)
        
        # Return the result as JSON response to the frontend
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)