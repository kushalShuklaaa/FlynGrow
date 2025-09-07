// client/src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // You can add authentication checks, etc. here
  return NextResponse.next();
}
