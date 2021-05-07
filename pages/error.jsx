const Errors = ()=>{
    return (
        <>
            <h3>出错了~</h3>
        </>
    )
}

Errors.getInitialProps = (ctx)=>{
    console.log(ctx)
    return {}
}

export default Errors