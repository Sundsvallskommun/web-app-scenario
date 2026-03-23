# Conventional Commits

Follow these rules for git commits in this repository:

- Before commiting, make sure that:
  - unnecessary console logs are removed
  - all unused imports are removed
  - all unused variables are removed (or marked as \_<name> if needed)
  - all changed files are formatted
- Use the Conventional Commits specification: `type(scope): description` when a scope is useful, otherwise `type: description`.
- Use lowercase commit types such as `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, and `chore`.
- If the work includes both fixes and features, split them into separate commits.
- If documentation describes a new feature delivered in the same change, include that documentation in the same feature commit.
- Do not use `!` to mark breaking changes in the commit header.
- Describe breaking changes with a `BREAKING CHANGE:` footer in the commit message body when needed.
- Before creating commits, group changes so each commit stays focused and traceable.
- When a thread is done, ask the user if the work should be committed.
