import WithRepoBasic from '../../components/with-repo-basic'

const Detail = ({text})=>{
    return <span>Detail Index {text}</span>
}

Detail.getInitialProps = async ()=>{
    return {
        text:"test"
    }
}

export default WithRepoBasic(Detail, "index")