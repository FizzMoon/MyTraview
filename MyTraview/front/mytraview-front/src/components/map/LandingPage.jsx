import React, { useState } from 'react'
import MapContainer from './MapContainer'


function LandingPage(props) {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('플레이데이터')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }
  

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input type="text" placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit">검색</button>
      </form>
      <MapContainer 
      searchPlace={Place} propAddress={props.propAddress} propCategory={props.propCategory} propRate={props.propRate}
      propLat={props.propLat} propLng={props.propLng} propPlaceName={props.propPlaceName}
      />
    </>
  )
}

export default LandingPage