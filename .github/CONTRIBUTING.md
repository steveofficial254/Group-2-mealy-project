# Gitflow Branch Naming Conventions

## Main Branches
- `main` - Production-ready code only
- `develop` - Integration branch for all features

## Supporting Branches
- `feature/feature-name` - New features (branch from develop)
- `release/v1.0.0` - Preparing new releases (branch from develop)
- `hotfix/critical-bug-fix` - Emergency fixes (branch from main)

## Feature Branch Examples
- `feature/user-authentication`
- `feature/menu-display`
- `feature/order-placement`
- `feature/admin-dashboard`
- `feature/payment-integration`

## Process
1. Create feature branch from `develop`
2. Work on feature
3. Create PR to merge into `develop`
4. After code review, merge to `develop`
5. When ready for release, merge `develop` to `main`

## Team Workflow Commands

**Starting a new feature:**
```bash
# Always start from latest develop
git checkout develop
git pull origin develop
git checkout -b feature/user-login
# Work on your feature...
```

**Finishing a feature:**
```bash
# Push your feature branch
git add .
git commit -m "feat: implement user login functionality"
git push -u origin feature/user-login
# Create PR on GitHub: feature/user-login → develop
```

**Preparing a release:**
```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
# Final testing and bug fixes...
git push -u origin release/v1.0.0
# Create PR: release/v1.0.0 → main
# Also merge back to develop
```

**Emergency hotfix:**
```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix
# Fix the issue...
git push -u origin hotfix/critical-security-fix
# Create PR: hotfix/critical-security-fix → main
# Also create PR to develop
```

## Code Review Guidelines

- All PRs require at least 1 approval before merging
- Test coverage must not decrease
- All CI checks must pass
- Follow conventional commit message format
- Keep PRs focused and reasonably sized

## Mealy Project Specific Branches

**Frontend Features:**
- `feature/user-login-form`
- `feature/menu-display-component`
- `feature/order-placement-ui`
- `feature/admin-dashboard`

**Backend Features:**
- `feature/user-authentication-api`
- `feature/menu-management-api`
- `feature/order-processing-api`
- `feature/payment-integration`

## Week-by-Week Branch Strategy

**Week 1:** Setup and foundation
**Week 2-3:** Feature development (all feature branches)
**Week 4:** Integration, testing, and release preparation

## Conventional Commit Messages

Use the following format for commit messages:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
- `feat: add user authentication system`
- `fix: resolve menu loading issue`
- `docs: update API documentation`
- `test: add unit tests for order processing`