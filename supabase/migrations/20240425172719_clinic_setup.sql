create table "public"."clinics" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "centre_id" text,
    "order_prefix" text,
    "address" text,
    "phone" text,
    "email" text,
    "website" text,
    "is_deleted" boolean default false
);


alter table "public"."clinics" enable row level security;

CREATE UNIQUE INDEX clinics_centre_id_key ON public.clinics USING btree (centre_id);

CREATE UNIQUE INDEX clinics_order_prefix_key ON public.clinics USING btree (order_prefix);

CREATE UNIQUE INDEX clinics_pkey ON public.clinics USING btree (id);

alter table "public"."clinics" add constraint "clinics_pkey" PRIMARY KEY using index "clinics_pkey";

alter table "public"."clinics" add constraint "clinics_centre_id_key" UNIQUE using index "clinics_centre_id_key";

alter table "public"."clinics" add constraint "clinics_order_prefix_key" UNIQUE using index "clinics_order_prefix_key";

grant delete on table "public"."clinics" to "anon";

grant insert on table "public"."clinics" to "anon";

grant references on table "public"."clinics" to "anon";

grant select on table "public"."clinics" to "anon";

grant trigger on table "public"."clinics" to "anon";

grant truncate on table "public"."clinics" to "anon";

grant update on table "public"."clinics" to "anon";

grant delete on table "public"."clinics" to "authenticated";

grant insert on table "public"."clinics" to "authenticated";

grant references on table "public"."clinics" to "authenticated";

grant select on table "public"."clinics" to "authenticated";

grant trigger on table "public"."clinics" to "authenticated";

grant truncate on table "public"."clinics" to "authenticated";

grant update on table "public"."clinics" to "authenticated";

grant delete on table "public"."clinics" to "service_role";

grant insert on table "public"."clinics" to "service_role";

grant references on table "public"."clinics" to "service_role";

grant select on table "public"."clinics" to "service_role";

grant trigger on table "public"."clinics" to "service_role";

grant truncate on table "public"."clinics" to "service_role";

grant update on table "public"."clinics" to "service_role";

create policy "Allow auth users to read all"
on "public"."clinics"
as permissive
for select
to authenticated
using (true);


create policy "Auth users can insert"
on "public"."clinics"
as permissive
for insert
to authenticated
with check (true);



