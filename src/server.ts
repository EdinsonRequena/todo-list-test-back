import { createApp } from './app';
import { prisma } from './config/prisma';

const PORT = process.env.PORT || 4000;

async function main() {
  const app = createApp();
  app.listen(PORT, () => console.log(`🚀 API ready at http://localhost:${PORT}/api`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
