import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [isError, setIsError] = useState('')
  useEffect(()=>{
    const fetchMeals = async() =>{
      const response = await fetch('https://react-food-972e4-default-rtdb.firebaseio.com/meals.json')
        if(!response.ok){
        return new Error('Something went wrong!')
      }
      const responseData = await response.json()
      const data = [];
      
      for(const key in responseData){
        data.push({
          id : key,
          name : responseData[key].name,
          description : responseData[key].description,
          price : responseData[key].price
        })
      }
      setMeals(data)
      setIsloading(false)
    }
    fetchMeals().catch(error=>{
      setIsloading(false)
      setIsError(error.message)
    })
  },[])

    if(isError){
      return(
        <section className={classes.mealsError}>
          <p>{isError}</p>
        </section>
      )
    }
    if(isLoading){
      return(
        <section className={classes.mealsLoading}>
          <p>Loading...</p>
        </section>
      )
    }

    const MealsList = meals.map(ele=>{
        return <MealItem 
            key={ele.id}
            id={ele.id}
            name={ele.name}
            description={ele.description}
            price={ele.price}
        />
    })
    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {MealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals