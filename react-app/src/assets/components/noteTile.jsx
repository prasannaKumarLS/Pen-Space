export default function NoteTile(props) {
  return (
    <>
      <div className="noteTile-container">
        <div className="noteCard-title whitespace-nowrap overflow-hidden text-ellipsis">
          {props.title}
        </div>
        <div className="noteCard-divider"></div>
        <p className="noteCard-content overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] ">
          {props.summary}
        </p>
        <div className="noteCard-footer">
          <span className="category-tag">{props.category}</span>
          <span className="card-date">{props.modifiedOn}</span>
        </div>
      </div>
    </>
  );
}
