from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("GEMINI_KEY")

from google import genai
client = genai.Client(api_key=API_KEY)

import pdfplumber
from flask import Flask, request, jsonify
import requests
import io

app = Flask(__name__)

# Helper function to extract text from PDF

def extract_text_from_pdf(pdf_file):
    text = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"  # Extract text from each page
    return text

# Helper function to call the LLM API for resume analysis
def analyze_resume_with_llm(resume_text, job_description):
    response = client.models.generate_content(
        model="google/gemini-1.5-turbo",
        prompt=f"Analyze the following resume against the job description:\n\nResume:\n{resume_text}\n\nJob Description:\n{job_description}",
        temperature=0.7,
        max_tokens=1500,
    )
    return response.text

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
