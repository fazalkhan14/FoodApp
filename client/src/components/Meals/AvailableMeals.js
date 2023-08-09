import { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(null);

  const fetchMealHandler = useCallback(async () => {

    
    const response = await fetch("http://localhost:5266/api/Meals");

    if(!response.ok){
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const transformedMealData = data.map((item) => {
    return {
      id : item.mealID,
      name : item.name,
      description : item.description,
      price : item.price
    }});

    setMeals(transformedMealData);

    setIsLoading(false);
  },[]);

  useEffect(() => {
    fetchMealHandler();
    fetchMealHandler().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, [fetchMealHandler])

  if(isLoading) {
    return (
    <section className={classes.meals}>
        <Card>
            <p>Loading</p>
        </Card>
    </section>
    )
  }

  if(isError) {
    return (
    <section className={classes.meals}>
        <Card>
            <p>{isError}</p>
        </Card>
    </section>
    )
  }

  const mealsList = meals.map((meal) => <MealItem key={meal.id} meal={meal} id={meal.id}/>)

  return (
  <section className={classes.meals}>
      <Card>
          <ul>
              {mealsList}
          </ul>
      </Card>
  </section>)

}

export default AvailableMeals;