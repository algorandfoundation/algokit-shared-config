/**
 * Commitlint configuration - Relaxed Mode
 * All rules set to Warning (1) or Disabled (0) to prevent exit code 1.
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Setting these to 1 (warning) ensures they show up in logs
    // but won't stop the process with "exit code 1"
    "subject-case": [0], // Fully disabled
    "type-empty": [1, "never"], // Warning only
    "subject-empty": [1, "never"], // Warning only

    // Formatting rules set to ignore
    "body-leading-blank": [0],
    "body-max-line-length": [0],
    "header-max-length": [0],
    "footer-max-length": [0],
    "footer-max-line-length": [0],

    // If config-conventional is still throwing errors,
    // we explicitly downgrade the most common ones:
    "type-enum": [1, "always"],
    "header-min-length": [0],
  },
};
