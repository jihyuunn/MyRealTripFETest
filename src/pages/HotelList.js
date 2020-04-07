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
const LoadingSpinner = styled.div`
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: gray;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
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
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingFail, setIsLoadingFail] = useState(false)
    const getHotelList = async() => {
        setIsLoading(true)
        setIsLoadingFail(false)
        try {
            const response = await Axios.get(
                `${process.env.REACT_APP_BASE_API}/hotels?page=${page}`
            )
            console.log(response)
            setHotels(response.data)
        } catch (e) {
            console.log(e)
            setIsLoadingFail(true)
        }
        setIsLoading(false)
    }
    const [hotelPrices, setHotelPrices] = useState([])
    const getHotelPrice = async() => {
        for (let i=0; i<20; i++) {
            try {
                const response = await Axios.get(
                    `${process.env.REACT_APP_BASE_API}/hotel-prices?ids=${i}`
                )
                console.log(response.data[i])
                setHotelPrices(oldArray => [...oldArray, response.data])
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        const getItems = async() => {
            await getHotelList();
            await getHotelPrice();
        }
        getItems();
    }, [])
    const List = () => {
        return (isLoading ? <LoadingSpinner>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            </LoadingSpinner>:
            hotels.map((hotel,index) => (
                <HotelListItem hotel={hotel} key={index} prices={hotelPrices}/>
            ))
        )
    }
    return (
        <ListContainer>
            <div className="range">
                <InputRage maxValue={1000000} minValue={0} value={range} onChange={rangeHandler} />
            </div>
            <div className="list">
                {isLoadingFail ? <div>다시 시도해주세요<button onClick={getHotelList}>retry</button></div>:List()}
            </div>
        </ListContainer>
    )
}

export default HotelList