import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // テストデータの挿入
  for (let i = 0; i < 10; i++) {
    await prisma.mywallets.create({
      data: {
        mywallet_id: i,
        orthros_id: faker.string.uuid(),
        create_time: faker.date.anytime(),
      },
    });
  }
  await prisma.badge_vcs.create({
    data: {
      badge_vc_id: 1,
      mywallet_id: 1,
      moodle_name: "大阪教育大学",
      badge_category: "カテゴリ1",
      badge_name: "バッジ名",
      badge_email: "email@example.com",
      badge_class_id: "https://{domain}/badges/badge_json.php?id=32",
      badge_issuer_name: "発行者名",
      badge_issuedon: faker.date.anytime(),
      vc_data_header:
        "eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiT3BlbkJhZGdlVjIiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsicGhvdG8iOiJpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBZ0FBQUFJQUNBWUFBQUQwZU5UNkFBQUFDWEJJV1hNQUFBN0VBQUFPeEFHVkt3NGJBQUFnQUVsRVFWUjRBZXk5WGV4ZXhYbjJ1NHdqSjdKaVlVUWtnaVVyUnJHY3FwSVZJNlNxSVBIR1ZpdlNSdlVHbEpQbVpBZU9ySjY4Q1ljOTJRazk2M3NDOUdpbko1aDkwRFlIS0NBalNDeFJ6Q3NFVlNvTHMyMkZGTW5penlhQ0tzS0trYTJRSUZuczlYdncvWGorNDVtMVpxMW4xdm",
      vc_data_payload: "payload",
      vc_data_signature: "signature",
      create_time: faker.date.anytime(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
