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
      button {
          margin:2.5rem;
      }
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
    const [hotelsInRange, setHotelsInRange] = useState([])
    const [hotelListDone, setHotelListDone] = useState(false)
    const getHotelList = async() => {
        setIsLoading(true)
        setIsLoadingFail(false)
        try {
            const response = await Axios.get(
                `${process.env.REACT_APP_BASE_API}/hotels?page=${page}`
            )
            console.log(response)
            setHotelsInRange(response.data)
            await setHotels(response.data)
            await setHotelListDone(true)
        } catch (e) {
            console.log(e)
            setIsLoadingFail(true)
        }
        setIsLoading(false)
    }
    const getHotelPrice = async() => {
        let temp = hotels;
        for (let i=0; i<20; i++) {
            try {
                const response = await Axios.get(
                    `${process.env.REACT_APP_BASE_API}/hotel-prices?ids=${i}`
                )
                // console.log(temp)
                if (temp[i].id === i && !temp[i].price) {
                    // setHotels(oldArray => [...oldArray, oldArray[i].price=response.data[i]])
                    temp[i].price = response.data[i]
                }
            } catch (error) {
                console.log(error)
            }
        }
        setHotelsInRange(temp)
        setHotels(temp)
    }

    useEffect(() => {
        const getItems = async() => {
            getHotelList();
        }
        getItems();
    }, [])
    useEffect(() => {
            getHotelPrice();
    }, [hotelListDone])

    const List = () => {
        return (isLoading ? <LoadingSpinner>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            </LoadingSpinner>:
            hotelsInRange.map((hotel,index) => (
                <HotelListItem hotel={hotel} key={index} tag={index} onClick={e => currentClick(e, hotel)}/>
            ))
        )
    }

    const searchHandler = () => {
        let temp = []
        hotels.forEach((hotel, index) => {
            if (hotel.price >= range.min && hotel.price <= range.max) {
                temp.push(hotel)
            }
        })
        setHotelsInRange(temp)
    }

    const [current, setCurrent] = useState([])
    const currentClick = (e, hotel) => {
        console.log(hotel)
        if (!current.includes(hotel.name)) {
            if (current.length === 5) {
                setCurrent(oldArray => [...oldArray.slice(1,6), hotel.name])
            } else {
                setCurrent(oldArray => [...oldArray, hotel.name])
            }
        }
    }
    return (
        <ListContainer>
            <div className="range">
                <InputRage maxValue={1000000} minValue={0} value={range} onChange={rangeHandler} />
                <button onClick={searchHandler}>검색하기</button>
                <div>{current.map((cur, index) => <li key={index}>{cur}</li>)}</div>
            </div>
            <div className="list">
                {isLoadingFail ? <div>다시 시도해주세요<button onClick={getHotelList}>retry</button></div>:List()}
            </div>
        </ListContainer>
    )
}

export default HotelList
