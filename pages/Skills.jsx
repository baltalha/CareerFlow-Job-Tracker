import React, { useState } from 'react'
import "../css/Skills.css";
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
function Skills() {
const [selectedSkills, setSelectedSkills] = useState(()=>{
    const savedSkills = localStorage.getItem("careerFlowSkills");

    return savedSkills ? JSON.parse(savedSkills) : [];
});

function toggleSkill (skill){
    let updatedSkills;

    if (selectedSkills.includes(skill)){
        updatedSkills = selectedSkills.filter(
            (item )=> item !==skill
        );

    }else{
        updatedSkills = [...selectedSkills, skill];
    }
    setSelectedSkills(updatedSkills);
    localStorage.setItem(
        "careerflowSkills",
        JSON.stringify(updatedSkills)
    );
}


  return (
    <div>
         <main className="skills-page">

      <div className="skills-container">

        <div className="skills-header">

          <span className="skills-eyebrow">
            CAREER PROFILE
          </span>

          <h1>
            Your <span>Skills</span>
          </h1>

          <p>
            Select the technologies and skills you currently
            have. CareerFlow will use them to calculate your
            job match score.
          </p>

        </div>


        <section className="skills-card">

          <div className="skills-card-header">

            <div>
              <h2>
                Select your skills
              </h2>

              <p>
                Choose everything you are comfortable working with.
              </p>
            </div>

            <div className="skills-counter">
              {selectedSkills.length} selected
            </div>

          </div>


          <div className="available-skills">

            {availableSkills.map((skill) => {

              const isSelected =
                selectedSkills.includes(skill);

              return (
                <button
                  key={skill}
                  className={`skill-option ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => toggleSkill(skill)}
                >

                  <span className="skill-check">
                    {isSelected ? "✓" : "+"}
                  </span>

                  {skill}

                </button>
              );
            })}

          </div>


          <div className="skills-summary">

            <span>
              Your current profile
            </span>

            <strong>
              {selectedSkills.length} skills
            </strong>

          </div>

        </section>

      </div>

    </main>
    </div>
  )
}

export default Skills