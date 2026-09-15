import {
  useParams,
  useOutletContext,
  useNavigate
} from "react-router-dom";

import "../css/ApplicationDetails.css";


function ApplicationDetails() {

  const { id } = useParams();

  const { applications, setApplications } = useOutletContext();

  const navigate = useNavigate();


  const application = applications.find(
    (application) => application.id === Number(id)
  );


  // APPLICATION BULUNAMADIYSA
  if (!application) {

    return (
      <main className="application-details-page">

        <div className="not-found-card">

          <div className="not-found-icon">
            ?
          </div>

          <span className="page-eyebrow">
            CAREER TRACKER
          </span>

          <h1>
            Application not found
          </h1>

          <p>
            The application you're looking for doesn't exist
            or may have been removed.
          </p>

          <button
            onClick={() => navigate("/applications")}
          >
            <span>←</span>
            Back to applications
          </button>

        </div>

      </main>
    );

  }


  // STATUS KONTROLLERİ
  const isInterview = application.status === "Interview";
  const isOffer = application.status === "Offer";
  const isRejected = application.status === "Rejected";


  const interview = application.interview || {
  date: "",
  time: "",
  type: "Online",
  interviewer: "",
  meetingLink: "",
  notes: ""
};


  // STATUS DEĞİŞTİRME
  function handleStatusChange(newStatus) {

    setApplications((currentApplications) => {

      return currentApplications.map((application) => {

        if (application.id === Number(id)) {

          return {
            ...application,
            status: newStatus,
          };

        }

        return application;

      });

    });

  }


  // INTERVIEW BİLGİLERİNİ GÜNCELLE
  function handleInterviewChange(field, value) {

    setApplications((currentApplications) => {

      return currentApplications.map((application) => {

        if (application.id === Number(id)) {

          return {
            ...application,

            interview: {
              ...(application.interview || {
                date: "",
                time: "",
                type: "Online",
                interviewer: "",
                meetingLink:"",
                notes: ""
              }),

              [field]: value
            }
          };

        }

        return application;

      });

    });

  }


  // APPLICATION SİLME
  function handleDelete() {

    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }


    setApplications((currentApplications) => {

      return currentApplications.filter(
        (application) => application.id !== Number(id)
      );

    });


    navigate("/applications");

  }


  return (

    <main className="application-details-page">


      {/* BACK BUTTON */}

      <button
        className="back-button"
        onClick={() => navigate("/applications")}
      >
        <span>←</span>
        Back to applications
      </button>


      {/* HEADER */}

      <section className="details-header">

        <div className="details-company">

          <div className="details-logo">
            {application.company.charAt(0)}
          </div>

          <div>

            <span className="page-eyebrow">
              APPLICATION DETAILS
            </span>

            <h1>
              {application.company}
            </h1>

            <p>
              {application.position}
            </p>

          </div>

        </div>


        <span
          className={`details-status ${application.status.toLowerCase()}`}
        >

          <span className="status-dot"></span>

          {application.status}

        </span>

      </section>


      {/* INFORMATION GRID */}

      <section className="details-grid">


        {/* POSITION */}

        <article className="detail-card">

          <div className="detail-card-icon">
            ◈
          </div>

          <div>

            <span className="detail-label">
              POSITION
            </span>

            <h2>
              {application.position}
            </h2>

          </div>

        </article>


        {/* COMPANY */}

        <article className="detail-card">

          <div className="detail-card-icon">
            ◎
          </div>

          <div>

            <span className="detail-label">
              COMPANY
            </span>

            <h2>
              {application.company}
            </h2>

          </div>

        </article>


        {/* DATE */}

        <article className="detail-card">

          <div className="detail-card-icon">
            ◷
          </div>

          <div>

            <span className="detail-label">
              APPLICATION DATE
            </span>

            <h2>
              {application.date}
            </h2>

          </div>

        </article>


        {/* STATUS */}

        <article className="detail-card">

          <div className="detail-card-icon">
            ✦
          </div>

          <div>

            <span className="detail-label">
              CURRENT STATUS
            </span>

            <h2>
              {application.status}
            </h2>

            <select
              value={application.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="status-select"
            >

              <option value="Applied">
                Applied
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Offer">
                Offer
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

        </article>

      </section>


      {/* INTERVIEW TRACKER */}

      {(isInterview || isOffer) && (

        <section className="interview-tracker">

          <div className="interview-header">

            <div>

              <span className="page-eyebrow">
                INTERVIEW TRACKER
              </span>

              <h2>
                Interview details
              </h2>

              <p>
                Keep important interview information in one place.
              </p>

            </div>

            <div className="interview-header-icon">
              ◉
            </div>

          </div>


          <div className="interview-form">
<div className="interview-field">
  <label htmlFor="meeting-link">
    Meeting link
  </label>

  <input
    id="meeting-link"
    type="url"
    placeholder="https://meet.google.com/..."
    value={interview.meetingLink}
    onChange={(e) =>
      handleInterviewChange(
        "meetingLink",
        e.target.value
      )
    }
  />
</div>

<div className="interview-field">
  <label htmlFor="meeting-link">
    Meeting link
  </label>

  <input
    id="meeting-link"
    type="url"
    placeholder="https://meet.google.com/..."
    value={interview.meetingLink}
    onChange={(e) =>
      handleInterviewChange(
        "meetingLink",
        e.target.value
      )
    }
  />
</div>
            {/* DATE */}

            <div className="interview-field">

              <label htmlFor="interview-date">
                Interview date
              </label>

              <input
                id="interview-date"
                type="date"
                value={interview.date}
                onChange={(e) =>
                  handleInterviewChange(
                    "date",
                    e.target.value
                  )
                }
              />

            </div>


            {/* TIME */}

            <div className="interview-field">

              <label htmlFor="interview-time">
                Interview time
              </label>

              <input
                id="interview-time"
                type="time"
                value={interview.time}
                onChange={(e) =>
                  handleInterviewChange(
                    "time",
                    e.target.value
                  )
                }
              />

            </div>


            {/* TYPE */}

            <div className="interview-field">

              <label htmlFor="interview-type">
                Interview type
              </label>

              <select
                id="interview-type"
                value={interview.type}
                onChange={(e) =>
                  handleInterviewChange(
                    "type",
                    e.target.value
                  )
                }
              >

                <option value="Online">
                  Online
                </option>

                <option value="Phone">
                  Phone
                </option>

                <option value="On-site">
                  On-site
                </option>

              </select>

            </div>


            {/* INTERVIEWER */}

            <div className="interview-field">

              <label htmlFor="interviewer">
                Interviewer
              </label>

              <input
                id="interviewer"
                type="text"
                placeholder="e.g. Sarah Johnson"
                value={interview.interviewer}
                onChange={(e) =>
                  handleInterviewChange(
                    "interviewer",
                    e.target.value
                  )
                }
              />

            </div>


            {/* NOTES */}

            <div className="interview-field interview-notes">

              <label htmlFor="interview-notes">
                Interview notes
              </label>

              <textarea
                id="interview-notes"
                placeholder="Add important notes, questions or preparation topics..."
                value={interview.notes}
                onChange={(e) =>
                  handleInterviewChange(
                    "notes",
                    e.target.value
                  )
                }
                rows="5"
              />

            </div>

          </div>


          <div className="interview-saved">

            <span>
              ✓
            </span>

            Interview information is automatically saved.

          </div>

        </section>

      )}


      {/* ACTIVITY */}

      <section className="activity-card">

        <div className="activity-header">

          <div>

            <span className="page-eyebrow">
              ACTIVITY
            </span>

            <h2>
              Application timeline
            </h2>

          </div>


          <span className="activity-count">

            {application.status === "Applied" && "01"}

            {application.status === "Interview" && "02"}

            {application.status === "Offer" && "03"}

            {application.status === "Rejected" && "02"}

          </span>

        </div>


        <div className="timeline">


          {/* APPLICATION SUBMITTED */}

          <div className="timeline-item active">

            <div className="timeline-marker">
              ✓
            </div>

            <div className="timeline-content">

              <strong>
                Application submitted
              </strong>

              <p>
                Your application was added to CareerFlow.
              </p>

            </div>

            <span>
              {application.date}
            </span>

          </div>


          <div className="timeline-line"></div>


          {/* INTERVIEW */}

          <div
            className={`timeline-item interview ${
              isInterview || isOffer
                ? "active"
                : "muted"
            }`}
          >

            <div className="timeline-marker">

              {isInterview || isOffer
                ? "✓"
                : "•"}

            </div>


            <div className="timeline-content">

              <strong>
                Interview
              </strong>

              <p>

                {isInterview || isOffer
                  ? "You reached the interview stage."
                  : "Interview stage has not been reached yet."}

              </p>

            </div>

          </div>


          {/* OFFER */}

          {(isOffer || isRejected) && (

            <>
              <div className="timeline-line"></div>

              <div
                className={`timeline-item offer ${
                  isOffer ? "active" : "muted"
                }`}
              >

                <div className="timeline-marker">

                  {isOffer
                    ? "✓"
                    : "•"}

                </div>


                <div className="timeline-content">

                  <strong>
                    Offer
                  </strong>

                  <p>

                    {isOffer
                      ? "You received an offer."
                      : "The application did not result in an offer."}

                  </p>

                </div>

              </div>
            </>

          )}


          {/* REJECTED */}

          {isRejected && (

            <>
              <div className="timeline-line"></div>

              <div className="timeline-item applied active">

                <div className="timeline-marker">
                  ✕
                </div>

                <div className="timeline-content">

                  <strong>
                    Application rejected
                  </strong>

                  <p>
                    This application was marked as rejected.
                  </p>

                </div>

              </div>
            </>

          )}


          {/* NEXT STEP */}

          {!isOffer && !isRejected && (

            <>
              <div className="timeline-line"></div>

              <div className="timeline-item muted">

                <div className="timeline-marker">
                  •
                </div>

                <div className="timeline-content">

                  <strong>
                    Next step
                  </strong>

                  <p>
                    Update the application status as your
                    recruitment process progresses.
                  </p>

                </div>

              </div>
            </>

          )}

        </div>

      </section>


      {/* DANGER ZONE */}

      <section className="danger-zone">

        <div>

          <span className="page-eyebrow">
            DANGER ZONE
          </span>

          <h2>
            Delete application
          </h2>

          <p>
            This action cannot be undone.
            The application will be permanently removed.
          </p>

        </div>


        <button
          className="delete-button"
          onClick={handleDelete}
        >
          Delete application
        </button>

      </section>


    </main>

  );

}

export default ApplicationDetails;