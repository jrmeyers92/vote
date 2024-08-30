"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

type params = {
  quizTaken: boolean;
  quizPassed: boolean;
};

export async function setQuizMetadata({ quizTaken, quizPassed }: params) {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      quizTaken: quizTaken,
      quizPassed: quizPassed,
    },
  });
}
