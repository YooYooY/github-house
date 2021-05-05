const Detail = () => {
  return <div>Detail</div>
}

Detail.getInitialProps = async () => {
  return new Promise((r) => setTimeout(r, 1000))
}

export default Detail
