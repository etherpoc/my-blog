import { HttpStatusCode } from '@/types/api'
import { NextRequest, NextResponse } from 'next/server'
 
type ResponseData = {
  message: string,
}

export async function GET(
  _req: NextRequest,
) {
  return NextResponse.json({message: 'This is Article API'})
}