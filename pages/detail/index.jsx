import dynamic from 'next/dynamic'
import WithRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'

const MarkdownRender = dynamic(() => import('../../components/MarkdownRender'),{
  loading:()=><p>loading...</p>
})

const Detail = ({ readme }) => {
  return <MarkdownRender content={readme.content} isBase64 />
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
