import React from 'react';

import { IState, IDish } from '../../types';

interface IForm {
    state: IState,
    onHandleChange: (evt: any) => void,
    onCreateDish: (evt: any) => void,
}

const Form: React.FC<IForm> = ({ onCreateDish, state, onHandleChange }) => (
    <form onSubmit={onCreateDish} autoComplete="off" autoCorrect="off">
        <input
            type="text" name="name"
            value={state.name}
            onChange={onHandleChange}
            placeholder="Dish name..."
        />

        <input
            type="text" name="type"
            value={state.type}
            onChange={onHandleChange}
            placeholder="Dish type..."
        />

        <button type="submit">
            CREATE DISH
        </button>
    </form>
)

interface IListItem {
    dish: IDish,
    onRemoveDish: (selected: string) => void,
}

const ListItem: React.FC<IListItem> = ({ dish, onRemoveDish }) => (
    <li key={dish._id}>
        <button onClick={() => onRemoveDish(dish._id)}>
            REMOVE
        </button>

        <span>{dish?.name}, {dish?.type}</span>
    </li>
)

interface IRecipePage {
    state: IState,
    dishes: IDish[] | null,
    onHandleChange: (evt: any) => void,
    onCreateDish: (evt: any) => void,
    onRemoveDish: (selected: string) => void,
}

const RecipePage: React.FC<IRecipePage> = ({
    state,
    dishes,
    onHandleChange,
    onCreateDish,
    onRemoveDish,
}) => {
    return (
        <>
            <Form
                onCreateDish={onCreateDish}
                state={state}
                onHandleChange={onHandleChange}
            />

            {dishes ? (
                <ul>
                    {dishes.map((dish: IDish, i: number) => (
                        <ListItem key={i} dish={dish} onRemoveDish={onRemoveDish} />
                    ))}
                </ul>
            ) : (
                    <i>No dishes were found...</i>
                )}
        </>
    )
}

export default RecipePage;