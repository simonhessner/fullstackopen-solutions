import { useEffect, useState } from "react"
import axios from 'axios'

export const useCountry = (country) => {
  const [data, setData] = useState({ found: false })

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`).then(result => {
      setData({ data: result.data, found: true })
    }).catch(() => {
      setData({ found: false })
    })
  }, [country])

  return data
}