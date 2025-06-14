import { NextResponse } from 'next/server';
import prisma from '@/app/prisma';
import { auth } from '@/app/auth';

import type { Ingredients, NewIngredients } from '@/app/utils/types';

  const session = await auth();
  const userid = session.user.id;

export async function GET(request: Request) {
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const ingredients: Ingredients[] = await prisma.ingredients.findMany({
        where: {
        userId: userid,
      },
    });
    return NextResponse.json(ingredients, { status: 200 });
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
    const body: NewIngredients = await request.json();
    const { name, calories, servings, satfat, transfat, cholesterol, sodium, carbs, protein } = body;

    const newIngredient: Ingredients = await prisma.ingredient.create({
      data: {
        name,
        calories: parseFloat(calories.toFixed(2)),
        servings: parseFloat(servings.toFixed(2)),
        protein: parseFloat(protein.toFixed(2)),
        carbs: parseFloat(carbs.toFixed(2)),
        satfat: parseFloat(satfat.toFixed(2)),
        transfat: parseFloat(transfat.toFixed(2)),
        sodium: parseFloat(sodium.toFixed(2)),
        cholesterol: parseFloat(cholesterol.toFixed(2)),
        userId:userid
      },
    });

    return NextResponse.json(newIngredient, { status: 201 })
  } catch (error) {
    console.error('Error saving ingredient:', error);
    return NextResponse.json({ message: 'Failed to save ingredient.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const ingredients: Ingredients[] = await prisma.ingredients.deleteMany({
        where: {
        userId: userid,
      },
    });
    return NextResponse.json("Successfully deleted all ingredients", { status: 200 });
  } catch (error) {
    console.error('Error deleting ingredients:', error);
    return NextResponse.json({ message: 'Failed to delete all ingredients.' }, { status: 500 });
  }
}