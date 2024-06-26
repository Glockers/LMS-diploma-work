declare namespace NodeJS {
  interface ProcessEnv {
    MUX_TOKEN_ID: string;
    DATABASE_URL: string;
    CLERK_SECRET_KEY: string;
    MUX_TOKEN_SECRET: string;
    STRIPE_SECRET_KEY: string;
    UPLOADTHING_SECRET: string;
    UPLOADTHING_APP_ID: string;
    NEXT_PUBLIC_APP_URL: string;
    STRIPE_WEBHOOK_SECRET: string;
    NEXT_PUBLIC_TEACHER_ID: string;
    STRIPE_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
  }
}
