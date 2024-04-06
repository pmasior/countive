import { PrismaClient } from "@prisma/client";
import https from "https";

const prisma = new PrismaClient();

/**
 * Create records for Icon table in database
 */
const createIconInDatabase = async () => {
  /**
   * Downloads file with icon name and codepoint from Material Icons repository
   * @returns downloaded file content as string string
   */
  const getCodepointsFromMaterialIconsRepository = async () => {
    const MATERIAL_ICONS_CODEPOINTS_URL = {
      hostname: "raw.githubusercontent.com",
      path: "/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints",
    };

    return new Promise<string>((resolve, reject) => {
      const buffer: any[] = [];
      const options = {
        hostname: MATERIAL_ICONS_CODEPOINTS_URL.hostname,
        path: MATERIAL_ICONS_CODEPOINTS_URL.path,
      };
      const req = https.request(options, (res) => {
        res.on("data", (d) => {
          buffer.push(d);
        });
        res.on("end", () => {
          resolve(Buffer.concat(buffer).toString());
        });
      });
      req.on("error", (error) => reject(error));
      req.end();
    });
  };

  /**
   * Convert downloaded string to records insert to Icon table
   * @param codepoints string in format "name codepoint", example line "cottage e587"
   * @returns array of objects with name attribute equal to icon name
   */
  const convertToArrayPassedToDatabase = (codepoints: string) => {
    const iconLinesFromFile = codepoints.split("\n");
    return iconLinesFromFile.map((i) => {
      const iconName = i.split(" ")[0];
      return { name: iconName };
    });
  };

  /**
   * Insert icon records to database
   * @param icons array with objects with icon name
   * @returns PrismaPromise<Prisma.BatchPayload>
   */
  const createIconsInDatabase = async (icons: { name: string }[]) =>
    prisma.icon.createMany({
      data: icons,
    });

  const codepoints = await getCodepointsFromMaterialIconsRepository();
  const icons = convertToArrayPassedToDatabase(codepoints);
  const createManyResult = await createIconsInDatabase(icons);
  console.log(`Created ${createManyResult.count} Icons`);
};

/**
 * Create initial data in database
 */
async function main() {
  await createIconInDatabase();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
