import WithRepoBasic from '../../components/with-repo-basic'

const Issues = ({ text }) => {
  return <span>Issues Index {text}</span>
}

Issues.getInitialProps = async () => {
  return {
    text: 'issues',
  }
}   

export default WithRepoBasic(Issues, "issues")
