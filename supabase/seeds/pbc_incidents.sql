-- Incidents, staff links, and follow-up tasks.

INSERT INTO public.incidents (
  id,
  organization_id,
  site_id,
  title,
  severity,
  status,
  occurred_at,
  description,
  reported_by,
  closed_at
) VALUES
  (
    'ffffffff-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Camper allergy response — epinephrine administered',
    'high',
    'in_review',
    (CURRENT_DATE - 2)::timestamptz + time '14:20',
    'Staff followed allergy protocol and administered epinephrine. Camper stabilized. Parent notification pending final manager sign-off.',
    'bbbbbbbb-0001-0001-0001-000000000003',
    NULL
  ),
  (
    'ffffffff-0001-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0001-0001-000000000002',
    'Challenge course harness pre-check gap',
    'medium',
    'open',
    (CURRENT_DATE - 1)::timestamptz + time '18:10',
    'Climbing equipment was returned without full checklist confirmation. Harness batch held pending re-inspection.',
    'bbbbbbbb-0001-0001-0001-000000000002',
    NULL
  ),
  (
    'ffffffff-0001-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0001-0001-000000000003',
    'Lakefront dock slip — no injury',
    'low',
    'closed',
    (CURRENT_DATE - 10)::timestamptz + time '11:45',
    'Camper slipped on wet dock during transition. No injury. Incident documented and closed after parent notification.',
    'bbbbbbbb-0001-0001-0001-000000000003',
    (CURRENT_DATE - 8)::timestamptz
  ),
  (
    'ffffffff-0001-0001-0001-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Bus arrival 45 min late — communication gap',
    'medium',
    'open',
    (CURRENT_DATE - 4)::timestamptz + time '08:30',
    'Partner school bus arrived 45 minutes late. School contact was not notified until arrival. Review communication protocol with logistics team.',
    'bbbbbbbb-0001-0001-0001-000000000002',
    NULL
  );

INSERT INTO public.incident_staff (incident_id, staff_profile_id) VALUES
  ('ffffffff-0001-0001-0001-000000000001', 'cccccccc-0001-0001-0001-000000000001'),
  ('ffffffff-0001-0001-0001-000000000001', 'cccccccc-0001-0001-0001-000000000003'),
  ('ffffffff-0001-0001-0001-000000000002', 'cccccccc-0001-0001-0001-000000000002'),
  ('ffffffff-0001-0001-0001-000000000003', 'cccccccc-0001-0001-0001-000000000004'),
  ('ffffffff-0001-0001-0001-000000000004', 'cccccccc-0001-0001-0001-000000000007');

INSERT INTO public.follow_up_tasks (
  id,
  organization_id,
  incident_id,
  owner_profile_id,
  owner_name,
  title,
  status,
  due_at
) VALUES
  (
    '88888888-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'ffffffff-0001-0001-0001-000000000001',
    'bbbbbbbb-0001-0001-0001-000000000003',
    'Alex Kim',
    'Complete parent follow-up call and sign-off',
    'open',
    CURRENT_DATE - 1
  ),
  (
    '88888888-0001-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'ffffffff-0001-0001-0001-000000000002',
    'bbbbbbbb-0001-0001-0001-000000000002',
    'Program Manager Demo',
    'Re-inspect harness batch and update equipment log',
    'open',
    CURRENT_DATE + 3
  ),
  (
    '88888888-0001-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'ffffffff-0001-0001-0001-000000000004',
    NULL,
    'Taylor Brooks',
    'Draft revised bus communication protocol',
    'open',
    CURRENT_DATE + 5
  );
