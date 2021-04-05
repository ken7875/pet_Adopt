export default function ({ $axios, redirect }) {
  // Authorization
  $axios.setHeader('Content-Type', 'application/json')
  $axios.onError((error) => {
    if (error.response.status === 404 || error.response.status === 500) {
      redirect('/404')
    }
  })
}
