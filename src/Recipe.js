import React from 'react';
import style from './recipe.module.css'

const Recipe = ({title , calories, image, ingredients, cuisineType}) => {
    return (
        <div className={style.recipe}>        
            <h1 >{title}</h1>
            <p>Calorie: { parseInt(calories)}</p>
            <p>Cuisien Type: { cuisineType }</p>
            <ol>
                {ingredients.map(ingredient => (
                    <li key={ingredient.text}>{ ingredient.text}</li>
                ))}
            </ol>
            <img className={style.image } src={image} alt=''/>
        </div>

    )
}

export default Recipe;