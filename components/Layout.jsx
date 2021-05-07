import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import { useState, useCallback } from 'react'
import Container from './Container'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
const { Header, Content, Footer } = Layout

const githubIconStyle = {
  color: '#fff',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20,
}

const footerStyle = {
  textAlign: 'center',
}

const MyLayout = ({ children, user, logout, router }) => {
  const [search, setSearch] = useState(()=>{
    const {query}=router.query || ""
    return query
  })

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value.trim())
  }, [])

  const handlOnSearch = (value) => {
    router.push(`/search?query=${value}`)
  }

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript: void(0)" onClick={handleLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <Icon type="github" style={githubIconStyle} />
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handlOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by chenwl @
        <a href="mailto:13751840799@163.com">13751840799@163.com</a>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  )
}

export default connect((state) => state, actions)(withRouter(MyLayout))
