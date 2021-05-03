import { withRouter } from "next/router";
import Comp from '../../components/comp'

const Query = ({router})=>{
    
    return (
      <Comp>
        <p>name:{router.query.name}</p>
        <p>id:{router.query.id}</p>
      </Comp>
    )
}

export default withRouter(Query);