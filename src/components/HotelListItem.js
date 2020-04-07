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

const HotelListItem = ({hotel, onClick, tag}) => {
    return (
        <ItemContainer onClick={onClick} data-tag={tag}>
            <img src={hotel.imageUrl} alt='hotel'/>
            <div>
                <div>{hotel.freeServices}</div>
                <h2>{hotel.name}</h2>
                <p>{hotel.price ? hotel.price : 'loading'}</p>
                <div>
                    <p><span role="img">⭐️</span> {hotel.rate}</p>
                    <p>리뷰점수 {hotel.rate}</p>
                </div>
            </div>
        </ItemContainer>
    )
}

export default React.memo(HotelListItem)
