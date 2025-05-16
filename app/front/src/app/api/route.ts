import { NextRequest, NextResponse } from 'next/server'
 
type ResponseData = {
  message: string
}
 
export function GET(
  _req: NextRequest,
) {
  const res = NextResponse.json({ message: 'Hello from Next.js!' })
  return res
}
