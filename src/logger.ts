const colors = {
  success: "\x1b[32m", // Green
  error: "\x1b[31m", // Red
  info: "\x1b[36m", // Cyan
  warn: "\x1b[33m", // Yellow
  reset: "\x1b[0m", // Reset color
};

// Logger function
const logger = {
  success: (message: string) =>
    console.log(`${colors.success}✓ ${message}${colors.reset}`),
  error: (message: string) =>
    console.log(`${colors.error}✗ ${message}${colors.reset}`),
  info: (message: string) =>
    console.log(`${colors.info}ℹ ${message}${colors.reset}`),
  warn: (message: string) =>
    console.log(`${colors.warn}⚠ ${message}${colors.reset}`),
  url: (url: string) =>
    console.log(`${colors.info}🔗 Server running at: ${colors.reset}${url}`),
};

export default logger;
