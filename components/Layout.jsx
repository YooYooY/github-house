import { Layout, Icon, Input, Avatar } from 'antd'
import { useState, useCallback } from 'react'
import Container from './Container'
const { Header, Content, Footer } = Layout

const Comp = ({ color, children, style, ...rest }) => (
  <div style={{ color, ...style }} {...rest}>
    {children}
  </div>
)

export default ({ children }) => {
  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value.trim())
  }, [])

  const handlOnSearch = useCallback((value) => {
    console.log(value)
  }, [])

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
  
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle} />
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
              <Avatar size={40} icon="user" />
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>
          {children}
        </Container>
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
          height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  )
}
