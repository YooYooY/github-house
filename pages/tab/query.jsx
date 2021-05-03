import { withRouter } from 'next/router'
import Comp from '../../components/comp'

const textColor = "#999"

const Query = ({ router }) => {
  return (
    <Comp>
      <p className="red">name:{router.query.name}</p>
      <p className="yellow">id:{router.query.id}</p>
      <p className="txt">txt</p>
      <style jsx>{`
        .red {
          color: red;
        }
      `}</style>
      <style jsx global>
        {`
          .yellow {
            color: yellow;
          }
          .txt {
            color: ${textColor};
          }
        `}
      </style>
    </Comp>
  )
}

Query.getInitialProps = async (ctx) => {
  return {}
}

export default withRouter(Query)
