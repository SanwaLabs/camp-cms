-- Princeton-Blairstown Center organization, schools, and sites.

INSERT INTO public.organizations (id, name, slug)
VALUES (
  'aaaaaaaa-0001-0001-0001-000000000001',
  'Princeton-Blairstown Center',
  'princeton-blairstown-center'
);

INSERT INTO public.schools (id, organization_id, name, contact_name, contact_email) VALUES
  (
    'aaaaaaaa-0003-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'Princeton Middle School',
    'Dr. Elena Morris',
    'emorris@princeton.k12.nj.us'
  ),
  (
    'aaaaaaaa-0003-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'Blair Academy Partner Program',
    'Chris Whitfield',
    'cwhitfield@blair.edu'
  );

INSERT INTO public.sites (id, organization_id, name, address, notes) VALUES
  (
    'aaaaaaaa-0002-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'Main Campus (Blairstown)',
    '600 Blairstown Rd, Blairstown, NJ',
    'Primary outdoor education site.'
  ),
  (
    'aaaaaaaa-0002-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'Challenge Course',
    '600 Blairstown Rd, Blairstown, NJ',
    'Ropes and low-elements programming area.'
  ),
  (
    'aaaaaaaa-0002-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'Lakefront',
    '600 Blairstown Rd, Blairstown, NJ',
    'Waterfront and canoe programming.'
  );
