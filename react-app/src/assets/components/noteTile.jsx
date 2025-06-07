export default function NoteTile(props) {
  return (
    <>
      <div class="noteTile-container">
        <div class="noteCard-title whitespace-nowrap overflow-hidden text-ellipsis">
          {props.title}
        </div>
        <div class="noteCard-divider"></div>
        <p class="noteCard-content overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] ">
          {props.summary}
        </p>
        <div class="noteCard-footer">
          <span class="category-tag">{props.category}</span>
          <span class="card-date">{props.modifiedOn}</span>
        </div>
      </div>
    </>
  );
}
