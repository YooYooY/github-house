import Repo from './Repo'
import Link from 'next/link'
import { withRouter } from 'next/router'
import api from '../lib/api'

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

export default function(Comp, type = 'index') {
  function RepoBasic(props) {
    const { repoBasic, router, ...restProps } = props
    const query = makeQuery(router.query)

    return (
      <div className="root">
        <div className="repo-basic">
          <Repo repo={repoBasic} />
          <div className="tabs">
            {type === 'index' ? (
              <span className="tab">Readme</span>
            ) : (
              <Link href={`/detail${query}`}>
                <a className="tab index">Readme</a>
              </Link>
            )}
            {type === 'issues' ? (
              <span className="tab">Issues</span>
            ) : (
              <Link href={`/detail/issues${query}`}>
                <a className="tab issues">Issues</a>
              </Link>
            )}
          </div>
        </div>
        <div>
          <Comp {...restProps} />
        </div>
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
          .tabs {
            padding: 0 20px 20px;
            background-color: #fff;
          }
          .tab + .tab {
            margin-left: 20px;
          }
        `}</style>
      </div>
    )
  }

  RepoBasic.getInitialProps = async (props) => {
    const { ctx } = props
    const { owner, name } = ctx.query
    const url = `/repos/${owner}/${name}`
    const repoBasic = await api.request({ url }, ctx.req, ctx.res)

    let compProps = {}
    if (Comp.getInitialProps) {
      compProps = await Comp.getInitialProps(props)
    }

    return { repoBasic: repoBasic.data, compProps }
  }

  return withRouter(RepoBasic)
}
