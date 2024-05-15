import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const publicRoutesThatShouldRedirectAfterAuth = ['/api/webhook'];

export default authMiddleware({
  publicRoutes: [...publicRoutesThatShouldRedirectAfterAuth]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
