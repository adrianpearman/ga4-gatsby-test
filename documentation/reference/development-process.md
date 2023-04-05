# Development Process

## Issue Creation & Qualification

- All feature requests and bug reports should be added to the project's
  [Issues](https://github.com/HackerYou/juno-website/issues) using the
  [standard templates](https://github.com/HackerYou/juno-website/issues/new).
  - Bug: Any feature or functionality not behaving as intended from originally implemented.
  - Feature request: Any new functionality or improvement to any existing functionality.
- New issues go to the product 'backlog' in ZenHub to be scheduled into a future sprint.

## Sprint Planning

- Each sprint will have a sprint backlog column on the Juno Website
- Tasks must be sized using points. Tasks more than 3 in points should be broken up to smaller
  tasks.
- Sprint capacity will be determined using information about points achieved in previous sprints.

## Development

- Implement code changes in a new branch. There is no restriction on formatting for branch names,
  use whatever scheme works best for you.
- Test thoroughly in local environment.
- As a collaborative project do your best to use
  [good commit messages](https://chris.beams.io/posts/git-commit/) (feel free to ignore the
  72-character wrap rule though).
- Open a Pull Request (PR) for feedback/approval:
  - Mention the related issue(s) in the PR description (e.g. “Fixes #124”)
  - Follow the principles of [good commit messages](https://chris.beams.io/posts/git-commit/) in the
    PR description.
  - Test thoroughly in the netlify deploy preview (See the checks section of the PR).
  - Assign reviews or ask for reviews in the juno-website channel.

## Review & Approvals

- Acquire approvals from:
  - Design approver for any UI/UX affecting changes.
  - Another developer for any code change
    - Code style and quality
    - Appropriate implementation
    - Potential performance or security concerns

## Merging and Deployment

- Merge and delete branch (assigned developer/PR author)
- Monitor the automated netlify deploy process for errors.
- Test thorough in the production environment.
- Ensure the associated issue(s) has been closed.
