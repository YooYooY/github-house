import { Select, Spin } from 'antd'
import { useState, useCallback, useRef } from 'react'
import debounce from 'lodash/debounce'
import api from '../lib/api'

const Option = Select.Option

function SearchUser({ onChange, value }) {
  const lastFetchIdRef = useRef(0)
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const fetchUser = useCallback(
    debounce((value) => {
      const fetchId = ++lastFetchIdRef.current
      setFetching(true)
      setOptions([])

      api
        .request({
          url: `/search/users?q=${value}`,
        })
        .then((resp) => {
          if (fetchId !== lastFetchIdRef.current) return

          const data = resp.data.items.map((user) => ({
            text: user.login,
            value: user.login,
          }))
          setOptions(data)
        })
        .catch((error) => {
          console.log('error', error)
        })
        .finally(() => {
          setFetching(false)
        })
    }, 500),
    []
  )

  const handleChange = useCallback(
    (value) => {
      setOptions([])
      setFetching(false)
      onChange && onChange(value)
    },
    [onChange]
  )

  return (
    <Select
      value={value}
      showSearch={true}
      filterOption={false}
      placeholder="创建者"
      allowClear={true}
      onSearch={fetchUser}
      onChange={handleChange}
      notFoundContent={fetching ? <Spin size="small" /> : <span>nothing</span>}
    >
      {options.map((op) => {
        return (
          <Option value={op.value} key={op.value}>
            {op.text}
          </Option>
        )
      })}
    </Select>
  )
}

export default SearchUser
