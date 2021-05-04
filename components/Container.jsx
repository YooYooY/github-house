import { cloneElement } from 'react'
const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 20,
  paddingRight: 20,
}

const HocContainer = ({ children, renderer = <div /> }) => {
  return cloneElement(renderer, {
    style: Object.assign({}, style, renderer.props.style),
    children,
  })
}

export default HocContainer
