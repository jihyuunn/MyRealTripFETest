import React from 'react'
import styled from 'styled-components'

const ItemContainer = styled.div`
    display: flex;
    padding: 1rem;
    img {
        width: 40%;
        height: 11rem;
        object-fit: cover;
    }
`

const HotelListItem = ({hotel, prices}) => {
    return (
        <ItemContainer>
            <img src={hotel.imageUrl} alt='hotel' onClick={() => console.log(prices)}/>
            <div>
                <div>{hotel.freeServices}</div>
                <h2>{hotel.name}</h2>
                <p>{prices[hotel.id] ? prices[hotel.id][hotel.id] : 'loading'}</p>
                <div>
                    <p><span role="img">⭐️</span> {hotel.rate}</p>
                    <p>리뷰점수 {hotel.rate}</p>
                </div>
            </div>
        </ItemContainer>
    )
}

export default HotelListItem
