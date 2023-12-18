# Year in code

This project is bootstrapped with [`create-rubric-app`](https://github.com/RubricLab/create-rubric-app). Built in partnership between [Graphite](https://graphite.dev/) x [Rubric Labs](https://rubriclabs.com/).

## Getting Started

```sh
bun i
bun dev
```

Open [localhost:3000](http://localhost:3000) in your browser to see the result.

## Supabase types

If you make a change to database schema, to update the generated types, run the following command:

```sh
npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > lib/types/supabase.ts
```

The `PROJECT_REF` is accessible via Supabase project URL. [Learn more here](https://supabase.com/docs/guides/api/rest/generating-types#generating-types-using-supabase-cli).

## Learn more

Check this [blog post](https://rubriclabs.com/blog/year-in-code).
