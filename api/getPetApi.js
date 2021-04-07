import axios from 'axios'

const pets = axios.create({
  baseURL: 'https://nuxt-pet-adopt.herokuapp.com/'
})
const homePage = 'apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=20&$skip=0'
export const homePageData = () => pets.get(`${homePage}`)
