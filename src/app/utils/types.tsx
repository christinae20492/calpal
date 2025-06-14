//Existing item

export interface User {
  id: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string,
  password: string,
  age: number,
  meals: [];
  goals: [{ exercise: [] }, { sleep: [] }, { waterIntake: [] }];
}

export interface Exercise {
  id: string;
  name: string;
  type: [];
  duration: [];
}

export interface Meals {
  id: string;
  date: string;
  breakfast: [];
  lunch: [];
  dinner: [];
  snacks: [];
  userId: number;
}

export interface MealItem {
  id: string;
  name: string;
  servingSize: number;
  totalCalories: number;
  ingredients: [];
  userId: number;
}

export interface Ingredients {
  id: string;
  name: string;
  calories: number;
  servings: number;
  satfat: number;
  transfat: number;
  cholesterol: number;
  sodium: number;
  carbs: number;
  protein: number;
  [key: string]: any;
  userId: number;
}

export interface Weight {
  id: string;
  weight: [];
  user: string;
}

//Creating a new item

export interface NewUser {
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  meals: [];
  goals: [{ exercise: [] }, { sleep: [] }, { waterIntake: [] }];
}

export interface NewExercise {
  name: string;
  type: [];
  duration: [];
}

export interface NewMeals {
  date: string;
  breakfast: [];
  lunch: [];
  dinner: [];
  snacks: [];
}

export interface NewMealItem {
  name: string;
  servingSize: number;
  totalCalories: number;
  ingredients: [];
}

export interface NewIngredients {
  name: string;
  calories: number;
  servings: number;
  satfat: number;
  transfat: number;
  cholesterol: number;
  sodium: number;
  carbs: number;
  protein: number;
  [key: string]: any;
}

export interface NewWeight {
  weight: [];
}

//Modifying existing item

export interface EditUser {
  fullName?: {
    firstName?: string;
    lastName?: string;
  };
  email?: string;
  meals?: [];
  goals?: [{ exercise?: [] }, { sleep?: [] }, { waterIntake?: [] }];
}

export interface EditExercise {
  name?: string;
  type?: [];
  duration?: [];
}

export interface EditMeals {
  date?: string;
  breakfast?: [];
  lunch?: [];
  dinner?: [];
  snacks?: [];
}

export interface EditMealItem {
  name?: string;
  servingSize?: number;
  totalCalories?: number;
  ingredients?: [];
}

export interface EditIngredients {
  name?: string;
  calories?: number;
  servings?: number;
  satfat?: number;
  transfat?: number;
  cholesterol?: number;
  sodium?: number;
  carbs?: number;
  protein?: number;
}

export interface EditWeight {
  weight?: [];
}