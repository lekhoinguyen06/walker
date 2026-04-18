#### Reset DB 
DEV ONLY - REMOVE DATA

1. Reset encore internal migration
```bash
encore db reset --all
```

2. Delete migration files

3. Generate schema
If now modify or add new features to better-auth, from service folder run:
```bash
npx auth generate
```

4. Generate migration from schema 
```bash
npx drizzle-kit generate 
```

5. Run app and encore will migrate new db for you

#### Migration 
If Encore and Drizzle can auto migrate
1. Change schema
If now modify or add new features to better-auth, from service folder run:
```bash
npx auth generate
```

2. Run app and encore will migrate db for you


#### Migration 
If Encore and Drizzle can not auto migrate...