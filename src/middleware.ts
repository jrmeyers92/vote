import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isQuizRoute = createRouteMatcher(["/quiz"]);
const isNotAllowedRoute = createRouteMatcher(["/not-allowed"]);
const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/sign-up"]);

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = auth();

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // For users visiting /onboarding, /quiz, or /not-allowed, don't try to redirect
  if (
    userId &&
    (isOnboardingRoute(req) || isQuizRoute(req) || isNotAllowedRoute(req))
  ) {
    return NextResponse.next();
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboarding route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // Catch users who do not have `quizTaken: true` in their publicMetadata
  // Redirect them to the /quiz route to complete the quiz
  if (userId && !sessionClaims?.metadata?.quizTaken) {
    const quizUrl = new URL("/quiz", req.url);
    return NextResponse.redirect(quizUrl);
  }

  // Catch users who do not have `quizPassed: true` in their publicMetadata
  // Redirect them to the /not-allowed route
  if (userId && !sessionClaims?.metadata?.quizPassed) {
    const notAllowedUrl = new URL("/not-allowed", req.url);
    return NextResponse.redirect(notAllowedUrl);
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Default response for public routes
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
