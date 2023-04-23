import React from 'react'
import { useNavigate } from 'react-router-dom'


const MainPage = () => {
  const navigate = useNavigate();
  const toIngredient = (e) => {
    navigate("/ingredient")
  }

  return (
    <div className='p-10  h-screen w-[700px] bg-white'>
      <div className='ml-10 mt-5 mb-5  w-full h-fit text-7xl text-left font-notoBold'>냉털<br></br>레시피</div>
      <div className='w-full font-notoLight text-lg text-left ml-10 '>ChatGPT가 냉장고 털이를 도와드립니다!<br></br>
        냉장고 속 재료를 입력하고 레시피를 받아보세요~</div>
      <div className='text-center'>
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_fefIZO.json" background="transparent"
          className='m-auto block' speed="1" style={{ height: 250 }} loop autoplay></lottie-player>
      </div>
      <div className='w-full text-center flex justify-center'>
        <button className='flex justify-around w-2/3 mt-16  h-fit pt-5 pb-5 bg-gradient-to-r from-ourgreen to-ourgreenlight  font-noto text-white text-xl  font-bold shadow-sm rounded-es-lg rounded-se-lg rounded-ss-3xl rounded-ee-3xl'
          onClick={toIngredient}>
          <p >재료&ensp;입력<br></br>바로&ensp;가기</p>
          <img src='./images/lessthan.png ' alt='재료 입력하기' className='float-right w-3 h-5 block mt-1'></img>
        </button>
      </div>

    </div>
  )
}

export default MainPage
