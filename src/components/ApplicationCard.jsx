
import "../../css/ApplicationCard.css"
function ApplicationCard({
  company,
  position,
  status,
 priority,
  date,
}) {
  return (
    <div className="application-card">

      <div className="company-info">

        <div className="company-logo">
          {company.charAt(0)}
        </div>

        <div>
          <h3>{company}</h3>
          <p>{position}</p>
        </div>

      </div>
<div className={`application-priority ${ priority?.toLowerCase() }`} > <span>★</span> {priority || "Normal"} </div>

      <div className={`application-status ${status.toLowerCase()}`}>
        {status}
      </div>


      <span className="application-date">
        {date}
      </span>

    </div>
  );
}

export default ApplicationCard;