import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { restoTypes } from "../types/userTypes";

const collectionName = "restaurants";

const collectionNameDish = "dishes";



export const actionGetRestoAsync = () => {
  return async (dispatch) => {
    const restoCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(restoCollection);
    const restaurants = [];
    try {
      querySnapshot.forEach((element) => {
        const restaurant = {
          id: element.id,
          ...element.data(),
        }
        restaurants.push(restaurant)
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(actionGetRestoSync(restaurants));
    }

  };
};

export const actionGetRestoSync = (restaurants) => {
  return {
    type: restoTypes.RESTO_GET,
    payload: restaurants
  };
};

export const actionAddRestoAsync = (restaurant) => {
  return async (dispatch) => {
    try {
      const restoCollection = collection(dataBase, collectionName);
      const docs = await addDoc(restoCollection, restaurant);
      dispatch(actionAddRestoSync({id:doc.id,...restaurant}))
    
    } catch (error) {
      dispatch(actionAddRestoSync({}));
    }
  };
};

const actionAddRestoSync = (restaurant) => {
  return {
    type: restoTypes.RESTO_ADD,
    payload: restaurant,
  };
};

export const actionFilterRestoAsync = (searchParam, searchValue) => {
  return async (dispatch) => {
    const restoCollection = collection(dataBase, collectionName);
    const q = query(restoCollection, where(searchParam, "==", searchValue));
    const restaurants = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((element) => {
        const restaurant = {
          id: element.id,
          ...element.data(),
        }
        restaurants.push(restaurant)
      });

    } catch (error) {
      console.log(error);
    } finally {
      dispatch(actionFilterRestoSync(restaurants));
    }
  };
};

const actionFilterRestoSync = (restaurants) => {
  return {
    type: restoTypes.RESTO_FILTERED,
    payload: {
      restaurants: restaurants,
    },
  };
};


export const actionFilterAsync = (searchParam) => {
  return async (dispatch) => {
    const restoCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(restoCollection);
    const restaurants = [];
    try {
      querySnapshot.forEach((element) => {
        const restaurant={
          id: element.id,
          ...element.data(),
        }
        restaurants.push(restaurant);
      });

      const filterdRestaurants = restaurants.filter((item) =>
        item.name.toLowerCase().includes(searchParam.toLowerCase())
      );
      dispatch(actionFilterRestoSync(filterdRestaurants));
    } catch (error) {
      console.error(error);
      dispatch(actionFilterRestoSync([]));
    }
  };
};


export const actionGetDishesAsync = (searchParam) => {
  return async (dispatch) => {
    const restoCollectionDish = collection(dataBase, collectionNameDish);
    const querySnapshot = await getDocs(restoCollectionDish);
    const dishes = [];
    try {
      querySnapshot.forEach((element) => {
        const dish = {
          id: element.id,
          ...element.data()
        }
        dishes.push(dish)
      });
      const dishesFilter = dishes.filter((element) => element.restaurants.toLowerCase().includes(searchParam.toLowerCase()));
      dispatch(actionFilterDishesSync(dishesFilter));
    } catch (error) {
      console.error(error);
      dispatch(actionFilterDishesSync([]));
    }

  };
};


export const actionFilterDishesAsync = (searchParam, searchValue) => {
  
  return async (dispatch) => {
    const restoCollectionDish = collection(dataBase, collectionNameDish);
    const q = query(restoCollectionDish, where(searchParam, "==", searchValue));
    const dishes = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((element) => {
        const dish = {
          id: element.id,
          ...element.data()
        }
        dishes.push(dish)
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(actionFilterDishesSync(dishes));
      
    }
    
  }
}

const actionFilterDishesSync = (dishes) => {
  return {
    type: restoTypes.RESTO_DISHES,
    payload: {
      dishes: dishes,
    },
  }
};

