#### Reset DB 
DEV ONLY - REMOVE DATA

1. Reset encore internal migration
```bash
encore db reset --all
```

2. Delete migration files, create empty /migrations folder

3. Generate schema
If now modify or add new features to better-auth, from service folder run:
```bash
npx auth generate
```

4. Generate new baseline migration file from schema 
```bash
npx drizzle-kit generate 
```

5. Run app and encore will migrate new db for you
```bash
encore daemon && encore run
```

#### Migration 
How Encore migration work: Encore apply any new sql files. So for any ORM tool, you have to generate migration sql files and let Encore handle it for you.
If Encore and Drizzle can auto migrate
1. Change schema
Currently, changes in schema.ts will not trigger auto migration from Encore, you will have to, from the service folder:
```bash
npx drizzle-kit generate
```

If now modify or add new features to better-auth, from service folder run:
```bash
npx auth generate
```

2. Run app and encore will migrate db for you
```bash
encore daemon && encore run
```


#### Migration 
If Encore and Drizzle can not auto migrate...
1. Change schema
```bash
npx drizzle-kit generate
```

2. Run app and encore migrate db but failed
```bash
encore daemon && encore run
```

3. Manual migration, go to latest migration file, handle migration by SQL, then run app again to apply migration:
```bash
encore daemon && encore run
```