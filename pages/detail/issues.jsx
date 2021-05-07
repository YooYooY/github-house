import WithRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'
import { memo } from 'react'
import { Avatar, Button, Spin, Select } from 'antd'
import { useState, useCallback } from 'react'
import { getLastUpdated } from '../../lib/utils'
import dynamic from 'next/dynamic'
import SearchUser from '../../components/SearchUser'

const MarkdownRender = dynamic(
  () => import('../../components/MarkdownRender'),
  {
    loading: () => <Spin />,
  }
)

const makeQuery = (creator, state, label) => {
  let creatorStr = creator ? `creator=${creator}` : ''
  let stateStr = state ? `state=${state}` : ''
  let labelStr = ''
  if (label && label.length) {
    labelStr = `label=${label.join(',')}`
  }
  const arr = []
  if (creatorStr) arr.push(creatorStr)
  if (stateStr) arr.push(stateStr)
  if (labelStr) arr.push(labelStr)

  return `?${arr.join('&')}`
}

const { Option } = Select

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

const Issues = ({ initialIssues, labels, fullName }) => {
  const [creator, setCreator] = useState()
  const [state, setState] = useState()
  const [label, setLabel] = useState([])
  const [issues, setIssues] = useState(initialIssues)
  const [fetching, setFetching] = useState(false)

  const handleCreatorChange = useCallback((value) => {
    setCreator(value)
  }, [])
  const handleStateChange = useCallback((value) => {
    setState(value)
  }, [])
  const handleLabelChange = useCallback((value) => {
    setLabel(value)
  }, [])
  const handleSearch = useCallback(() => {
    setFetching(true)
    const url = `/repos/${fullName}/issues${makeQuery(creator, state, label)}`
    api
      .request({ url })
      .then((reps) => {
        setIssues(reps.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setFetching(false)
      })
  }, [creator, state, label, fullName])

  return (
    <div className="root">
      <div className="repo-search">
        <SearchUser onChange={handleCreatorChange} value={creator} />
        <Select placeholder="状态" value={state} onChange={handleStateChange}>
          <Option value="all">all</Option>
          <Option value="open">open</Option>
          <Option value="closed">closed</Option>
        </Select>
        <Select
          mode="multiple"
          placeholder="label"
          value={label}
          className="repo-search-label"
          onChange={handleLabelChange}
        >
          {labels.map((la) => (
            <Option key={la.id} value={la.name}>
              {la.name}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleSearch} disabled={fetching}>
          搜索
        </Button>
      </div>
      <div className="issues">
        {fetching ? (
          <div className="loading">
            <Spin />
          </div>
        ) : (
          issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)
        )}
      </div>
      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .repo-search {
          display: flex;
        }
        .loading {
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <style global jsx>{`
        .repo-search > .ant-select {
          margin-right: 20px;
          width: 200px;
        }
        .repo-search-label {
          flex: 1;
        }
      `}</style>
    </div>
  )
}

const getReposData = (type, fullName, ctx) => {
  const url = `/repos/${fullName}/${type}`
  return api.request({ url }, ctx.req, ctx.res)
}

Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query
  const fullName = `${owner}/${name}`

  const [issuesResp, labelsResp] = await Promise.all([
    getReposData('issues', fullName, ctx),
    getReposData('labels', fullName, ctx),
  ])

  return {
    initialIssues: issuesResp.data,
    labels: labelsResp.data,
    fullName,
  }
}

export default WithRepoBasic(Issues, 'issues')
