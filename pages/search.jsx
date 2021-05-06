import { withRouter } from 'next/router'
import { Row, Col, List } from 'antd'
const api = require('../lib/api')

/**
 * sort: 排序方式
 * order: 排序顺序
 * lang: 仓库的项目开发主语言
 * page: 分页页面
 */
const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust']
const SORT_TYPES = [
  { name: 'Best Match' },
  { name: 'Most Stars', value: 'stars', order: 'desc' },
  { name: 'Fewest Stars', value: 'stars', order: 'asc' },
  { name: 'Most Forks', value: 'forks', order: 'desc' },
  { name: 'Fewest Forks', value: 'forks', order: 'asc' },
]

const selectedItemStyle = {
  borderLeft: '2px solid #e36209',
  fontWeight: 100,
}

const Search = ({ repos, router }) => {
  const { sort, order, lang, query } = router.query

  const handleLanguageChange = (language) => {
    router.push({
      pathname: '/search',
      query: {
        query,
        sort,
        order,
        lang: language,
      },
    })
  }
  const handleSortChange = (sort) => {
    router.push({
      pathname: '/search',
      query: {
        query,
        lang,
        sort: sort.value,
        order: sort.order,
      },
    })
  }

  return (
    <div className="root">
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            style={{ marginBottom: 20 }}
            dataSource={LANGUAGES}
            header={<span className="list-header">语言</span>}
            renderItem={(item) => {
              const selected = lang === item
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  <a onClick={() => handleLanguageChange(item)}>{item}</a>
                </List.Item>
              )
            }}
          />
          <List
            bordered
            style={{ marginBottom: 20 }}
            dataSource={SORT_TYPES}
            header={<span className="list-header">排序</span>}
            renderItem={(item) => {
              let selected = false
              if (item.name === SORT_TYPES[0].name && !sort) {
                selected = true
              } else if (item.value === sort && item.order === order) {
                selected = true
              }

              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  <a onClick={() => handleSortChange(item)}>{item.name}</a>
                </List.Item>
              )
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

Search.getInitialProps = async ({ ctx }) => {
  const { query, sort, lang, order, page } = ctx.query

  if (!query) {
    return {
      repos: {
        total_count: 0,
      },
    }
  }

  let queryString = `?q=${query}`
  if (lang) queryString += `+language:${lang}`
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page=${page}`

  const result = await api.request(
    {
      url: `/search/repositories${queryString}`,
    },
    ctx.req,
    ctx.res
  )

  return {
    repos: result.data,
  }
}

export default withRouter(Search)
