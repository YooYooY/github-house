import WithRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'

const Detail = ({readme}) => {
    const content = atob(readme.content);
    console.log(content)
  return <span>Detail Index</span>
}

Detail.getInitialProps = async ({ ctx }) => {
  const {
    query: { owner, name },
    req,
    res,
  } = ctx

  const url = `/repos/${owner}/${name}/readme`
  const readmeReps = await api.request({ url }, req, res)

  return {
    readme: readmeReps.data,
  }
}

export default WithRepoBasic(Detail, 'index')
