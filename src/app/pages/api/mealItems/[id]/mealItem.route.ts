import { NextResponse } from 'next/server';
import prisma from '@/app/prisma';
import { auth } from '@/app/auth';

import { MealItem } from '@/generated/prisma';
import { EditMealItem } from '@/app/utils/types';

interface ItemParams {
  params: {
    id: string;
  };
}

 const session = await auth();
  const userid = session.user.id;

  export async function GET(request: Request, { params }: ItemParams) {
    if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const mealItem: MealItem | null = await prisma.ingredient.findUnique({
      where: {
        id: id,
        userId: userid,
      },
    });

    if (!mealItem) {
      return NextResponse.json({ message: 'Food item not found.' }, { status: 404 });
    }

    return NextResponse.json(mealItem, { status: 200 });
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

    const body: EditMealItem = await request.json();
     if (Object.keys(body).length === 0) {
      return NextResponse.json({ message: 'No fields provided for update.' }, { status: 400 });
    }

    const mealItem: MealItem | null = await prisma.ingredient.update({
      where: {
        id: id,
        userId: userid,
      },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.totalCalories !== undefined && { totalCalories: parseFloat(body.totalCalories.toFixed(2)) }),
        ...(body.servingSize !== undefined && { servingSize: parseFloat(body.servingSize.toFixed(2)) }),
        ...(body.ingredients !== undefined && { ingredients: body.ingredients }),
      }
    });

    return NextResponse.json(mealItem, { status: 200 });
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
    const existingMealItem = await prisma.existingMealItem.findUnique({
      where: {
        id: id,
        userId: userid,
      },
    });

    if (!existingMealItem) {
      return NextResponse.json({ message: 'Meal item not found.' }, { status: 404 });
    }

    await prisma.existingMealItem.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting meal item with ID ${id}:`, error);
    return NextResponse.json({ message: 'Failed to delete meal item.' }, { status: 500 });
  }
}