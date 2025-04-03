"use client";
import axios from 'axios';
import React, { useState } from 'react';

export default function Resume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = () => {
    if (!file || !jobDescription) {
      alert('Please upload a resume and enter a job description');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    // setTimeout(() => {
    //   // Mock results
      // setResults({
      //   score: 78,
      //   keywords: {
      //     matched: ['collaboration', 'project management', 'JavaScript'],
      //     missing: ['React', 'TypeScript', 'team leadership']
      //   },
      //   sections: {
      //     experience: 85,
      //     education: 90,
      //     skills: 70
      //   }
      // });
      
    //   setIsLoading(false);
    // }, 2000);
    // Create form data
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);

    axios.post('https://resume-ats-checker-4.onrender.com/analyze', formData)
      .then((response) => {
        setResults(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  // Function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 90) return '#38B2AC'; // teal
    if (score >= 80) return '#4299E1'; // blue
    if (score >= 70) return '#9F7AEA'; // purple
    if (score >= 60) return '#ED8936'; // orange
    return '#F56565'; // red
  };

  // Function to get text label based on score
  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Average';
    return 'Needs Work';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#03045E] to-[#CAF0F8] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Resume Analysis</h1>
          <p className="text-xl text-white">Upload your resume for ATS scoring and get insights to improve your chances.</p>
        </div>

        {!results ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="border-2 border-[#0077B6] rounded-xl p-6 mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Upload Resume</label>
              <div className="relative flex items-center justify-center p-4 border-2 border-dashed border-[#00B4D8] rounded-lg bg-[#90E0EF]/10">
                <div className="text-center">
                  {file ? (
                    <div className="text-[#0077B6] font-medium">{file.name}</div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="mt-1 text-xs text-gray-400">PDF or DOCX (Max 5MB)</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    onChange={handleFileChange}
                    accept=".pdf,.docx"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Job Description</label>
              <textarea 
                className="w-full h-32 p-3 border-2 border-[#00B4D8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={handleJobDescriptionChange}
              ></textarea>
            </div>

            <div className="text-center">
              <button 
                onClick={handleSubmit}
                className="px-6 py-3 bg-[#0077B6] text-white font-semibold rounded-lg hover:bg-[#03045E] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : "Show Results"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Redesigned Chart Section */}
              <div className="flex flex-col items-center justify-center border rounded-xl shadow-lg p-8 bg-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full -ml-12 -mb-12"></div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">ATS Score</h2>
                
                {/* Modern circular progress with glow effect */}
                <div className="relative w-52 h-52 mb-6">
                  {/* Outer shadow for depth effect */}
                  <div className="absolute inset-0 rounded-full shadow-inner bg-gray-50"></div>
                  
                  {/* Background track */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="10"
                    />
                    
                    {/* Main progress arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke={getScoreColor(results.score)}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42 * (results.score / 100)} ${2 * Math.PI * 42}`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                      className="drop-shadow-md"
                      style={{
                        filter: `drop-shadow(0 0 6px ${getScoreColor(results.score)}80)`
                      }}
                    />
                    
                    {/* Inner circle for contrast */}
                    <circle
                      cx="50"
                      cy="50"
                      r="32"
                      fill="white"
                    />
                  </svg>
                  
                  {/* Score text overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-gray-800">{results.score}</span>
                    <span className="text-xl font-medium text-gray-500">points</span>
                  </div>
                </div>
                
                {/* Score label with matching color */}
                <div 
                  className="relative px-6 py-2 rounded-full shadow-sm text-white font-bold"
                  style={{ backgroundColor: getScoreColor(results.score) }}
                >
                  {getScoreLabel(results.score)} Match
                </div>
                
                {/* Small descriptive text */}
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Score based on keyword matching and section analysis
                </p>
              </div>
              
              {/* Keywords Section */}
              <div className="flex flex-col justify-center">
                <div>
                  <h3 className="text-xl font-semibold text-[#03045E] mb-3">Job Description Keywords</h3>
                  <p className="text-gray-700 mb-4 italic text-sm">Based on: "{jobDescription.length > 100 ? jobDescription.substring(0, 100) + '...' : jobDescription}"</p>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-[#0077B6] mb-2">Matched Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.keywords.matched.map((keyword) => (
                        <span key={keyword} className="px-3 py-1 bg-[#00B4D8]/20 text-[#03045E] rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-[#0077B6] mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.keywords.missing.map((keyword) => (
                        <span key={keyword} className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detailed Analysis Section */}
            <div className="rounded-xl p-6 border-2 border-[#00B4D8]">
              <h3 className="text-xl font-semibold text-[#03045E] mb-4">Detailed Resume Analysis</h3>
              <p className="text-gray-700 mb-4">Your resume was analyzed against the job description you provided. Here's what we found:</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#0077B6] mb-3">Section Scores</h4>
                <div className="space-y-4">
                  {Object.entries(results.sections).map(([section, score]) => (
                    <div key={section}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize text-gray-700 font-medium">{section}</span>
                        <span className="text-gray-700">{score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{ 
                            width: `${score}%`,
                            backgroundColor: getScoreColor(score)
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {score >= 85 ? 'Excellent match for this section' : 
                         score >= 70 ? 'Good match, minor improvements possible' : 
                         'Consider enhancing this section with more relevant keywords'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-[#0077B6] mb-3">Recommendations</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Your resume is <span className="font-semibold">{results.score >= 75 ? 'likely to pass' : 'at risk of being filtered out by'}</span> ATS systems.</li>
                  <li>Consider adding the missing keywords where relevant in your experience and skills sections.</li>
                  <li>The job description emphasizes {results.keywords.missing[0]} and {results.keywords.missing[1]} - try to incorporate these terms if you have relevant experience.</li>
                  <li>Your {Object.entries(results.sections).sort((a, b) => a[1] - b[1])[0][0]} section could use improvement to better match the requirements.</li>
                </ul>
              </div>
            </div>
            
            {/* Reset Button */}
            <div className="mt-6 text-center">
              <button 
                onClick={() => setResults(null)}
                className="px-6 py-3 bg-[#0077B6] text-white font-semibold rounded-lg hover:bg-[#03045E] transition-colors"
              >
                Try Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}