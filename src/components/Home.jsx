import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionGetRestoAsync } from "../redux/actions/restoActions";
import FilterButtons from "./FilterButtons";
import './style.scss'

const Home = () => {
  
  const { restaurants } = useSelector((store) => store.restoStore);
  
  const dispatch = useDispatch();
  const navigate= useNavigate();

  useEffect(() => {
    dispatch(actionGetRestoAsync());
  }, [dispatch]);

  const detailsDishes=()=>{
    navigate('/details')
  }

  return (
    
      <div>
      <div className='containerHome'>
        <div className='containerHome_place'>
          <img src="./assets/place.png" alt=""/>
          <p>882 Well St, New-York</p>
        </div>
        <div className='containerHome_image'>
          <img src="./assets/banner.png" alt="" className='containerHome_image-1'/>
         
        </div>
      <FilterButtons />
        <h2>Restaurants and Kafes</h2>
      <div>
      
      { restaurants.length? (
        restaurants.map((restaurant, index) => (
        <div className='containerHome_resto' key={index} onClick={detailsDishes}>
          <span>
             <img  src={restaurant.image} alt="image"/>
              <div>
                  <h5>{restaurant.name}</h5>
                  <img src="./assets/starspardes.png" alt=""/>
                  <h6>{restaurant.description}</h6>
                  <p>{restaurant.time}</p>
              </div>
          </span>
        </div>
        ))
      ):(
        <></>
        )} 
    </div>
    </div>
    
    </div>
  );
};

export default Home;
