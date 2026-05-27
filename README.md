**Pinterest-Style Clone (Next.js + Prisma)**

Pinterest-like application built with the Next.js, TypeScript, Tailwind CSS and Prisma. It includes user authentication, pin creation and upload, boards, saving pins, and basic profile features.

**Quick Start**

- **Install dependencies**:

```bash
npm install
```

- **Generate Prisma client**

```bash
npx prisma generate
```

- **Run database migrations / push schema**

```bash
# create and apply migrations
npx prisma migrate dev

# or push schema without creating a migration
npx prisma db push
```

- **Run the dev server**:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

**Environment Variables**

Copy `.env.example` to `.env`
