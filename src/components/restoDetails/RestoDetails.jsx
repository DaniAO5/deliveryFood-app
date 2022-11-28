import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './styleDetails.scss'
import {actionFilterDishesAsync, actionGetDishesAsync } from '../../redux/actions/restoActions';

const RestoDetails = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dishes } = useSelector((store) => store.restoStore);
  const { restaurants } = useSelector((store) => store.restoStore);
 
  useEffect(() => {
    dispatch(actionGetDishesAsync());
  }, [dispatch]);

  const dishesFilter1=(searchValue)=>{
    const searchParam="property"
    dispatch(actionFilterDishesAsync(searchParam, searchValue));
  }

  const dishesFilter2=(item)=>{
    let searchValue=item.name
    let searchParam="name"
    dispatch(actionFilterDishesAsync(searchParam,searchValue))
    navigate('/dishes')
  }

  return (
    <div>
      {
        restaurants.map((restaurant, index) => {
          return (
            <div key={index}>
              <h2 className='titleResto'>{restaurant.name}</h2>
              <span className='restoDetail'>
                <img src={restaurant.image} alt="image" />
                <div>
                  <h6>{restaurant.description}</h6>
                  <p>{restaurant.time}</p>
                </div>
              </span>
            </div>
          )
        }
        )
      }
      <Button variant="danger" className='btnMenu'></Button>{' '}
      <div>
      {
        dishes.map((dish, index) => {
          return (
            <Card style={{ width: '18rem' }} key={index}>
              <Card.Img variant="top" src={dish.image} />
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>
                  {dish.description}
                </Card.Text>
                <Button variant="warning" class="btn btn-outline-warning">{dish.price}</Button>
              </Card.Body>
            </Card>
          )
        })
      }
      </div>

    </div>
  )
}

export default RestoDetails