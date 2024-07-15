
create table "public"."scripts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "url" text default ''::text,
    "order_id" text default ''::text
);


alter table "public"."scripts" enable row level security;

CREATE UNIQUE INDEX scripts_pkey ON public.scripts USING btree (id);


alter table "public"."scripts" add constraint "scripts_pkey" PRIMARY KEY using index "scripts_pkey";


grant delete on table "public"."scripts" to "anon";

grant insert on table "public"."scripts" to "anon";

grant references on table "public"."scripts" to "anon";

grant select on table "public"."scripts" to "anon";

grant trigger on table "public"."scripts" to "anon";

grant truncate on table "public"."scripts" to "anon";

grant update on table "public"."scripts" to "anon";

grant delete on table "public"."scripts" to "authenticated";

grant insert on table "public"."scripts" to "authenticated";

grant references on table "public"."scripts" to "authenticated";

grant select on table "public"."scripts" to "authenticated";

grant trigger on table "public"."scripts" to "authenticated";

grant truncate on table "public"."scripts" to "authenticated";

grant update on table "public"."scripts" to "authenticated";

grant delete on table "public"."scripts" to "service_role";

grant insert on table "public"."scripts" to "service_role";

grant references on table "public"."scripts" to "service_role";

grant select on table "public"."scripts" to "service_role";

grant trigger on table "public"."scripts" to "service_role";

grant truncate on table "public"."scripts" to "service_role";

grant update on table "public"."scripts" to "service_role";


create policy "Enable insert for unauthenticated users"
on "public"."scripts"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."scripts"
as permissive
for select
to public
using (true);



