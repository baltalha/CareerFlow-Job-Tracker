import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CareerSimulator.css";
import { jsx } from "react/jsx-runtime";

const careerPaths = {
  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "React",
    "TypeScript",
    "Next.js",
  ],

  "Backend Developer": [
    "JavaScript",
    "Git",
    "Node.js",
    "Express.js",
    "REST API",
    "SQL",
    "MongoDB",
  ],

  "Full Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "React",
    "Node.js",
    "Express.js",
    "REST API",
    "SQL",
    "MongoDB",
  ],

  "Software Engineer": [
    "JavaScript",
    "TypeScript",
    "Git",
    "SQL",
    "REST API",
    "Node.js",
    "Testing",
  ],
};

const careerDescriptions = {
  "Frontend Developer":
    "Build modern, interactive and user-friendly web experiences.",

  "Backend Developer":
    "Design powerful APIs, services and data-driven backend systems.",

  "Full Stack Developer":
    "Combine frontend and backend skills to build complete applications.",

  "Software Engineer":
    "Develop scalable software systems using strong engineering practices.",
};

const careerIcons = {
  "Frontend Developer": "◈",
  "Backend Developer": "⌘",
  "Full Stack Developer": "◆",
  "Software Engineer": "✦",
};

const roadmapOrder = {
  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "React",
    "TypeScript",
    "Next.js",
  ],

  "Backend Developer": [
    "JavaScript",
    "Git",
    "Node.js",
    "Express.js",
    "REST API",
    "SQL",
    "MongoDB",
  ],

  "Full Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "React",
    "Node.js",
    "Express.js",
    "REST API",
    "SQL",
    "MongoDB",
  ],

  "Software Engineer": [
    "JavaScript",
    "TypeScript",
    "Git",
    "SQL",
    "REST API",
    "Node.js",
    "Testing",
  ],
};

const skillDescriptions = {
  HTML: "Build strong semantic HTML fundamentals.",
  CSS: "Master responsive layouts, Flexbox and Grid.",
  JavaScript: "Strengthen modern JavaScript and DOM knowledge.",
  React: "Build reusable components and manage application state.",
  TypeScript: "Add type safety to modern JavaScript applications.",
  Git: "Learn professional version control workflows.",
  "Next.js":
    "Build production-ready React applications with Next.js.",
  "Node.js":
    "Build scalable backend applications using JavaScript.",
  "Express.js":
    "Create APIs and backend services with Express.",
  "REST API":
    "Understand HTTP communication and API architecture.",
  MongoDB:
    "Work with NoSQL databases and document-based data.",
  SQL:
    "Learn relational databases and write powerful SQL queries.",
  Testing:
    "Learn testing practices for reliable software.",
};

const skillLevels = {
  HTML: "Foundation",
  CSS: "Foundation",
  JavaScript: "Core",
  Git: "Core",
  React: "Core",
  TypeScript: "Advanced",
  "Next.js": "Advanced",
  "Node.js": "Core",
  "Express.js": "Core",
  "REST API": "Core",
  MongoDB: "Core",
  SQL: "Core",
  Testing: "Advanced",
};

