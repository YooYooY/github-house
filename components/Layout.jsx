import Link from 'next/link'
import { Button } from 'antd'

export default ({ children }) => {
  return (
    <>
      <header>
        <Link href="/tab/query?name=chenwl">
          <a>
            <Button>query</Button>
          </a>
        </Link>
        <Link href="/">
          <a>
            <Button>home</Button>
          </a>
        </Link>
      </header>
      <main>{children}</main>
    </>
  )
}
