const { execSync } = require('child_process');

try {
  if (process.env.VERCEL) {
    execSync('prisma generate', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('Error during postinstall:', error);
  process.exit(1);
}
