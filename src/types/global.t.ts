export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      quizTaken?: boolean;
      quizPassed?: boolean;
    };
  }
}
