drop policy "Enable insert for unauthenticated users" on "public"."scripts";

drop policy "Enable read access for all users" on "public"."scripts";

alter table "public"."scripts" drop constraint "scripts_pkey";

drop index if exists "public"."scripts_pkey";

CREATE UNIQUE INDEX scripts_pkey ON public.scripts USING btree (id, type);

alter table "public"."scripts" add constraint "scripts_pkey" PRIMARY KEY using index "scripts_pkey";

create policy "Update access for unauthenticated users"
on "public"."scripts"
as permissive
for update
to anon
using (true)
with check (true);


create policy "Enable insert for unauthenticated users"
on "public"."scripts"
as permissive
for insert
to anon
with check (true);


create policy "Enable read access for all users"
on "public"."scripts"
as permissive
for select
to anon
using (true);



