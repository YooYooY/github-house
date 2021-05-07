import WithRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'
import { memo } from 'react'
import { Avatar, Button, Spin } from 'antd'
import { useState, useCallback } from 'react'
import { getLastUpdated } from '../../lib/utils'
import dynamic from 'next/dynamic'
const MarkdownRender = dynamic(
  () => import('../../components/MarkdownRender'),
  {
    loading: () => <Spin />,
  }
)

const IssueDetail = memo(({ issue }) => {
  return (
    <div className="root">
      <MarkdownRender content={issue.body} isStr />
      <div className="actions">
        <Button href={issue.html_url} target="_blank">
          打开Issues讨论页面
        </Button>
      </div>
      <style jsx>{`
        .root {
          background-color: #fefefe;
          padding: 20px;
        }
        .actions {
          text-align: right;
        }
      `}</style>
    </div>
  )
})

const IssueItem = memo(({ issue }) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleShowDetail = useCallback(() => {
    setShowDetail((detail) => !detail)
  }, [])

  return (
    <div>
      <div className="issue">
        <Button
          type="primary"
          size="small"
          style={{ position: 'absolute', right: 10, top: 10 }}
          onClick={toggleShowDetail}
        >
          {showDetail ? '隐藏' : '查看'}
        </Button>
        <div className="avatar">
          <Avatar src={issue.user.avatar_url} shape="square" size={50} />
        </div>
        <div className="main-info">
          <h6>
            <span>{issue.title}</span>
          </h6>
          <p className="sub-info">
            <span>更新于 {getLastUpdated(issue.updated_at)}</span>
          </p>
        </div>
        <style jsx>{`
          .issue {
            display: flex;
            position: relative;
            padding: 10px;
          }
          .issue:hover {
            background: #fafafa;
          }
          .issue + .issue {
            border-top: 1px solid #eee;
          }
          .main-info > h6 {
            max-width: 600px;
            font-size: 16px;
            padding-right: 40px;
          }
          .avatar {
            margin-right: 20px;
          }
          .sub-info {
            margin-bottom: 0;
          }
          .sub-info > span + span {
            display: inline-block;
            margin-left: 20px;
            font-size: 12px;
          }
        `}</style>
      </div>
      {showDetail && <IssueDetail issue={issue} />}
    </div>
  )
})

const Issues = ({ issues }) => {
  console.log(issues)
  return (
    <div className="root">
      <div className="issues">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  )
}

Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query

  const issuesResp = await api.request(
    {
      url: `/repos/${owner}/${name}/issues`,
    },
    ctx.req,
    ctx.res
  )

  return {
    issues: issuesResp.data,
  }
}

export default WithRepoBasic(Issues, 'issues')
