import { withRouter } from 'next/router'

const Search = ({router}) => {
    console.log(router)
  return <div>{(router.query.query)}</div>
}

export default withRouter(Search)
