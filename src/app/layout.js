import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart ATS Scanner: Optimize Your Resume",
  description: "Smart ATS Scanner is a web-based tool designed to help job seekers improve their resumes by analyzing how well they match specific job descriptions. By simulating Applicant Tracking System (ATS) behavior, it checks for keyword alignment, skill matches, and overall relevance—ensuring your resume gets noticed before recruiters even see it. Upload your resume, paste a job description, and get actionable insights to increase your chances of landing interviews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
