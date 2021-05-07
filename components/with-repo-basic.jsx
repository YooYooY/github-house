import Repo from './Repo'
import Link from 'next/link'
import { useEffect } from 'react'
import { withRouter } from 'next/router'
import api from '../lib/api'
import { cache, get } from '../lib/repo-basic-cache'
import { isServer } from '../lib/utils'

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

    useEffect(() => {
      if (!isServer) cache(repoBasic)
    }, [])

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
        <div className="repo-content">
          <Comp {...restProps} />
        </div>
        <style jsx>{`
          .root {
            padding-top: 20px;
          }
          .repo-basic {
            border: 1px solid #eee;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 2px 2px 10px #ddd;
          }
          .repo-content {
            background-color: #fff;
            padding: 20px;
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

    let compProps = {}
    if (Comp.getInitialProps) {
      compProps = await Comp.getInitialProps(props)
    }

    const full_name = `${owner}/${name}`
    let repoBasic = get(full_name)
    if (repoBasic) {
      return {
        repoBasic,
        ...compProps,
      }
    }

    const url = `/repos/${full_name}`
    const repoBasicReps = await api.request({ url }, ctx.req, ctx.res)
    repoBasic = repoBasicReps.data

    return {
      repoBasic,
      ...compProps,
    }
  }

  return withRouter(RepoBasic)
}
