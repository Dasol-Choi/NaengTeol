import React, { useEffect } from 'react';
import RecipeDetailModalMobile from './RecipeDetailModalMobile';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const RecipePageMobile = () => {
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [isIngredient, setIsIngredient] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clickedRecipe, setClickedRecipe] = useState('');
  const { state } = useLocation();
  let recipes = [];
  let image;

  const navigate = useNavigate();
  const toBack = () => {
    navigate(-1);
  }
  const toHome = () => {
    navigate('/')
  }

  useEffect(() => {
    search1();
  }, []);


  const api_key = process.env.REACT_APP_GPT_KEY;

  const config = {
    headers: {
      Authorization: `Bearer ${api_key}`,
      'Content-Type': 'application/json',
    },
  }

  const search1 = async () => {
    setLoading(true);
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: '재료:' + state + 'if 재료가 모두 음식이라면 재료를 포함해서 만들 수 있는 요리 이름을 한단어로 말해주고, 필요한 재료들을 알려줘. 이 때 만드는 방법은 말하지 마. 출력형식은 " 숫자. : "이고, 개수는 4개 이하로 생성해줘. 생성 후에는 다른 문장은 출력하지마. else 재료가 음식이 아니라면 오류를 출력해줘. 오류 출력형식은 "정확한 재료를 입력해 주세요" 딱 이 한 문장이고, 다른 문장은 절대 출력하지마. (if, else 문에서 지시한 문장이 아니라면 어떠한 문장도 출력하지 마)' },
    ]
    const data = {
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      n: 1,
      messages: messages,
    }
    try {
      const response = (await axios.post('https://api.openai.com/v1/chat/completions', data, config)).data.choices[0].message.content.split('\n');
      if (response[0] === '정확한 재료를 입력해 주세요.') {
        setIsIngredient(false);
      } else {
        setIsIngredient(true);
      }
      const regex = /^[0-9]+\. (.+):/g;
      response.forEach(res => {
        if (res.match(regex)) {
          const name = res.match(regex)[0].split('. ')[1].split(':')[0];
          if(name !== '오류'){
            const ing = res.split(':')[1];
            saveImageAndRecipe(name, ing);
          }
        }
      })

      setTimeout(() => {
        setRecipeList(recipes.map((recipe, index) => (
          <div className='flex w-full h-60 items-center mb-10 font-noto ' id={index} aria-valuetext={recipe} key={index}
            onClick={(event) => { showModal(); setClickedRecipe(recipe); }}>
            <img className='w-1/3 h-60 bg-slate-100 mr-5 object-cover' alt='음식 사진' referrerPolicy="no-referrer" src={recipe.image}></img>
            <div className='w-2/3 h-full p-5 text-start hover:pointer '>
              <h1 className='text-4xl font-notoBold hover:cursor-pointer '>{recipe.name}</h1>
              <h1 className='text-3xl mt-5 font-noto hover:cursor-pointer '>{recipe.ing}</h1>
            </div>
          </div>
        )));
      }, 1000)

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const saveImage = (image_url) => {
    image = image_url
  }

  const saveImageAndRecipe = async (name, ing) => {
    await kakaoSearch(name);
    await saveNewRecipe(name, ing);
  }

  const kakaoSearch = async (name) => {
    const response = (await axios.get('https://dapi.kakao.com/v2/search/image', {
      headers: {
        "Authorization": "KakaoAK "+ process.env.REACT_APP_KAKAO_IMAGE_KEY
      },
      params: {
        "query": name,
        "page": 1,
        "size": 1
      }
    })).data.documents[0].image_url;
    saveImage(response);
  }

  const saveNewRecipe = (name, ing) => {
    const newRecipe = {
      name: name,
      ing: ing,
      image: image
    }
    recipes.push(newRecipe);
  }


  const showModal = () => {
    setModalIsOpen(true);
  }

  const ingredientList = state.map((sta, index) => (
    <div key={index} className='font-noto w-fit bg-ourgraylight mr-5 flex justify-center p-5 text-3xl rounded-lg mb-2'>
      <p className='text-md'>{sta}</p>
    </div>
  ));



  return (
    <div className='text-center p-10 pt-32 pb-32 w-full h-screen font-noto bg-white'>
      <div className='flex justify-between mt-10 mb-20'>
        <img src='./images/morethan.png' alt='뒤로 가기' className='w-7 hover:cursor-pointer' onClick={toBack}></img>
        <img src='./images/home.png' alt='처음페이지로 가기' className='w-14 h-14 hover:cursor-pointer' onClick={toHome}></img>

      </div>

      <div className='w-full h-full mt-10 '>
        {loading ?
          <div className='w-full h-full  text-center ' >
            <h1 className='text-6xl font-notoBold mt-80'>입력하신 재료들로 만들 수 있는<br></br>요리를 알아보고 있어요</h1>
            <h1 className='text-4xl mt-12 text-slate-400'> 잠시만 기다려 주세요~</h1>
            <img src='./images/loading.gif' alt='로딩 중' className='w-36 mt-60 m-auto'></img>
            <img src='./images/image1.png' alt='음식' className='w-4/5 m-auto block'></img>
          </div> :
          <div className='w-full h-full ' >
            {isIngredient ?
              <div>
                <h1 className='text-6xl font-notoBold text-left w-fit mb-10'>현재 재료로 만들 수 있는<br></br>레시피들이에요~</h1>
                <h1 className='text-3xl font-noto text-left mb-24 text-slate-400 '>하나씩 클릭해보세요!</h1>
                <div className='w-full h-fit flex flex-wrap mb-20'>{ingredientList}</div>
                <div className='w-full h-full overflow-x-hidden overflow-y-auto '>
                  {recipeList}
                </div>
                <button className='mt-20 mb-10 bg-gradient-to-r from-ourgreen to-ourgreenlight w-full p-8 text-4xl font-notoBold text-white rounded-xl outline-none' onClick={toBack}>다시 재료 입력하기</button>

              </div>
              :
              <div>
                <h1 className='text-6xl font-notoBold mt-80'>검색 결과가<br></br>존재하지 않습니다</h1>
                <h1 className='text-4xl mt-12 text-slate-400'>재료명을 정확히 입력했는지 확인해 주세요</h1>
                <img src='./images/image2.png' alt='음식 없음' className='w-4/5 mt-60 m-auto block'></img>

                <button className='bg-gradient-to-r from-ourgreen to-ourgreenlight w-full p-8 text-white outline-none font-notoBold text-4xl rounded-xl mt-20'
                  onClick={toBack}> 다시 재료 입력하기</button>
              </div>}
          </div>
        }
      </div>

      {modalIsOpen && <RecipeDetailModalMobile setModalIsOpen={setModalIsOpen} recipe={clickedRecipe.name} image={clickedRecipe.image} ingredien={state}></RecipeDetailModalMobile>}
    </div>
  )
}

export default RecipePageMobile
