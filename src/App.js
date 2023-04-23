import './App.css';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './layout/MainPage';
import IngredientPage from './layout/IngredientPage';
import RecipePage from './layout/RecipePage';
import MainPageMobile from './layout/mobile/MainPageMobile';
import IngredientPageMobile from './layout/mobile/IngredientPageMobile';
import RecipePageMobile from './layout/mobile/RecipePageMobile';

function App() {
  const isMobile = useMediaQuery(
    { maxDeviceWidth: 600 },
 
  )

  return (
    <div className='App flex justify-center  '>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isMobile?<MainPageMobile/> :<MainPage/>}></Route>
          <Route path='/ingredient' element={isMobile?<IngredientPageMobile/>:<IngredientPage/>}></Route>
          <Route path='/recipe' element={isMobile?<RecipePageMobile/>:<RecipePage/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
