import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { DOMEvent, IState, IDish } from '../../types';

import RecipePage from './RecipePage';

const RecipePageContainer = () => {
    const [dishes, setDishes] = useState<IDish[] | null>(null);
    const [state, setState] = useState<IState>({
        name: '',
        type: '',
    });

    const onHandleChange = (evt: DOMEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        })
    }

    const onCreateDish = (evt: DOMEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { name, type } = state;

        if (name.length === 0) {
            console.error('onCreateDish::', 'Input value is missing')
            return;
        }

        const newDish = { name, type, _id: uuid() }

        dishes ? setDishes((dishes: any) => [...dishes, newDish]) : setDishes([newDish])
        setState({ ...state, name: '', type: '' })
    }

    const onRemoveDish = (selected: string) => {
        const newDishes = dishes?.filter((x: IDish) => x._id !== selected);

        if (!newDishes) {
            return;
        }

        setDishes(newDishes)
    }

    return (
        <RecipePage
            state={state}
            dishes={dishes}
            onHandleChange={onHandleChange}
            onCreateDish={onCreateDish}
            onRemoveDish={onRemoveDish}
        />
    )
}

export default RecipePageContainer;