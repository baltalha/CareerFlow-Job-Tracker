import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/Navbar.css";

function Navbar({ applications = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = applications.reduce(
    (items, application) => {
      if (application.status === "Interview") {
        items.push({
          id: `interview-${application.id}`,
          type: "interview",
          icon: "◉",
          title: "Interview opportunity",
          message: `${application.company} moved you to the interview stage.`,
        });
      }

      if (application.status === "Offer") {
        items.push({
          id: `offer-${application.id}`,
          type: "offer",
          icon: "✦",
          title: "Congratulations!",
          message: `${application.company} sent you an offer.`,
        });
      }

      if (application.status === "Rejected") {
        items.push({
          id: `rejected-${application.id}`,
          type: "rejected",
          icon: "×",
          title: "Application update",
          message: `${application.company} has rejected your application.`,
        });
      }

      if (application.status === "Applied") {
        const applicationDate = new Date(application.date);
        const today = new Date();

        const difference =
          today.getTime() - applicationDate.getTime();

        const daysPassed = Math.floor(
          difference / (1000 * 60 * 60 * 24)
        );

        if (daysPassed >= 3) {
          items.push({
            id: `followup-${application.id}`,
            type: "followup",
            icon: "⏰",
            title: "Follow-up reminder",
            message: `It's been ${daysPassed} days since you applied to ${application.company}.`,
          });
        }
      }

      return items;
    },
    []
  );

  const unreadCount = notifications.length;

  const isDashboard = location.pathname === "/";
  const isApplications = location.pathname === "/applications";
  const isSkills = location.pathname === "/skills";
  const isJobAnalyzer = location.pathname === "/job-analyzer";
const isCareerCenter = location.pathname === "/career-center";
  return (
    <header className="navbar">

      {/* =====================================================
          NAVBAR LEFT
      ===================================================== */}

      <div className="navbar-left">

        <div
          className="brand"
          onClick={() => navigate("/")}
        >

          <div className="brand-mark">

            <div className="brand-mark-glow"></div>

            <span>C</span>

          </div>

          <div className="brand-content">

            <span className="brand-name">
              CareerFlow
            </span>

            <span className="brand-subtitle">
              Career OS
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          CENTER NAVIGATION
      ===================================================== */}

      <div className="navbar-center">

        <nav className="nav-links">


          {/* =========================
              DASHBOARD
          ========================= */}

          <button
            className={`nav-link ${
              isDashboard ? "active" : ""
            }`}
            onClick={() => navigate("/")}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" />

              </svg>

            </span>

            <span>
              Dashboard
            </span>

          </button>


          {/* =========================
              APPLICATIONS
          ========================= */}

          <button
            className={`nav-link ${
              isApplications ? "active" : ""
            }`}
            onClick={() => navigate("/applications")}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 4h10M8 11h8M8 15h5" />

              </svg>

            </span>

            <span>
              Applications
            </span>

          </button>


          {/* =========================
              MY SKILLS
          ========================= */}

          <button
            className={`nav-link ${
              isSkills ? "active" : ""
            }`}
            onClick={() => navigate("/skills")}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="M12 3l2.2 4.5L19 9l-4.5 2.2L12 16l-2.2-4.8L5 9l4.8-1.5L12 3Z" />

                <path d="M19 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />

              </svg>

            </span>

            <span>
              My Skills
            </span>

          </button>


          {/* =========================
              AI JOB ANALYZER
          ========================= */}

          <button
            className={`nav-link nav-ai ${
              isJobAnalyzer ? "active" : ""
            }`}
            onClick={() => navigate("/job-analyzer")}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />

                <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />

              </svg>

            </span>

            <span>
              AI Analyzer
            </span>

          </button>

<button
  className={`nav-link ${
    isCareerCenter ? "active" : ""
  }`}
  onClick={() => navigate("/career-center")}
>
  <span className="nav-icon">

    <svg viewBox="0 0 24 24">

      <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />

    </svg>

  </span>

  <span>
    Career Center
  </span>

</button>
        </nav>

      </div>


      {/* =====================================================
          NAVBAR RIGHT
      ===================================================== */}

      <div className="navbar-right">


        {/* =========================
            SEARCH
        ========================= */}

        <button className="search-button">

          <span className="search-icon">

            <svg viewBox="0 0 24 24">

              <circle
                cx="11"
                cy="11"
                r="6"
              />

              <path d="m16 16 5 5" />

            </svg>

          </span>

          <span className="search-text">
            Search
          </span>

          <kbd>
            ⌘ K
          </kbd>

        </button>


        {/* =========================
            NOTIFICATIONS
        ========================= */}

        <div className="notification-wrapper">

          <button
            className={`notification-button ${
              notificationsOpen
                ? "notification-active"
                : ""
            }`}
            onClick={() =>
              setNotificationsOpen(!notificationsOpen)
            }
            aria-label="Notifications"
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >

              <path
                d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
              />

              <path d="M13.73 21a2 2 0 0 1-3.46 0" />

            </svg>


            {unreadCount > 0 && (
              <span className="notification-count">
                {unreadCount > 9
                  ? "9+"
                  : unreadCount}
              </span>
            )}

          </button>


          {/* NOTIFICATION PANEL */}

          {notificationsOpen && (

            <div className="notification-panel">

              <div className="notification-panel-header">

                <div>

                  <span>
                    NOTIFICATIONS
                  </span>

                  <h3>
                    Activity Center
                  </h3>

                </div>

                <div className="notification-total">
                  {unreadCount}
                </div>

              </div>


              <div className="notification-list">

                {notifications.length > 0 ? (

                  notifications.map((notification) => (

                    <div
                      className={`notification-item ${notification.type}`}
                      key={notification.id}
                    >

                      <div className="notification-icon">
                        {notification.icon}
                      </div>

                      <div className="notification-content">

                        <strong>
                          {notification.title}
                        </strong>

                        <p>
                          {notification.message}
                        </p>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="notification-empty">

                    <div className="notification-empty-icon">
                      ✓
                    </div>

                    <h4>
                      You're all caught up
                    </h4>

                    <p>
                      No new activity to review.
                    </p>

                  </div>

                )}

              </div>


              <div className="notification-panel-footer">

                <span>
                  CareerFlow
                </span>

                <span>
                  Live activity
                </span>

              </div>

            </div>

          )}

        </div>


        {/* =========================
            PROFILE
        ========================= */}

        <div className="profile">

          <div className="profile-avatar">

            <span>
              D
            </span>

            <div className="avatar-glow"></div>

          </div>


          <div className="profile-info">

            <span className="profile-name">
              Damla
            </span>

            <span className="profile-role">
              Job Seeker
            </span>

          </div>


          <svg
            className="profile-arrow"
            viewBox="0 0 24 24"
          >

            <path d="m6 9 6 6 6-6" />

          </svg>

        </div>


      </div>

    </header>
  );
}

export default Navbar;