import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// prisma.$use(async (params, next) => {
//   if (params.model === "Category") {
//     // TODO: work for every action
//     // TODO: pass email form session
//     if (!params.action.startsWith("create")) {
//       console.log(JSON.stringify(params));
//       params.args = {
//         ...params.args,
//         where: {
//           ...params.args?.where,
//           user: { email: "pawel@example.com" },
//         },
//       };
//       console.log(JSON.stringify(params));
//     }
//   }
//   return next(params);
// });

export default prisma;
