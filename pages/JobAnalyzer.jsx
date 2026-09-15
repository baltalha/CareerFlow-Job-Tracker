import {useEffect, useState } from "react";
import "../css/JobAnalyzer.css";
import { jsx } from "react/jsx-runtime";

const availableSkills = [
  "React",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "Git",
  "REST API",
  "Redux",
  "Next.js",
];



function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [detectedSkills, setDetectedSkills] = useState([]);
  const [matchScore, setMatchScore] = useState(0);
  const [missingSkills, setMissingSkills] = useState([]);

const [mySkills, setMySkills] = useState(()=>{
  const savedSkills = localStorage.getItem("careerflowSkills");
  return savedSkills ? JSON.parse(savedSkills) : [];
});

  function analyzeJob() {
    const foundSkills = availableSkills.filter((skill) =>
      jobDescription.toLowerCase().includes(skill.toLowerCase())
    );

    setDetectedSkills(foundSkills);

    const missing = foundSkills.filter(
      (skill) => !mySkills.includes(skill)
    );

    setMissingSkills(missing);

    const score =
      foundSkills.length === 0
        ? 0
        : Math.round(
            ((foundSkills.length - missing.length) /
              foundSkills.length) *
              100
          );

    setMatchScore(score);
  }

  function getMatchLevel() {
    if (matchScore >= 80) {
      return "Strong Match";
    }

    if (matchScore >= 60) {
      return "Good Match";
    }

    if (matchScore >= 40) {
      return "Fair Match";
    }

    return "Low Match";
  }

  const matchedSkills = detectedSkills.filter((skill) =>
    mySkills.includes(skill)
  );


useEffect(()=>{
  const savedSkills = localStorage.getItem("careerflowSkills");
  if(savedSkills){
    setMySkills(JSON.parse(savedSkills));
  }
}, []);

  return (
    <main className="job-analyzer-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="analyzer-header">

        <span className="analyzer-eyebrow">
          CAREER INTELLIGENCE
        </span>

        <h1>
          Analyze your next <span>opportunity.</span>
        </h1>

        <p>
          Paste a job description and let CareerFlow identify the
          technologies and skills employers are looking for.
        </p>

      </header>


      {/* =========================
          MAIN CONTAINER
      ========================= */}

      <div className="analyzer-container">

        <section className="analyzer-card">

          {/* =========================
              CARD HEADER
          ========================= */}

          <div className="analyzer-card-header">

            <div className="analyzer-card-title">

              <div className="analyzer-icon">
                ✦
              </div>

              <div>
                <h2>
                  Job Description Analyzer
                </h2>

                <p>
                  Discover the skills hidden inside the job post.
                </p>
              </div>

            </div>

            <div className="ai-badge">
              <span>✦</span>
              AI POWERED
            </div>

          </div>


          {/* =========================
              JOB DESCRIPTION INPUT
          ========================= */}

          <div className="analyzer-input-section">

            <div className="analyzer-input-header">

              <label htmlFor="job-description">
                Job Description
              </label>

              <span className="character-counter">
                {jobDescription.length} characters
              </span>

            </div>

            <textarea
              id="job-description"
              className="analyzer-textarea"
              placeholder="Paste the complete job description here..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
            />

            <div className="analyzer-action">

              <button
                className="analyze-button"
                onClick={analyzeJob}
                disabled={!jobDescription.trim()}
              >
                Analyze Job
                <span>→</span>
              </button>

            </div>

          </div>


          {/* =========================
              RESULTS
          ========================= */}

          {detectedSkills.length > 0 ? (

            <>
{mySkills.length === 0 && (
  <div className="skills-warning">
    <span>⚠</span>

    <div>
      <strong>No skills added yet</strong>

      <p>
        Go to your Skills Profile and select your skills
        before analyzing a job.
      </p>
    </div>
  </div>
)}
              {/* =========================
                  MATCH SCORE
              ========================= */}

            <div className="match-score-card">

  <div className="score-ring-wrapper">

    <div
      className="score-ring"
      style={{
        "--score": `${matchScore * 3.6}deg`,
      }}
    >
      <div className="score-ring-inner">

        <strong>
          {matchScore}%
        </strong>

        <span>
          MATCH
        </span>

      </div>
    </div>

  </div>


  <div className="match-score-info">

    <span>
      JOB MATCH
    </span>

    <h3>
      {getMatchLevel()}
    </h3>
<p>
  You match {matchedSkills.length} of{" "}
  {detectedSkills.length} required skills for this position.
</p>

  </div>

</div>


              {/* =========================
                  MATCHED SKILLS
              ========================= */}

              <section className="detected-skills">

                <div className="detected-skills-header">

                  <h2>
                    Your Strengths
                  </h2>

                  <span className="detected-count">
                    {matchedSkills.length} matched
                  </span>

                </div>

                <div className="skills-list">

                  {matchedSkills.map((skill) => (

                    <span
                      className="skill-chip"
                      key={skill}
                    >

                      <span>
                        ✓
                      </span>

                      {skill}

                    </span>

                  ))}

                </div>

              </section>


              {/* =========================
                  MISSING SKILLS
              ========================= */}

              {missingSkills.length > 0 && (

                <section className="missing-skills">

                  <div className="missing-skills-header">

                    <h2>
                      Missing Skills
                    </h2>

                    <span>
                      {missingSkills.length} missing
                    </span>

                  </div>

                  <div className="skills-list">

                    {missingSkills.map((skill) => (

                      <span
                        className="missing-skill-chip"
                        key={skill}
                      >
                        ⚠ {skill}
                      </span>

                    ))}

                  </div>

                </section>

              )}


              {/* =========================
                  ANALYZER TIP
              ========================= */}

              <div className="analyzer-tip">

                <span>
                  ✦
                </span>

                Your match score is calculated by comparing the
                skills detected in this job description with your
                current CareerFlow skill profile.

              </div>

            </>

          ) : (

            /* =========================
               EMPTY STATE
            ========================= */

            <div className="analyzer-empty">

              Paste a job description above and click{" "}

              <strong>
                Analyze Job
              </strong>

              {" "}to detect required skills.

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default JobAnalyzer;