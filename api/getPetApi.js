import axios from 'axios'

const pets = axios.create({
  baseURL: 'http://localhost:3000/'
})
const homePage = 'apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=18&$skip=0'
export const homePageData = () => pets.get(`${homePage}`)
