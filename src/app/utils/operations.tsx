import { Meals } from "./types";

  const getAllMeals = async () => {

    try {
      const response = await fetch('/api/food-items');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch food items.');
      }
      const data: Meals[] = await response.json();
 
      return data;
    } catch (err: any) {
      console.error('Error fetching food items:', err);
    }
  };