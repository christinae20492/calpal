import { NextResponse } from 'next/server';
import prisma from '@/app/prisma';
import { auth } from '@/app/auth';

import { MealItem, NewMealItem } from '@/app/utils/types';

  const session = await auth();
  const userid = session.user.id;

export async function GET(request: Request) {
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const mealItem: MealItem[] = await prisma.mealItem.findMany({
        where: {
        userId: userid,
      },
    });
    return NextResponse.json(mealItem, { status: 200 });
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return NextResponse.json({ message: 'Failed to fetch ingredients.' }, { status: 500 });
  }
}
export async function POST(request: Request) {
  
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: NewMealItem = await request.json();
    const { name, servingSize, totalCalories, ingredients } = body;

    const newMealItem: MealItem = await prisma.ingredient.create({
      data: {
        name,
        servingSize: parseFloat(servingSize.toFixed(2)),
        totalCalories: parseFloat(totalCalories.toFixed(2)),
        ingredients: ingredients,
        userId:userid
      },
    });

  
  return NextResponse.json(newMealItem, { status: 201 })
} catch (error) {
    console.error('Error saving meal item:', error);
    return NextResponse.json({ message: 'Failed to save meal item.' }, { status: 500 });
  }
}