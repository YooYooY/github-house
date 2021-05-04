import React, { memo, useState, useCallback } from 'react'
import { Input, Button, List } from 'antd'
import { connect } from 'react-redux'
import { addList, removeList, toggleList } from '../store/actions'

const ListItem = memo(({ id, value, done, removeList, toggleList }) => {
  const handleDelete = () => removeList(id)

  const handleToggle = () => toggleList(id)
  const status = done ? 'redo' : 'done'

  return (
    <List.Item
      className={'item-' + status}
      actions={[
        <a key="list-delete" onClick={handleDelete}>
          delete
        </a>,
        <a key="list-toggle" onClick={handleToggle}>
          {status}
        </a>,
      ]}
    >
      {value}
    </List.Item>
  )
})

const Todo = (props) => {
  const [value, setValue] = useState('')

  const handleChange = useCallback((e) => {
    setValue(e.target.value.trim())
  }, [])

  const handleAdd = useCallback(() => {
    value && props.addList(value)
  }, [value])

  return (
    <div>
      <Input
        addonAfter={<span onClick={handleAdd}>add</span>}
        value={value}
        onChange={handleChange}
      />
      <List
        dataSource={props.list}
        renderItem={(item) => (
          <ListItem
            {...item}
            removeList={props.removeList}
            toggleList={props.toggleList}
          />
        )}
      ></List>
      <style jsx global>{`
        .item-redo {
          text-decoration: line-through;
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}

export default connect((state) => state.todo, {
  addList,
  removeList,
  toggleList,
})(Todo)
