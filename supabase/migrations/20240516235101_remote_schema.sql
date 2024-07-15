create policy "Allow unauthenticated users access to scripts vuzwg8_0"
on "storage"."objects"
as permissive
for select
to anon
using ((bucket_id = 'scripts'::text));


create policy "Allow unauthenticated users access to scripts vuzwg8_1"
on "storage"."objects"
as permissive
for insert
to anon
with check ((bucket_id = 'scripts'::text));


create policy "Allow unauthenticated users access to scripts vuzwg8_2"
on "storage"."objects"
as permissive
for update
to anon
using ((bucket_id = 'scripts'::text));



