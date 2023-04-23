import React from 'react'
import { useNavigate } from 'react-router-dom'


const MainPageMobile = () => {
  const navigate = useNavigate();
  const toIngredient = (e) => {
    navigate("/ingredient")
  }

  return (
    <div className=' p-5 h-screen w-full bg-white'>
      <div className='ml-20 w-fit h-fit text-9xl text-left font-notoBold mt-80 mb-10'>냉털<br></br>레시피</div>
      <div className='w-fit font-notoLight text-4xl text-left ml-20 mb-52'>ChatGPT가 냉장고 털이를 도와드립니다!<br></br>
        냉장고 속 재료를 입력하고 레시피를 받아보세요~</div>
      <div className='text-center'>
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_fefIZO.json" background="transparent"
          className='m-auto block' speed="1" style={{ height: 400 }} loop autoplay></lottie-player>
      </div>
      <div className='w-full text-center flex justify-center'>
        <button className='flex justify-around w-2/3 mt-44 mb-20 h-fit pt-14 pb-14 bg-gradient-to-r from-ourgreen to-ourgreenlight  font-noto text-white text-5xl  font-bold shadow-sm rounded-es-lg rounded-se-lg rounded-ss-3xl rounded-ee-3xl'
          onClick={toIngredient}>
          <p >재료&ensp;입력<br></br>바로&ensp;가기</p>
          <img src='./images/lessthan.png ' alt='재료 입력하기' className='float-right w-5 h-7 block mt-1'></img>
        </button>
      </div>

    </div>
  )
}

export default MainPageMobile
