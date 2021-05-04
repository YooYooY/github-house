# Nest.js 实现服务端渲染

# React.cloneElement 扩展可复用组件

> react 元素本身是不可变的 (immutable) 对象，props.children 事实上并不是 children 本身，它只是 children 的描述符 (descriptor) ，我们不能修改任何它的任何属性，只能读到其中的内容，因此 React.cloneElement 允许我们拷贝它的元素，并且修改或者添加新的 props 从而达到我们的目的。

## cloneElement 作用

使用方式：

```js
React.cloneElement(element, [props], [...children])
```

- 通过 `React.cloneElement` 可以克隆并返回新的 React 元素。
- 保留原始元素的 props，同时可以添加新的 props，两者进行浅合并。
- key 和 ref 会被保留，因为它们本身也是 props ，所以也可以修改。
- 根据 react 的源码，可以从第三个参数开始定义任意多的子元素，如果定义了新的 children ，会替换原来的 children

## 在项目中使用

### 场景

在页面布局中，通常会给页面内容设置最大宽度并居中显示，样式如下：

```js
const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
}
```

利用高阶组件将需要居中的内容作为子元素渲染：

```jsx
const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
}

const HocContainer = ({ children, ...restProps }) => {
  return (
    <div style={style} {...restProps}>
      {children}
    </div>
  )
}

export default HocContainer
```

需要居中的内容包裹在高阶组件：

```jsx
import HocContainer from '.'

const Page = () => {
  return <HocContainer>content</HocContainer>
}
```

### 不同标签渲染

上面的方式虽然能够完成需求，但是标签被固定成了`div`，如果有新需求需要替换标签便无法完成。

替换标签渲染方式：

```jsx
const Page = () => {
  return <HocContaine comp="main">content</HocContainer>
}
```

修改 `HocContainer` 如下：

```jsx
const HocContainer = ({ children, comp: Comp, ...restProps }) => {
  return (
    <Comp style={style} {...restProps}>
      {children}
    </Comp>
  )
}
```

通过给`HocContainer`指定`comp`属性负责渲染对应的标签，完成修改标签的渲染需求。

### props 属性传递

如下，通过 `comp` 渲染的标签无法将标签属性传递给子组件，color 属性无法在子组件中获取。

```jsx
const Comp = ({ color, children }) => <main style={{ color }}>{children}</main>

const Page = () => {
  return <HocContaine comp={<Comp color="red" />}>content</HocContainer>
}
```

通过 `cloneElement` 给子元素添加属性：

```jsx
import { cloneElement } from 'react'

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 20,
  paddingRight: 20,
}

const DefaultComp = <div />
const HocContainer = ({ children, renderer = DefaultComp }) => {
  return cloneElement(renderer, {
    style,
    children,
  })
}

export default HocContainer
```

修改渲染属性为 `renderer`：

```jsx
const Comp = ({ color, children }) => <main style={{ color }}>{children}</main>

const Page = () => {
  return <HocContaine renderer={<Comp color="red" />}>content</HocContainer>
}
```

最后，还要考虑如果渲染标签也添加了`style`属性，需要进行合并：

```jsx
const HocContainer = ({ children, renderer = DefaultComp }) => {

  return cloneElement(renderer, {
    style: Object.assign({},style, renderer.props.style),
    children,
  })
}
```

## 总结

通过 `React.cloneElement` 的使用，减少不必要的节点渲染，同时将不同组件的 `props` 进行组合，在适当的场景下使用能有效优化代码结构。

推荐参考：

[React.cloneElement 的使用](https://fullstackbb.com/react/when-to-use-react-cloneelement/)