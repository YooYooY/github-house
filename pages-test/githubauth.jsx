import getConfig from 'next/config'
import axios from 'axios'
import { useEffect, useState } from 'react'

const { publicRuntimeConfig } = getConfig()

export default () => {
  const [state, setState] = useState([])

  useEffect(() => {
    axios.get('/api/user/info').then((res) => {
      let data = []
      for (let key in res.data) {
        data.push({
          key,
          value: JSON.stringify(res.data[key]),
        })
      }
      console.log(data)
      setState(data)
    })
  }, [])

  return (
    <span>
      <a href={publicRuntimeConfig.OAUTH_URL}>login</a>

      {state.length &&
        state.map(({ key, value }) => (
          <div key={key}>
            <h6>{key}</h6>
            <p>{value}</p>
          </div>
        ))}
    </span>
  )
}
