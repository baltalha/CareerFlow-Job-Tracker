
import "../css/AddApplication.css";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function AddApplication() {

  const navigate = useNavigate();

  const { setApplications } = useOutletContext();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [priority, setPriority] = useState("Normal");
  const [date, setDate] = useState("");


  function handleSubmit(e) {

    e.preventDefault();


    // Boş alan kontrolü

    if (!company.trim() || !position.trim() || !date) {
      alert("Please fill in all fields.");
      return;
    }


    // Yeni başvuru

    const newApplication = {
      id: Date.now(),
      company: company.trim(),
      position: position.trim(),
      status: status,
     priority: priority,
      date: date,
    };


    // Application listesine ekle

    setApplications((currentApplications) => [
      ...currentApplications,
      newApplication,
    ]);


    // Dashboard'a dön

    navigate("/");

  }


  function handleCancel() {
    navigate("/");
  }


  return (

    <main className="add-application-page">

      <div className="add-application-container">


        {/* PAGE HEADER */}

        <div className="add-application-header">

          <span className="page-eyebrow">
            CAREER TRACKER
          </span>

          <h1>
            Add Application
          </h1>

          <p>
            Keep your job search organized by adding a new opportunity.
          </p>

        </div>


        {/* FORM CARD */}

        <form
          className="application-form-card"
          onSubmit={handleSubmit}
        >


          {/* FORM HEADER */}

          <div className="form-card-header">

            <div>

              <h2>
                New application
              </h2>

              <p>
                Tell us about the position you're applying for.
              </p>

            </div>


            <div className="form-card-icon">
              +
            </div>

          </div>


          {/* COMPANY */}

          <div className="form-group">

            <label htmlFor="company">
              Company
            </label>

            <input
              id="company"
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

          </div>


          {/* POSITION */}

          <div className="form-group">

            <label htmlFor="position">
              Position
            </label>

            <input
              id="position"
              type="text"
              placeholder="e.g. Frontend Developer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />

          </div>


          {/* STATUS + DATE */}

          <div className="form-row">


<div className="form-group">

  <label htmlFor="priority">
    Priority
  </label>

  <select
    id="priority"
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >

    <option value="Normal">
      Normal
    </option>

    <option value="Medium">
      Medium
    </option>

    <option value="High">
      High
    </option>

  </select>

</div>

            {/* STATUS */}

            <div className="form-group">

              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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


            {/* DATE */}

            <div className="form-group">

              <label htmlFor="date">
                Application date
              </label>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

            </div>

          </div>


          {/* ACTIONS */}

          <div className="form-actions">


            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="submit-button"
            >

              Add Application

              <span>
                →
              </span>

            </button>


          </div>

        </form>

      </div>

    </main>

  );

}


export default AddApplication;

