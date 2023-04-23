import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


const IngredientPage = () => {
    const [enteredValue, setEnteredValue] = useState('');
    const [ingredient, setIngredient] = useState([]);
    const [count, setCount] = useState(1);

    const navigate = useNavigate();
    const toBack = (e) => {
        navigate(-1)
    }
    const toHome = () => {
        navigate('/')
    }

    const toRecipe = (e) => {
        if (ingredient.length < 1) {
            alert('재료를 1개 이상 추가해주세요')
        }
        else {
            navigate('/recipe', { state: ingredient });
        }
    }

    const addHandler = (event) => {
        setCount(count + 1);
        if ((event.key === 'Enter') || (event.target.id === 'inputBtn')) {
            if (ingredient.includes(enteredValue)) {
                alert('이미 입력하신 재료입니다')
            }
            else if (enteredValue === '') {
                alert('재료를 입력해주세요')
            }
            else {
                setIngredient([...ingredient, enteredValue])
            }
            setEnteredValue('');
        }

    }

    const deleteHandler = (event) => {
        setIngredient(ingredient.filter((ing) => ing !== event.target.id));
    }

    const ingredientList = ingredient.map((ing, index) => (
        <div className='font-noto w-fit bg-ourgraylight m-1 flex justify-center p-3 rounded-lg mb-2 break-all' key={index}>
            <p className='text-lg'>{ing}</p>
            <p className='font-bold ml-2 text-lg hover:cursor-pointer' id={ing} onClick={deleteHandler}>x</p>
        </div>
    ));


    return (
        <div className='text-center p-5  h-screen w-[700px] bg-white'>
            <div className='flex justify-between mt-5 mb-5'>
                <img src='./images/morethan.png' alt='뒤로 가기' className='w-2 h-5 hover:cursor-pointer' onClick={toBack}></img>
                <img src='./images/home.png' alt='처음페이지로 가기' className='w-7 h-7 hover:cursor-pointer' onClick={toHome}></img>

            </div>
            <h1 className='text-3xl font-notoBold text-left w-full mb-20'>냉장고에 있는 재료를<br></br>모두 입력해주세요</h1>
            <div className='flex justify-center w-full h-10 mb-5 font-noto'>
                <input className='placeholder:text-slate-400 placeholder:font-noto border-b-2 outline-none w-11/12 text-lg' value={enteredValue}
                    placeholder='재료 입력'
                    onKeyDown={(event) => { addHandler(event) }} onChange={(event) => { setEnteredValue(event.target.value) }}></input>
                <button id='inputBtn' onClick={(event) => { addHandler(event) }} className='bg-ourgraylight w-1/12 rounded-xl outline-none'>추가</button>
            </div>
            <div className='w-full h-fit flex flex-wrap '>{ingredientList}</div>

            <button className='mt-20 bg-gradient-to-r from-ourgreen to-ourgreenlight w-full p-3 text-xl font-notoBold text-white rounded-md outline-none' onClick={toRecipe}>입력 완료</button>
        </div>
    )
}

export default IngredientPage
