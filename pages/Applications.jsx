import { useNavigate, useOutletContext } from "react-router-dom";
import "../css/Aplications.css"
import { useState } from "react";

function Applications() {

  const navigate = useNavigate();

  const { applications } = useOutletContext();
const [searchTerm, setSearchTerm] = useState("");
 const [statusFilter, setStatusFilter] = useState("All");
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

return (
    <main className="applications-page">

      <div className="applications-page-header">
<div className="applications-toolbar">

  <div className="applications-search">

    <span>⌕</span>

    <input
      type="text"
      placeholder="Search applications..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

  </div>
<div className="status-filters">

  <button
    className={statusFilter === "All" ? "active" : ""}
    onClick={() => setStatusFilter("All")}
  >
    All
  </button>

  <button
    className={statusFilter === "Applied" ? "active" : ""}
    onClick={() => setStatusFilter("Applied")}
  >
    Applied
  </button>

  <button
    className={statusFilter === "Interview" ? "active" : ""}
    onClick={() => setStatusFilter("Interview")}
  >
    Interview
  </button>

  <button
    className={statusFilter === "Offer" ? "active" : ""}
    onClick={() => setStatusFilter("Offer")}
  >
    Offer
  </button>

  <button
    className={statusFilter === "Rejected" ? "active" : ""}
    onClick={() => setStatusFilter("Rejected")}
  >
    Rejected
  </button>

</div>
</div>
        <div>

          <span className="page-eyebrow">
            CAREER TRACKER
          </span>

          <h1>
            All Applications
          </h1>

          <p>
            Manage and track all of your job applications.
          </p>

        </div>


        <button
          className="add-application-page-button"
          onClick={() => navigate("/applications/new")}
        >
          <span>+</span>
          Add application
        </button>

      </div>


      <div className="applications-page-list">

        {filteredApplications.map((application) => (

          <div
            className="application-row"
            key={application.id}
         onClick={() => navigate(`/applications/${application.id}`)}
         >

            <div className="application-company">

              <div className="company-logo">
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


            <span
              className={`application-status ${application.status.toLowerCase()}`}
            >
              {application.status}
            </span>


            <span className="application-date">
              {application.date}
            </span>

          </div>

        ))}

      </div>

    </main>
  );
}

export default Applications;