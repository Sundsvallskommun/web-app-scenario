# Branch Workflow

Follow these rules for git branch handling in this repository:

- When starting a new thread, create and work on a dedicated branch that fits the planned change.
- If the user explicitly says not to change branch, do not create or switch branches.
- Before creating a branch, ask the user for the Jira ticket name or key unless it is already provided.
- Classify the work as either `fix` or `feature` before naming the branch.
- Choose a short, fitting suffix that describes the planned work.
- Name the branch using this pattern: `<fix|feature>/<jira-ticket>-<fitting-name>`.
- If the current thread is only about instructions, documentation, or workflow setup, do not change branch unless the user asks for it.
