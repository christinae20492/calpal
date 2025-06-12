export interface User {
    id: number,
    meals:[],
    goals: [
        {exercise: []},
        {sleep:[]},
        {waterIntake:[]},
    ]
}

export interface Exercise {
    id:number,
    type:[],
    duration:[],
    user: string,
}

export interface Meals {
    id:number,
    date: string,
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
    user: string,
}

export interface MealItem {
    id: number,
    servingSize: number,
    totalCalories:number,
    ingredients: [],
    user: string,
}

export interface Ingredients {
    id:number,
    calories: number,
    satfat: number,
    transfat: number,
    cholesterol: number,
    sodium: number,
    carbs: number,
    protein: number,
    [key: string]: any,
    user: string,
}

export interface Weight {
    id:number,
    weight: [],
    user: string,
}