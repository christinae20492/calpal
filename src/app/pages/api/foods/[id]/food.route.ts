import { NextResponse } from 'next/server';
import prisma from '@/app/prisma';
import { auth } from '@/app/auth';

interface ItemParams {
  params: {
    id: string;
  };
}

import type { Ingredients, EditIngredients } from '@/app/utils/types';

  const session = await auth();
  const userId = session.user.id;

export async function GET(request: Request, { params }: ItemParams) {
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const ingredient: Ingredients | null = await prisma.ingredient.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!ingredient) {
      return NextResponse.json({ message: 'Food item not found.' }, { status: 404 });
    }

    return NextResponse.json(ingredient, { status: 200 });
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch item.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: ItemParams) {
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {

    const body: EditIngredients = await request.json();
     if (Object.keys(body).length === 0) {
      return NextResponse.json({ message: 'No fields provided for update.' }, { status: 400 });
    }

    const ingredient: Ingredients | null = await prisma.ingredient.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.calories !== undefined && { calories: parseFloat(body.calories.toFixed(2)) }),
        ...(body.servings !== undefined && { servings: parseFloat(body.servings.toFixed(2)) }),
        ...(body.satfat !== undefined && { satfat: parseFloat(body.satfat.toFixed(2)) }),
        ...(body.transfat !== undefined && { transfat: parseFloat(body.transfat.toFixed(2)) }),
        ...(body.cholesterol !== undefined && { cholesterol: parseFloat(body.cholesterol.toFixed(2)) }),
        ...(body.sodium !== undefined && { sodium: parseFloat(body.sodium.toFixed(2)) }),
        ...(body.carbs !== undefined && { carbs: parseFloat(body.carbs.toFixed(2)) }),
        ...(body.protein !== undefined && { protein: parseFloat(body.protein.toFixed(2)) }),
      }
    });

    return NextResponse.json(ingredient, { status: 200 });
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch item.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: ItemParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const existingFoodItem = await prisma.ingredient.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingFoodItem) {
      return NextResponse.json({ message: 'Food item not found.' }, { status: 404 });
    }

    await prisma.ingredient.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting food item with ID ${id}:`, error);
    return NextResponse.json({ message: 'Failed to delete food item.' }, { status: 500 });
  }
}