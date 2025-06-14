import { NextResponse } from 'next/server';
import prisma from '@/app/prisma';
import { auth } from '@/app/auth';

import { Meals, NewMeals } from '@/app/utils/types';

  const session = await auth();
  const userid = session.user.id;

   function getCurrentDateFormatted(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

  export async function GET(request: Request) {
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const meal: Meals[] = await prisma.meal.findMany({
        where: {
        userId: userid,
      },
    });
    return NextResponse.json(meal, { status: 200 });
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
    const body: NewMeals = await request.json();
    const { date, breakfast, lunch, dinner, snacks } = body;

    const newMeal: Meals = await prisma.newMeal.create({
      data: {
        date: getCurrentDateFormatted(),
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        snacks: snacks,
        userId:userid
      },
    });

  
  return NextResponse.json(newMeal, { status: 201 })
} catch (error) {
    console.error('Error saving meal item:', error);
    return NextResponse.json({ message: 'Failed to save meal item.' }, { status: 500 });
  }
}