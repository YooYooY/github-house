export default function Page(props) {
  return (
    <div>
        <h3>title</h3>
      <div>{props.children}</div>
    </div>
  )
}
