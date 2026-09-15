import { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "../css/CareerCenter.css";

function CareerCenter() {
  const { applications } = useOutletContext();
  const navigate = useNavigate();

  const mySkills = JSON.parse(
    localStorage.getItem("careerflowSkills") || "[]"
  );

  // ========================================
  // APPLICATION DATA
  // ========================================

  const totalApplications = applications.length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const pendingApplications = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  // ========================================
  // CAREER HEALTH SCORE
  // ========================================

  const careerHealth = useMemo(() => {
    if (totalApplications === 0) {
      return 0;
    }

    // Başvuru aktivitesi
    const applicationScore = Math.min(
      totalApplications * 5,
      30
    );

    // Interview başarısı
    const interviewScore = Math.min(
      interviewCount * 8,
      25
    );

    // Offer
    const offerScore = Math.min(
      offerCount * 15,
      20
    );

    // Skill profili
    const skillScore = Math.min(
      mySkills.length * 2,
      15
    );

    // Bekleyen başvurular çok fazla değilse
    const activityScore =
      pendingApplications <= 5 ? 10 : 5;

    const score = Math.round(
      applicationScore +
      interviewScore +
      offerScore +
      skillScore +
      activityScore
    );

    return Math.min(score, 100);
  }, [
    totalApplications,
    interviewCount,
    offerCount,
    pendingApplications,
    mySkills.length,
  ]);

  // ========================================
  // RECOMMENDATION ENGINE
  // ========================================

  const recommendations = useMemo(() => {
    const items = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function parseLocalDate(dateString) {
      if (!dateString) {
        return null;
      }

      const [year, month, day] = dateString
        .split("-")
        .map(Number);

      return new Date(year, month - 1, day);
    }

    // ========================================
    // 1. FOLLOW-UP RECOMMENDATIONS
    // ========================================

    applications
      .filter(
        (application) =>
          application.status === "Applied"
      )
      .forEach((application) => {
        const applicationDate = parseLocalDate(
          application.date
        );

        if (!applicationDate) {
          return;
        }

        const daysPassed = Math.floor(
          (today - applicationDate) /
            (1000 * 60 * 60 * 24)
        );

        if (daysPassed >= 3) {
          items.push({
            id: `followup-${application.id}`,
            type: "followup",
            icon: "🔔",

            title: `Follow up with ${application.company}`,

            description:
              `You applied ${daysPassed} days ago and haven't received a response.`,

            action: () =>
              navigate(
                `/applications/${application.id}`
              ),
          });
        }
      });

    // ========================================
    // 2. UPCOMING INTERVIEW RECOMMENDATIONS
    // ========================================

    applications
      .filter(
        (application) =>
          (
            application.status === "Interview" ||
            application.status === "Offer"
          ) &&
          application.interview?.date
      )
      .forEach((application) => {
        const interviewDate = parseLocalDate(
          application.interview.date
        );

        if (!interviewDate) {
          return;
        }

        const daysUntil = Math.ceil(
          (interviewDate - today) /
            (1000 * 60 * 60 * 24)
        );

        if (
          daysUntil >= 0 &&
          daysUntil <= 7
        ) {
          items.push({
            id: `interview-${application.id}`,
            type: "interview",
            icon: "🎯",

            title:
              `Prepare for your ${application.company} interview`,

            description:
              daysUntil === 0
                ? "Your interview is today. Make sure you're ready."
                : `Your interview is coming up in ${daysUntil} day${
                    daysUntil === 1 ? "" : "s"
                  }.`,

            action: () =>
              navigate(
                `/applications/${application.id}`
              ),
          });
        }
      });

    // ========================================
    // 3. SKILL RECOMMENDATIONS
    // ========================================

    const commonSkills = [
      "React",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "SQL",
      "MongoDB",
      "Git",
      "Next.js",
    ];

    const missingSkills = commonSkills.filter(
      (skill) => !mySkills.includes(skill)
    );

    missingSkills
      .slice(0, 2)
      .forEach((skill) => {
        items.push({
          id: `skill-${skill}`,
          type: "skill",
          icon: "🧠",

          title: `Improve ${skill}`,

          description:
            `${skill} can strengthen your profile and improve your job matches.`,

          action: () => navigate("/skills"),
        });
      });

    return items.slice(0, 5);
  }, [applications, mySkills, navigate]);

  // ========================================
  // HEALTH LABEL
  // ========================================

  function getHealthLabel() {
    if (careerHealth >= 80) {
      return "Excellent momentum";
    }

    if (careerHealth >= 60) {
      return "Good momentum";
    }

    if (careerHealth >= 40) {
      return "Building momentum";
    }

    return "Needs attention";
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <main className="career-center-page">

      <div className="career-center-container">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="career-center-header">

          <span className="career-center-eyebrow">
            CAREER INTELLIGENCE
          </span>

          <h1>
            Your Career <span>Command Center</span>
          </h1>

          <p>
            Understand your job search, identify your next
            move, and keep your career momentum growing.
          </p>

        </div>


        {/* ========================================
            CAREER HEALTH
        ======================================== */}

        <section className="career-health-card">

          <div className="health-content">

            <span className="section-label">
              CAREER HEALTH
            </span>

            <h2>
              {careerHealth}
              <small>/ 100</small>
            </h2>

            <p>
              {getHealthLabel()}
            </p>

          </div>


          {/* HEALTH PROGRESS */}

          <div className="health-progress">

            <div className="health-progress-header">

              <span>
                Career momentum
              </span>

              <strong>
                {careerHealth}%
              </strong>

            </div>

            <div className="health-progress-track">

              <div
                className="health-progress-bar"
                style={{
                  width: `${careerHealth}%`,
                }}
              />

            </div>

          </div>

        </section>


        {/* ========================================
            TODAY'S ACTIONS
        ======================================== */}

        <section className="today-actions">

          <div className="section-heading">

            <div>

              <span className="section-label">
                TODAY
              </span>

              <h2>
                What should I do today?
              </h2>

            </div>

          </div>


          <div className="action-list">

            {recommendations.length > 0 ? (

              recommendations.map(
                (recommendation, index) => (

                  <div
                    className={`career-action ${recommendation.type}`}
                    key={recommendation.id}
                    onClick={recommendation.action}
                  >

                    <div className="action-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>


                    <div className="action-icon">
                      {recommendation.icon}
                    </div>


                    <div className="action-content">

                      <h3>
                        {recommendation.title}
                      </h3>

                      <p>
                        {recommendation.description}
                      </p>

                    </div>


                    <span className="action-arrow">
                      →
                    </span>

                  </div>

                )
              )

            ) : (

              <div className="actions-empty">

                <div className="actions-empty-icon">
                  ✓
                </div>

                <div>

                  <h3>
                    You're all caught up
                  </h3>

                  <p>
                    No urgent career actions right now.
                  </p>

                </div>

              </div>

            )}

          </div>

        </section>

      </div>

    </main>
  );
}

export default CareerCenter;