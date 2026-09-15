
import "../../css/AnalyticsOverview.css";

function AnalyticsOverview({
  totalApplications,
  appliedCount,
  interviewCount,
  offerCount,
  rejectedCount,
}) {
  const interviewRate =
    totalApplications === 0
      ? 0
      : Math.round((interviewCount / totalApplications) * 100);

  const offerRate =
    totalApplications === 0
      ? 0
      : Math.round((offerCount / totalApplications) * 100);

  const rejectionRate =
    totalApplications === 0
      ? 0
      : Math.round((rejectedCount / totalApplications) * 100);

  const appliedRate =
    totalApplications === 0
      ? 0
      : Math.round((appliedCount / totalApplications) * 100);

  return (
    <section className="analytics-overview">

      <div className="analytics-overview-header">

        <div>
          <span className="page-eyebrow">
            PERFORMANCE INSIGHTS
          </span>

          <h2>
            Your Application Analytics
          </h2>

          <p>
            Understand how your job search is progressing.
          </p>
        </div>

        <div className="analytics-total-box">
          <span>Total Applications</span>
          <strong>{totalApplications}</strong>
        </div>

      </div>


      <div className="analytics-grid">

        <div className="analytics-chart-card">

          <div className="chart-card-header">
            <div>
              <h3>Application Distribution</h3>
              <p>Current application pipeline</p>
            </div>
          </div>


          <div className="distribution-list">

            <div className="distribution-item">

              <div className="distribution-info">
                <span>
                  <i className="distribution-dot applied-dot"></i>
                  Applied
                </span>

                <strong>
                  {appliedCount}
                </strong>
              </div>

              <div className="distribution-bar">
                <div
                  className="distribution-fill applied-fill"
                  style={{ width: `${appliedRate}%` }}
                ></div>
              </div>

              <span className="distribution-percentage">
                {appliedRate}%
              </span>

            </div>


            <div className="distribution-item">

              <div className="distribution-info">
                <span>
                  <i className="distribution-dot interview-dot"></i>
                  Interview
                </span>

                <strong>
                  {interviewCount}
                </strong>
              </div>

              <div className="distribution-bar">
                <div
                  className="distribution-fill interview-fill"
                  style={{ width: `${interviewRate}%` }}
                ></div>
              </div>

              <span className="distribution-percentage">
                {interviewRate}%
              </span>

            </div>


            <div className="distribution-item">

              <div className="distribution-info">
                <span>
                  <i className="distribution-dot offer-dot"></i>
                  Offer
                </span>

                <strong>
                  {offerCount}
                </strong>
              </div>

              <div className="distribution-bar">
                <div
                  className="distribution-fill offer-fill"
                  style={{ width: `${offerRate}%` }}
                ></div>
              </div>

              <span className="distribution-percentage">
                {offerRate}%
              </span>

            </div>


            <div className="distribution-item">

              <div className="distribution-info">
                <span>
                  <i className="distribution-dot rejected-dot"></i>
                  Rejected
                </span>

                <strong>
                  {rejectedCount}
                </strong>
              </div>

              <div className="distribution-bar">
                <div
                  className="distribution-fill rejected-fill"
                  style={{ width: `${rejectionRate}%` }}
                ></div>
              </div>

              <span className="distribution-percentage">
                {rejectionRate}%
              </span>

            </div>

          </div>

        </div>


        <div className="analytics-insights-card">

          <div className="insights-header">
            <span className="insights-icon">✦</span>

            <div>
              <h3>Career Insights</h3>
              <p>Based on your current data</p>
            </div>
          </div>


          <div className="insight-item">

            <div className="insight-number">
              {interviewRate}%
            </div>

            <div>
              <strong>Interview Rate</strong>

              <p>
                Applications that reached the interview stage.
              </p>
            </div>

          </div>


          <div className="insight-item">

            <div className="insight-number">
              {offerRate}%
            </div>

            <div>
              <strong>Offer Rate</strong>

              <p>
                Applications that resulted in an offer.
              </p>
            </div>

          </div>


          <div className="insight-item">

            <div className="insight-number">
              {rejectionRate}%
            </div>

            <div>
              <strong>Rejection Rate</strong>

              <p>
                Applications that were rejected.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AnalyticsOverview;

