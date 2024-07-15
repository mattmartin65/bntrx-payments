
create type "public"."script_types" as enum ('primary', 'secondary');


alter table "public"."scripts" add column "name" text;

alter table "public"."scripts" add column "updated_at" timestamp with time zone default now();

alter table "public"."scripts" alter column "order_id" set not null;

alter table "public"."scripts" add column "is_submitted" boolean default false;

alter table "public"."scripts" add column "type" script_types not null default 'primary'::script_types;

alter table "public"."scripts" alter column "name" set default ''::text;

alter table "public"."scripts" add column "upload_id" uuid;

create extension if not exists moddatetime schema extensions;

-- assuming the table name is "todos", and a timestamp column "updated_at"
-- this trigger will set the "updated_at" column to the current timestamp for every update
create trigger handle_updated_at before
update on scripts for each row when (old.upload_id is distinct from new.upload_id)
execute procedure moddatetime (updated_at);