function CareerSimulator() {
  const navigate = useNavigate();

  const [selectedCareer, setSelectedCareer] = useState("");
const [completedSkills, setCompletedSkills] = useState(()=>{
try{
  const savedProgress = localStorage.getItem(
    "careerflowCompletedSkills"
  );

  return savedProgress
  ? JSON.parse(savedProgress)
  :[];
} catch{
  return[];
}



});
  const [mySkills, setMySkills] = useState(() => {
    try {
      const savedSkills =
        localStorage.getItem("careerflowSkills");

      return savedSkills ? JSON.parse(savedSkills) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    function loadSkills() {
      try {
        const savedSkills =
          localStorage.getItem("careerflowSkills");

        setMySkills(
          savedSkills ? JSON.parse(savedSkills) : []
        );
      } catch {
        setMySkills([]);
      }
    }

    loadSkills();

    window.addEventListener(
      "careerflowSkillsUpdated",
      loadSkills
    );

    return () => {
      window.removeEventListener(
        "careerflowSkillsUpdated",
        loadSkills
      );
    };
  }, []);

  const requiredSkills =
    careerPaths[selectedCareer] || [];

  const matchedSkills = useMemo(() => {
    return requiredSkills.filter((skill) =>
      mySkills.includes(skill)
    );
  }, [requiredSkills, mySkills]);

  const missingSkills = useMemo(() => {
    return requiredSkills.filter(
      (skill) => !mySkills.includes(skill)
    );
  }, [requiredSkills, mySkills]);

  const readinessScore =
    requiredSkills.length === 0
      ? 0
      : Math.round(
          (matchedSkills.length /
            requiredSkills.length) *
            100
        );




  const roadmapSkills = useMemo(() => {
    return (roadmapOrder[selectedCareer] || [])
      .filter((skill) => missingSkills.includes(skill))
      .map((skill, index) => ({
        skill,
        step: index + 1,
        level: skillLevels[skill] || "Core",
        description:
          skillDescriptions[skill] ||
          "Develop this skill to strengthen your career profile.",
      }));
  }, [selectedCareer, missingSkills]);
  const roadmapProgress =
  roadmapSkills.length === 0
    ? 100
    : Math.round(
        (completedSkills.filter((skill) =>
          missingSkills.includes(skill)
        ).length /
          roadmapSkills.length) *
          100
      );

  function getReadinessLabel() {
    if (!selectedCareer) return "Choose your path";

    if (readinessScore >= 90) {
      return "Career Ready";
    }

    if (readinessScore >= 70) {
      return "Strong Position";
    }

    if (readinessScore >= 50) {
      return "Good Progress";
    }

    if (readinessScore >= 30) {
      return "Building Skills";
    }

    return "Getting Started";
  }

  function getReadinessDescription() {
    if (!selectedCareer) {
      return "Select a career path to see your personalized readiness.";
    }

    if (readinessScore >= 90) {
      return "Your current skill set is highly aligned with this career.";
    }

    if (readinessScore >= 70) {
      return "You're close. A few targeted skills can make a big difference.";
    }

    if (readinessScore >= 50) {
      return "You have a solid foundation. Keep developing the missing skills.";
    }

    if (readinessScore >= 30) {
      return "You're making progress. Focus on the roadmap below.";
    }

    return "Start with the foundation skills and build your way up.";
  }

  function handleCareerSelect(career) {
    setSelectedCareer(career);
  }

  function handleStartLearning(skill) {
    navigate("/skills");
  }
  function toggleSkillCompletion(skill){
    let updatedSkills;

    if(completedSkills.includes(skill)){
      updatedSkills = completedSkills.filter(
        (item) => item !== skill
      );
    }else{
      updatedSkills = [...completedSkills, skill];
    }
    setCompletedSkills(updatedSkills);
    const savedSkills = localStorage.getItem(
      "careerflowSkills"
    );
    const currentSkills = savedSkills ? JSON.parse(savedSkills):[];
   const updatedMySkills = currentSkills.includes(skill) ? currentSkills  : [...currentSkills, skill];
   localStorage.setItem(
    "careerflowSkills", JSON.stringify(updatedMySkills)
   ) 
   
   localStorage.setItem(
      "careerflowCompletedSkills", JSON.stringify(updatedSkills)
    );
  }

  return (
    <main className="career-simulator-page">

      {/* BACKGROUND DECORATION */}

      <div className="career-bg-glow career-bg-glow-one"></div>
      <div className="career-bg-glow career-bg-glow-two"></div>

      {/* HEADER */}

      <section className="career-simulator-header">

        <div className="career-header-content">

          <div className="career-header-badge">
            <span className="badge-dot"></span>
            CAREER INTELLIGENCE
          </div>

          <h1>
            Build your
            <span> next career move.</span>
          </h1>

          <p>
            Choose your target career, compare your current
            skills, and get a personalized roadmap for what
            to learn next.
          </p>

        </div>

        <div className="career-header-orbit">

          <div className="header-orbit orbit-large"></div>
          <div className="header-orbit orbit-small"></div>

          <div className="header-orbit-center">
            <span>✦</span>
          </div>

          <div className="orbit-label orbit-label-one">
            Skills
          </div>

          <div className="orbit-label orbit-label-two">
            Growth
          </div>

        </div>

      </section>


      {/* CAREER SELECTION */}

      <section className="career-selection-section">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              STEP 01
            </span>

            <h2>
              Choose your target career
            </h2>

            <p>
              Where do you want your career to go?
            </p>
          </div>

          {selectedCareer && (
            <div className="selected-career-pill">
              <span>✓</span>
              {selectedCareer}
            </div>
          )}

        </div>


        <div className="career-options-grid">

          {Object.keys(careerPaths).map((career) => {

            const isSelected =
              selectedCareer === career;

            return (
              <button
                key={career}
                className={`career-option-card ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() =>
                  handleCareerSelect(career)
                }
              >

                <div className="career-option-top">

                  <div className="career-option-icon">
                    {careerIcons[career]}
                  </div>

                  {isSelected && (
                    <div className="career-selected-check">
                      ✓
                    </div>
                  )}

                </div>

                <div className="career-option-content">

                  <h3>{career}</h3>

                  <p>
                    {careerDescriptions[career]}
                  </p>

                </div>

                <div className="career-option-footer">

                  <span>
                    {careerPaths[career].length} core skills
                  </span>

                  <span className="career-option-arrow">
                    →
                  </span>

                </div>

              </button>
            );
          })}

        </div>

      </section>


      {/* EMPTY STATE */}

      {!selectedCareer && (
        <section className="career-empty-state">

          <div className="empty-state-icon">
            ✦
          </div>

          <div>
            <h3>
              Your career plan starts here.
            </h3>

            <p>
              Select a target career above to generate
              your personalized skill analysis and roadmap.
            </p>
          </div>

        </section>
      )}


      {/* CAREER ANALYSIS */}

      {selectedCareer && (
        <>

          {/* READINESS */}

          <section className="readiness-card">

            <div className="readiness-main">

              <div className="readiness-ring-wrapper">

                <div
                  className="readiness-ring"
                  style={{
                    "--progress":
                      `${readinessScore * 3.6}deg`,
                  }}
                >

                  <div className="readiness-ring-inner">

                    <strong>
                      {readinessScore}%
                    </strong>

                    <span>
                      READY
                    </span>

                  </div>

                </div>

              </div>


              <div className="readiness-info">

                <span className="readiness-eyebrow">
                  CAREER READINESS
                </span>

                <h2>
                  {getReadinessLabel()}
                </h2>

                <p>
                  {getReadinessDescription()}
                </p>

              </div>

            </div>


            <div className="readiness-stats">

              <div className="readiness-stat">

                <strong>
                  {matchedSkills.length}
                </strong>

                <span>
                  Skills matched
                </span>

              </div>

              <div className="readiness-divider"></div>

              <div className="readiness-stat">

                <strong>
                  {missingSkills.length}
                </strong>

                <span>
                  Skills to develop
                </span>

              </div>

              <div className="readiness-divider"></div>

              <div className="readiness-stat">

                <strong>
                  {requiredSkills.length}
                </strong>

                <span>
                  Total skills
                </span>

              </div>

            </div>

          </section>


          {/* SKILL COMPARISON */}

          <section className="skill-comparison-section">

            <div className="section-heading">

              <div>
                <span className="section-eyebrow">
                  STEP 02
                </span>

                <h2>
                  Your skill gap
                </h2>

                <p>
                  See exactly where you stand for{" "}
                  <strong>{selectedCareer}</strong>.
                </p>
              </div>

            </div>


            <div className="skill-comparison-grid">

              {/* YOUR SKILLS */}

              <div className="skill-panel your-skills-panel">

                <div className="skill-panel-header">

                  <div className="skill-panel-icon success">
                    ✓
                  </div>

                  <div>
                    <span>
                      YOUR STRENGTHS
                    </span>

                    <h3>
                      Skills you already have
                    </h3>
                  </div>

                  <strong>
                    {matchedSkills.length}
                  </strong>

                </div>


                <div className="skill-list">

                  {matchedSkills.length > 0 ? (
                    matchedSkills.map((skill) => (
                      <div
                        className="skill-item matched"
                        key={skill}
                      >

                        <div className="skill-item-left">

                          <span className="skill-check">
                            ✓
                          </span>

                          <span>
                            {skill}
                          </span>

                        </div>

                        <span className="skill-status">
                          MATCHED
                        </span>

                      </div>
                    ))
                  ) : (
                    <div className="skill-list-empty">
                      <span>○</span>
                      No matching skills yet.
                    </div>
                  )}

                </div>

              </div>


              {/* MISSING SKILLS */}

              <div className="skill-panel missing-skills-panel">

                <div className="skill-panel-header">

                  <div className="skill-panel-icon warning">
                    !
                  </div>

                  <div>
                    <span>
                      DEVELOPMENT AREA
                    </span>

                    <h3>
                      Skills to develop
                    </h3>
                  </div>

                  <strong>
                    {missingSkills.length}
                  </strong>

                </div>


                <div className="skill-list">

                  {missingSkills.length > 0 ? (
                    missingSkills.map((skill) => (
                      <div
                        className="skill-item missing"
                        key={skill}
                      >

                        <div className="skill-item-left">

                          <span className="skill-plus">
                            +
                          </span>

                          <span>
                            {skill}
                          </span>

                        </div>

                        <span className="skill-level">
                          {skillLevels[skill]}
                        </span>

                      </div>
                    ))
                  ) : (
                    <div className="skill-list-empty success-empty">
                      <span>✓</span>
                      You have all required skills.
                    </div>
                  )}

                </div>

              </div>

            </div>

          </section>


          {/* ROADMAP */}

          <section className="roadmap-section">

            <div className="section-heading roadmap-heading">

              <div>
                <span className="section-eyebrow">
                  STEP 03
                </span>

                <h2>
                  Your career roadmap
                </h2>

                <p>
                  A focused learning path based on your current
                  skill set.
                </p>
              </div>

              <div className="roadmap-progress">

                <div className="roadmap-progress-label">

                  <span>
                    ROADMAP PROGRESS
                  </span>

                  <strong>
                    {roadmapProgress}%
                  </strong>

                </div>

                <div className="roadmap-progress-bar">

                  <span
                    style={{
                      width: `${roadmapProgress}%`,
                    }}
                  ></span>

                </div>

              </div>

            </div>


            {roadmapSkills.length > 0 ? (

              <div className="roadmap-container">

                <div className="roadmap-line"></div>

                {roadmapSkills.map((item) => (

                  <div
                    className="roadmap-item"
                    key={item.skill}
                  >

                    <div className="roadmap-step">

                      <span>
                        {String(item.step).padStart(
                          2,
                          "0"
                        )}
                      </span>

                    </div>


                    <div className="roadmap-card">

                      <div className="roadmap-card-main">

                        <div className="roadmap-skill-icon">
                          {item.skill.charAt(0)}
                        </div>

                        <div className="roadmap-card-content">

                          <div className="roadmap-card-meta">

                            <span className="roadmap-level">
                              {item.level}
                            </span>

                            <span className="roadmap-dot">
                              •
                            </span>

                            <span>
                              Step {item.step}
                            </span>

                          </div>

                          <h3>
                            {item.skill}
                          </h3>

                          <p>
                            {item.description}
                          </p>

                        </div>

                      </div>


                      <div className="roadmap-actions">

  <button
    className={`complete-skill-button ${
      completedSkills.includes(item.skill)
        ? "completed"
        : ""
    }`}
    onClick={() =>
      toggleSkillCompletion(item.skill)
    }
  >
    {completedSkills.includes(item.skill)
      ? "✓ Completed"
      : "Mark as learned"}
  </button>

  {!completedSkills.includes(item.skill) && (
    <button
      className="start-learning-button"
      onClick={() =>
        handleStartLearning(item.skill)
      }
    >
      Learn
      <span>→</span>
    </button>
  )}

</div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

             <div className="roadmap-complete">

  <div className="roadmap-complete-glow"></div>

  <div className="roadmap-complete-icon">
    <span>✓</span>
  </div>

  <div className="roadmap-complete-content">

    <span className="roadmap-complete-eyebrow">
      ROADMAP COMPLETE
    </span>

    <h3>
      You're ready for this career.
    </h3>

    <p>
      You've completed your learning roadmap for{" "}
      <strong>{selectedCareer}</strong>.
    </p>

  </div>

  <div className="roadmap-complete-badge">
    <strong>100%</strong>
    <span>READY</span>
  </div>

</div>

            )}

          </section>


          {/* FINAL CTA */}

          <section className="career-final-cta">

            <div className="final-cta-icon">
              ✦
            </div>

            <div className="final-cta-content">

              <span>
                KEEP BUILDING
              </span>

              <h2>
                Turn your skill gap into your advantage.
              </h2>

              <p>
                Keep your skills updated in CareerFlow and
                continuously track your progress.
              </p>

            </div>

            <button
              className="final-cta-button"
              onClick={() => navigate("/skills")}
            >
              Manage my skills
              <span>→</span>
            </button>

          </section>

        </>
      )}

    </main>
  );
}

export default CareerSimulator;