import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { DOMEvent, IState, IDish } from '../../types';

import RecipePage from './RecipePage';

const RecipePageContainer = () => {
    // "Database"
    const initialState = [
        {
            _id: uuid(),
            name: "Spring Rolls",
            type: "Vegan"
        },
        {
            _id: uuid(),
            name: "Ramen",
            type: "Meat"
        }
    ];

    const [dishes, setDishes] = useState<IDish[] | null>(null);
    const [state, setState] = useState<IState>({
        name: '',
        type: '',
    })

    useEffect(() => {
        const init = async () => {
            try {
                // Let's pretend this is an API request...
                setDishes(initialState)
                // .catch((e) => {
                //     console.error('setDishes::', e)
                // })
            }
            catch (e) {
                console.error('init::', e)
            }
        }

        init()
    }, [initialState])

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

        if (name.length === 0 || type.length === 0) {
            console.error('onCreateDish::', 'Input values are missing')
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