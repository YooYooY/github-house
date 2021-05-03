export default Comp => {
    function TestHocComp({ Component, pageProps, ...restProps }) {
      if (pageProps) {
        pageProps.test = '124'
      }
      return <Comp Component={Component} pageProps={pageProps} {...restProps} />
    }
    
    TestHocComp.getInitialProps = Comp.getInitialProps;
    
    return TestHocComp
}