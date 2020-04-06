import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import InputRage from 'react-input-range'
import Axios from 'axios'
import 'react-input-range/lib/css/index.css'
import HotelListItem from '../components/HotelListItem'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
      flex-direction: row;
  }
  .range {
      width: 100%;
      @media (min-width: 768px) {
        width: 20%;
      }
      padding: 10%;
  }
  .list {
    width: 100%;
    @media (min-width: 768px) {
        width: 70%;
    }
  }
`

const HotelList = () => {
    const [range, setRange] = useState({
        min: 0,
        max: 1000000
    })
    const rangeHandler = useCallback(
        (value) => {
            console.log(value)
            setRange(value)
        },
        [range]
    )

    const [hotels, setHotels] = useState([])
    const [page, setPage] = useState(1)
    const getHotelList = async() => {
        try {
            const response = await Axios.get(
                `${process.env.REACT_APP_BASE_API}/hotels?page=${page}`
            )
            console.log(response)
            setHotels(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getHotelList();
    }, [])
    const List = () => {
        return (
            hotels.map((hotel,index) => (
                <HotelListItem hotel={hotel} key={index}/>
            ))
        )
    }
    return (
        <ListContainer>
            <div className="range">
                <InputRage maxValue={1000000} minValue={0} value={range} onChange={rangeHandler} />
            </div>
            <div className="list">
                {List()}
            </div>
        </ListContainer>
    )
}

export default HotelList
