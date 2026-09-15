import "../../css/StatCard.css";

function StatCard({
  title,
  value,
  change,
  description,
  icon,
  positive = true
}) {
  return (
    <article className="stat-card">

      <div className="stat-card-top">

        <div className="stat-title">
          <span className="stat-title-dot"></span>

          {title}
        </div>

        <div className="stat-icon">
          {icon}
        </div>

      </div>


      <div className="stat-card-main">

        <strong>
          {value}
        </strong>

      </div>


      <div className="stat-card-bottom">

        <span
          className={
            positive
              ? "stat-change positive"
              : "stat-change negative"
          }
        >
          {positive ? "↗" : "↘"} {change}
        </span>

        <span className="stat-description">
          {description}
        </span>

      </div>

    </article>
  );
}

export default StatCard;