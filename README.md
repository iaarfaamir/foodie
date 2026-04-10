# Foodie Restaurant

A production-ready online food ordering system built with Next.js App Router, Tailwind CSS, MongoDB, and JWT authentication.

## Folder structure

- `app/` - Next.js App Router pages and layouts
  - `page.tsx` - home page
  - `menu/page.tsx` - menu browsing
  - `cart/page.tsx` - cart overview
  - `checkout/page.tsx` - checkout flow
  - `orders/page.tsx` - order history
  - `admin/page.tsx` - admin dashboard
  - `login/page.tsx` - login page
  - `signup/page.tsx` - signup page
- `components/` - reusable UI components
- `context/` - client-side Zustand state management
- `lib/` - database connection and JWT helpers
- `models/` - Mongoose models for User, Food, Order
- `app/api/` - Next.js API routes for auth, menu, cart, orders, admin

## Setup instructions

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file with the following variables:

```env
MONGODB_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app at `http://localhost:3000`

## Deployment on Vercel

1. Push the project to a Git repository.
2. Connect the repository in Vercel.
3. Add the environment variables in Vercel settings:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy.

## Notes

- The menu API auto-seeds default items if the database is empty.
- Shipping is fixed at a sample value and the checkout flow persists cart in browser storage.
- Admin functionality requires a user with `role: admin` in the database.
