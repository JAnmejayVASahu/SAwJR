"use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// // export async function getLatestUpdates() {
// //   const { userId } = auth();

// // console.log("**********Frontend User ID:", userId);

// //   if (!userId) {
// //     throw new Error("Unauthorized");
// //   }
// //   const user = await db.user.findUnique({
// //     where: { clerkUserId: userId },
// //   });

// //   if (!user) {
// //     throw new Error("User not found");
// //   }
// // console.log("**********User from DB:", user);
// //   const now = new Date();

// //   const upcomingMeetings = await db.booking.findMany({
// //     where: {
// //       userId: user.id,
// //       startTime: { gte: now },
// //     },
// //     include: {
// //       event: {
// //         select: {
// //           title: true,
// //         },
// //       },
// //     },
// //     orderBy: {
// //       startTime: "asc",
// //     },
// //     take: 3,
// //   });
// // console.log("****************Upcoming Meetings:", upcomingMeetings);
// //   return upcomingMeetings;
// // }

// export async function getLatestUpdates() {
//   try {
//     const { userId } = await auth();
//     console.log("Backend User ID:", userId);

//     if (!userId) {
//       throw new Error("Unauthorized - No userId found in Clerk auth");
//     }

//     const user = await db.user.findUnique({
//       where: { clerkUserId: userId },
//     });

//     // console.log("User from DB:", user);

//     if (!user) {
//       throw new Error("User not found in database");
//     }

//     // const upcomingMeetings = await db.booking.findMany({
//     //   where: {
//     //     userId: user.id,
//     //     startTime: { gte: now },
//     //   },
//     //   include: {
//     //     event: {
//     //       select: {
//     //         title: true,
//     //       },
//     //     },
//     //   },
//     //   orderBy: {
//     //     startTime: "asc",
//     //   },
//     //   take: 3,
//     // });
//     // return upcomingMeetings;

//   } catch (error) {
//     console.error("Error in getLatestUpdates:", error);
//     throw error;
//   }
// }

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getLatestUpdates() {
  try {
    const { userId } = await auth();
    console.log("Backend User ID:", userId);

    if (!userId) {
      throw new Error("Unauthorized - No userId found in Clerk auth");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found in database");
    }

    // Get the current time for filtering upcoming meetings
    const now = new Date();

    // Fetch upcoming meetings for the user
    const upcomingMeetings = await db.booking.findMany({
      where: {
        userId: user.id,
        startTime: { gte: now }, // Meetings starting after or at the current time
      },
      include: {
        event: {
          select: {
            title: true, // Include event title
          },
        },
      },
      orderBy: {
        startTime: "asc", // Sort by start time, ascending order
      },
      take: 3, // Get only the 3 most upcoming meetings
    });

    return upcomingMeetings;
  } catch (error) {
    console.error("Error in getLatestUpdates:", error);
    throw error;
  }
}
