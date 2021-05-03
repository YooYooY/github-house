import Link from 'next/link'

export default function Page(props) {
  return (
    <div>
      <h3>title</h3>
      <Link href="/">
        <a>to Home</a>
      </Link>
      <div>{props.children}</div>
    </div>
  )
}
