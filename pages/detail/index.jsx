import Repo from '../../components/Repo'
import Link from 'next/link'
import { withRouter } from 'next/router'
import api from '../../lib/api'

const makeQuery = (queryObject) => {
  return (
    '?' +
    Object.entries(queryObject)
      .reduce((result, entry) => {
        result.push(entry.join('='))
        return result
      }, [])
      .join('&')
  )
}

function Detail({ repoBasic, router }) {
  const query = makeQuery(router.query)

  return (
    <div className="root">
      <div className="repo-basic">
        <Repo repo={repoBasic} />
        <div className="tabs">
          <Link href={`/detail${query}`}>
            <a className="tab index">Readme</a>
          </Link>
          <Link href={`/detail/issues${query}`}>
            <a className="tab issues">Issues</a>
          </Link>
        </div>
      </div>
      <div>Readme</div>
      <style jsx>{`
        .root {
          padding-top: 20px;
        }
        .repo-basic {
          padding: 20px;
          border: 1px solid #eee;
          margin-bottom: 20px;
          border-radius: 5px;
        }
        .tab + .tab {
          margin-left: 20px;
        }
      `}</style>
    </div>
  )
}

Detail.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query
  console.log('owner', owner)
  console.log('name', name)
  const url = `/repos/${owner}/${name}`
  const repoBasic = await api.request({ url }, ctx.req, ctx.res)

  return { repoBasic: repoBasic.data }
}

export default withRouter(Detail)
