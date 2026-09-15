import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

import "../css/Dashboard.css";

import StatCard from "../src/components/StatCard";
import ApplicationCard from "../src/components/ApplicationCard";
import AnalyticsOverview from "../src/components/AnalyticsOverview";

function Dashboard() {
  const navigate = useNavigate();

  const { applications } = useOutletContext();

  // SEARCH & FILTER STATE

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const totalInterviews = interviewCount;
  const totalOffers = offerCount;
  const totalRejected = rejectedCount;

  // RESPONSE RATE

  const responseRate =
    totalApplications === 0
      ? 0
      : Math.round(
          ((totalInterviews + totalOffers + totalRejected) /
            totalApplications) *
            100
        );

  // SEARCH + STATUS FILTER

  const filteredApplications = applications.filter((application) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      application.company.toLowerCase().includes(search) ||
      application.position.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const priorityApplications = [...applications]
    .filter(
      (application) => application.priority === "High"
    )
    .slice(0, 3);

  const recentApplications = [...filteredApplications]
    .reverse()
    .slice(0, 5);

  function parseLocalDate(dateString) {
    const [year, month, day] = dateString
      .split("-")
      .map(Number);

    return new Date(year, month - 1, day);
  }

  function getInterviewLabel(dateString) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const interviewDate = parseLocalDate(dateString);

    const difference = Math.round(
      (interviewDate - today) /
        (1000 * 60 * 60 * 24)
    );

    if (difference === 0) {
      return "Today";
    }

    if (difference === 1) {
      return "Tomorrow";
    }

    if (difference > 1 && difference < 7) {
      return `In ${difference} days`;
    }

    if (difference === -1) {
      return "Yesterday";
    }

    if (difference < 0) {
      return "Past";
    }

    return interviewDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  }

  const upcomingInterviews = applications
    .filter(
      (application) =>
        (application.status === "Interview" ||
          application.status === "Offer") &&
        application.interview?.date
    )
    .filter((application) => {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const interviewDate = parseLocalDate(
        application.interview.date
      );

      return interviewDate >= today;
    })
    .sort(
      (a, b) =>
        parseLocalDate(a.interview.date) -
        parseLocalDate(b.interview.date)
    )
    .slice(0, 3);

  // STAT CARDS

  const stats = [
    {
      id: 1,
      title: "Total Applications",
      value: totalApplications,
      change: "+12%",
      description: "vs. last month",
      icon: "◈",
    },

    {
      id: 2,
      title: "Interviews",
      value: totalInterviews,
      change: "+25%",
      description: "vs. last month",
      icon: "◉",
    },

    {
      id: 3,
      title: "Offers",
      value: totalOffers,
      change: "+100%",
      description: "vs. last month",
      icon: "✦",
    },

    {
      id: 4,
      title: "Response Rate",
      value: `${responseRate}%`,
      change: "+4.2%",
      description: "vs. last month",
      icon: "%",
    },
  ];

  return (
    <main className="dashboard">

      {/* DASHBOARD HEADER */}

      <section className="dashboard-header">

        <div>

          <span className="dashboard-eyebrow">
            YOUR CAREER JOURNEY
          </span>

          <h1>
            Good morning, Damla <span>👋</span>
          </h1>

          <p>
            Here's what's happening with your job search.
          </p>

        </div>

        <button
          className="add-job-button"
          onClick={() =>
            navigate("/applications/new")
          }
        >
          <span>+</span>
          Add application
        </button>

      </section>


      {/* CAREER SIMULATOR */}

      <section className="career-simulator-cta">

        <div className="career-cta-content">

          <span className="career-cta-eyebrow">
            CAREER PLANNER
          </span>

          <h2>
            Build your next{" "}
            <span>career move.</span>
          </h2>

          <p>
            Choose your target career, compare your
            skills, and discover what you should learn next.
          </p>

          <button
            className="career-cta-button"
            onClick={() =>
              navigate("/career-simulator")
            }
          >
            Explore Career Simulator
            <span>→</span>
          </button>

        </div>

        <div className="career-cta-visual">

          <div className="career-cta-orbit orbit-one"></div>

          <div className="career-cta-orbit orbit-two"></div>

          <div className="career-cta-center">
            <span>✦</span>
          </div>

          <div className="career-cta-node node-one">
            React
          </div>

          <div className="career-cta-node node-two">
            Skills
          </div>

          <div className="career-cta-node node-three">
            Career
          </div>

        </div>

      </section>


      {/* STATISTICS */}

      <section className="stats-grid">

        {stats.map((stat) => (

          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            description={stat.description}
            icon={stat.icon}
          />

        ))}

      </section>


      {/* APPLICATION ANALYTICS */}

      <section className="analytics-section">

        <div className="analytics-header">

          <div>

            <span className="page-eyebrow">
              APPLICATION ANALYTICS
            </span>

            <h2>
              Application Pipeline
            </h2>

            <p>
              Track your recruitment journey.
            </p>

          </div>

          <div className="analytics-total">

            <span>
              Total
            </span>

            <strong>
              {totalApplications}
            </strong>

          </div>

        </div>


        <div className="pipeline">

          <AnalyticsOverview
            totalApplications={totalApplications}
            appliedCount={appliedCount}
            interviewCount={interviewCount}
            offerCount={offerCount}
            rejectedCount={rejectedCount}
          />


          {/* PRIORITY APPLICATIONS */}

          <section className="priority-section">

            <div className="priority-section-header">

              <div>

                <span className="section-eyebrow">
                  FOCUS AREA
                </span>

                <h2>
                  Priority Applications
                </h2>

                <p>
                  Keep your most important opportunities close.
                </p>

              </div>

              <div className="priority-badge">
                ★ High Priority
              </div>

            </div>


            <div className="priority-list">

              {priorityApplications.length > 0 ? (

                priorityApplications.map(
                  (application) => (

                    <div
                      className="priority-application"
                      key={application.id}
                      onClick={() =>
                        navigate(
                          `/applications/${application.id}`
                        )
                      }
                    >

                      <div className="priority-company">

                        <div className="priority-company-logo">
                          {application.company.charAt(0)}
                        </div>

                        <div>

                          <h3>
                            {application.company}
                          </h3>

                          <p>
                            {application.position}
                          </p>

                        </div>

                      </div>


                      <div className="priority-middle">

                        <span className="priority-status">
                          {application.status}
                        </span>

                        <span className="priority-date">
                          {application.date}
                        </span>

                      </div>


                      <div className="priority-arrow">
                        →
                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="priority-empty">

                  <span>
                    ☆
                  </span>

                  <div>

                    <h3>
                      No high priority applications
                    </h3>

                    <p>
                      Mark important opportunities as High Priority.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </section>


          {/* APPLIED */}

          <div className="pipeline-step applied">

            <div className="pipeline-icon">
              ✓
            </div>

            <div className="pipeline-info">

              <span>
                Applied
              </span>

              <strong>
                {totalApplications}
              </strong>

            </div>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          {/* INTERVIEW */}

          <div className="pipeline-step interview">

            <div className="pipeline-icon">
              ↗
            </div>

            <div className="pipeline-info">

              <span>
                Interview
              </span>

              <strong>
                {totalInterviews}
              </strong>

            </div>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          {/* OFFER */}

          <div className="pipeline-step offer">

            <div className="pipeline-icon">
              ★
            </div>

            <div className="pipeline-info">

              <span>
                Offer
              </span>

              <strong>
                {totalOffers}
              </strong>

            </div>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          {/* REJECTED */}

          <div className="pipeline-step rejected">

            <div className="pipeline-icon">
              ×
            </div>

            <div className="pipeline-info">

              <span>
                Rejected
              </span>

              <strong>
                {totalRejected}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* UPCOMING INTERVIEWS */}

      {/* UPCOMING INTERVIEWS */}

<section className="upcoming-interviews">

  <div className="upcoming-interviews-header">

    <div>
      <span className="section-eyebrow">
        INTERVIEW SCHEDULE
      </span>

      <h2>
        Upcoming Interviews
      </h2>

      <p>
        Stay prepared for your next opportunity.
      </p>
    </div>

    <div className="interview-count-badge">
      {upcomingInterviews.length}
    </div>

  </div>


  <div className="upcoming-interviews-list">

    {upcomingInterviews.length > 0 ? (

      upcomingInterviews.map((application) => (

        <div
          className="upcoming-interview-card"
          key={application.id}
          onClick={() =>
            navigate(`/applications/${application.id}`)
          }
        >

          <div className="upcoming-company">

            <div className="upcoming-company-logo">
              {application.company.charAt(0)}
            </div>

            <div>

              <h3>
                {application.company}
              </h3>

              <p>
                {application.position}
              </p>

            </div>

          </div>


          <div className="upcoming-interview-info">

            <div className="interview-detail">

              <span className="interview-detail-icon">
                📅
              </span>

              <div>

                <small>
                  DATE
                </small>

                <strong>
                  {getInterviewLabel(
                    application.interview.date
                  )}
                </strong>

              </div>

            </div>


            <div className="interview-detail">

              <span className="interview-detail-icon">
                🕐
              </span>

              <div>

                <small>
                  TIME
                </small>

                <strong>
                  {application.interview.time || "--:--"}
                </strong>

              </div>

            </div>


            <div className="interview-detail">

              <span className="interview-detail-icon">
                💻
              </span>

              <div>

                <small>
                  TYPE
                </small>

                <strong>
                  {application.interview.type}
                </strong>

              </div>

            </div>

          </div>


          {application.interview?.meetingLink ? (

            <button
              className="join-interview-button"
              onClick={(e) => {

                e.stopPropagation();

                window.open(
                  application.interview.meetingLink,
                  "_blank",
                  "noopener,noreferrer"
                );

              }}
            >
              Join Interview
              <span>↗</span>
            </button>

          ) : (

            <div className="upcoming-interview-arrow">
              →
            </div>

          )}

        </div>

      ))

    ) : (

      <div className="no-upcoming-interviews">

        <div className="no-interview-icon">
          ◷
        </div>

        <div>

          <h3>
            No upcoming interviews
          </h3>

          <p>
            Your scheduled interviews will appear here.
          </p>

        </div>

      </div>

    )}

  </div>

</section>


      {/* APPLICATIONS */}

      <section className="applications-section">

        {/* SEARCH + FILTER */}

        <div className="application-tools">

          {/* SEARCH */}

          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>


          {/* STATUS FILTERS */}

          <div className="status-filters">

            <button
              className={
                statusFilter === "All"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setStatusFilter("All")
              }
            >
              All
            </button>


            <button
              className={
                statusFilter === "Applied"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setStatusFilter("Applied")
              }
            >
              Applied
            </button>


            <button
              className={
                statusFilter === "Interview"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setStatusFilter("Interview")
              }
            >
              Interview
            </button>


            <button
              className={
                statusFilter === "Offer"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setStatusFilter("Offer")
              }
            >
              Offer
            </button>


            <button
              className={
                statusFilter === "Rejected"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setStatusFilter("Rejected")
              }
            >
              Rejected
            </button>

          </div>

        </div>


        {/* SECTION HEADER */}

        <div className="section-header">

          <div>

            <span className="section-eyebrow">
              ACTIVITY
            </span>

            <h2>
              Recent Applications
            </h2>

            <p>
              Keep track of your latest job applications.
            </p>

          </div>


          <button
            className="view-all-button"
            onClick={() =>
              navigate("/applications")
            }
          >
            View all

            <span>
              →
            </span>

          </button>

        </div>


        {/* APPLICATION LIST */}

        <div className="applications-list">

          {recentApplications.map(
            (application) => (

              <div
                key={application.id}
                onClick={() =>
                  navigate(
                    `/applications/${application.id}`
                  )
                }
                style={{ cursor: "pointer" }}
              >

                <ApplicationCard
                  company={application.company}
                  position={application.position}
                  status={application.status}
                  priority={application.priority}
                  date={application.date}
                />

              </div>

            )
          )}


          {/* EMPTY STATE */}

          {recentApplications.length === 0 && (

            <div className="empty-applications">

              <span>
                ✦
              </span>

              <h3>
                No applications found
              </h3>

              <p>
                Try changing your search or status filter.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Dashboard;