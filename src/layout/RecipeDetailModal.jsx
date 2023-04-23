import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styled from 'styled-components';

const ScrollDiv = styled.div`
overflow-y:auto;
&::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const RecipeDetailModal = props => {
  const [loading, setLoading] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState([]);

  const sendKakao = () => {
    window.Kakao.Share.createCustomButton({
      container: '#kakaotalk-sharing-btn',
      templateId: 92637,
      templateArgs: {
        title: '제목 영역입니다.',
        description: '설명 영역입니다.',
      },
    })
  };

  useEffect(() => {
    search2();
  }, []);


  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_JS_KEY);
    };
  }, []);


  const api_key = process.env.REACT_APP_GPT_KEY;
  const config = {
    headers: {
      Authorization: `Bearer ${api_key}`,
      'Content-Type': 'application/json',
    },
  }

  const search2 = async () => {
    setLoading(true);
    const recipe = props.recipe;
    const ingredient = props.ingredient;
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: '자 이제' + recipe + ' 레시피를 알려줘. 가지고 있는 재료는' + ingredient + '인데, 모든 재료를 사용하지 않아도 돼. 출력 형식은 "재료:~, 레시피: 1. 2. 3. " 이렇게 해 줘. 대답할 때 첫 시작은 무조건 "재료:~"로 해주고, 다른 문장은 절대로 출력하지마' },
    ]
    const data = {
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      n: 1,
      messages: messages,
    }

    try {
      const response = (await axios.post('https://api.openai.com/v1/chat/completions', data, config)).data.choices[0].message.content.split('\n');
      setRecipeDetail(response)

    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }


  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }
      }}
      className=' font-noto outline-none shadow-lg absolute z-50 p-10 text-center -translate-x-1/2 -translate-y-1/2 bg-white w-[550px] h-[700px] rounded-2xl top-1/2 left-1/2 '
      isOpen={true} ariaHideApp={false}>

      {loading ?
        <div className='w-full h-full text-center ' >
          <div className='flex justify-end'>
            <img className='w-5 h-5 hover:cursor-pointer  '
              src='./images/close.png' alt='닫기' onClick={() => props.setModalIsOpen(false)}></img>
          </div>
          <h1 className='text-2xl font-notoBold mt-28 mb-3'>ChatGPT가 열심히 <br></br>레시피를 생성중입니다</h1>
          <h1 className='text-md text-slate-400 font-noto mb-10'>시간이 걸릴 수 있으니 조금만 기다려 주세요</h1>
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
          <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_MSBoM4TP3p.json"
            className='m-auto block'
            background="transparent" speed="1" style={{ height: 300 }} loop autoplay></lottie-player>
        </div>
        :
        <div className='w-full h-full text-center '>
          <div className='flex justify-between pb-3  items-center'>
            <p className='font-notoBold text-xl text-left '>{props.recipe}</p>
            <img className='w-5 h-5 hover:cursor-pointer '
              src='./images/close.png' alt='닫기' onClick={() => props.setModalIsOpen(false)}></img>
          </div>
          <ScrollDiv className='h-3/4 '>
            <img className='w-full h-60 bg-slate-200 object-cover' alt='음식 사진' src={props.image}></img>
            <div className='pt-5 pb-5 '>
              {recipeDetail.map((str,index) => (<p className='text-left' key={index}>{str}<br></br></p>))}
            </div>
          </ScrollDiv>
          <div className='w-full h-1/6 text-center pt-5 font-notoBold border-t-8 border-ourgraylight'>
            <img id='kakaotalk-sharing-btn' onClick={sendKakao} alt='카카오톡 공유하기'
              className='rounded-full h-2/3 m-auto '
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
            공유하기
          </div>
        </div>
      }
    </Modal>
  )
}

export default RecipeDetailModal
