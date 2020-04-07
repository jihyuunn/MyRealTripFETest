### update useState
```javascript
const [theArray, setTheArray] = useState([])
const arrayHandler = () => {
    setTheArray(oldArray => [...oldArray, newItem])
};
```
- 이렇게 해야 이전에 state안에 있던 아이템들과 함께 업데이트가 된다   
- oldArray를 안보내면 한개씩만 들어간다   


### price 불러오기
- price를 불러서 useState의 각 object에 업데이트를 시킬 수 있다
- 그러나 컴포넌트 렌더링이 제대로 안됨

### range로 가격 검색
- hotelsInRange useState를 만들어서 가격 조건에 맞는 애들 갖다 넣으면 된다

### 최근 클릭한 항목
```javascript
const clicked = (e, hotel) => {
    console.log(hotel)
}
<HotelItem hotel={hotel} onClick={e => clicked(e, hotel)}>
```
- 이렇게 하면 컴포넌트에 넘어가는 호텔 정보를 잡을 수 있따