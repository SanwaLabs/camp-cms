-- Programs and date-relative sessions for past / present / future demo tabs.

INSERT INTO public.programs (
  id,
  organization_id,
  name,
  program_type,
  status,
  starts_on,
  ends_on,
  notes
) VALUES
  (
    'dddddddd-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'Summer Leadership',
    'summer_camp',
    'active',
    CURRENT_DATE - 21,
    CURRENT_DATE + 120,
    'Multi-week summer leadership program with rotating outdoor themes.'
  ),
  (
    'dddddddd-0001-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'School-Year Outdoor Ed',
    'school_program',
    'active',
    CURRENT_DATE - 95,
    CURRENT_DATE + 180,
    'Partner school day and overnight outdoor education sessions.'
  ),
  (
    'dddddddd-0001-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'Weekend Retreats',
    'retreat',
    'active',
    CURRENT_DATE - 30,
    CURRENT_DATE + 150,
    'Weekend cohort retreats for schools and alumni groups.'
  ),
  (
    'dddddddd-0001-0001-0001-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'Alumni Expedition',
    'expedition',
    'planned',
    CURRENT_DATE + 42,
    CURRENT_DATE + 365,
    'Multi-day alumni expeditions and field-based learning.'
  );

INSERT INTO public.sessions (
  id,
  organization_id,
  program_id,
  site_id,
  name,
  starts_at,
  ends_at,
  capacity
) VALUES
  -- Past (5)
  (
    'eeeeeeee-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000002',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Spring Outdoor Ed Week',
    (CURRENT_DATE - 21)::timestamptz,
    (CURRENT_DATE - 14)::timestamptz,
    48
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Leadership Week 1',
    (CURRENT_DATE - 14)::timestamptz,
    (CURRENT_DATE - 7)::timestamptz,
    48
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000003',
    'aaaaaaaa-0002-0001-0001-000000000002',
    'Memorial Weekend Retreat',
    (CURRENT_DATE - 33)::timestamptz,
    (CURRENT_DATE - 30)::timestamptz,
    36
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000002',
    'aaaaaaaa-0002-0001-0001-000000000003',
    'Lakefront Ecology Day',
    (CURRENT_DATE - 3)::timestamptz,
    (CURRENT_DATE - 1)::timestamptz,
    32
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000005',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000004',
    'aaaaaaaa-0002-0001-0001-000000000002',
    'Alumni Challenge Preview',
    (CURRENT_DATE - 95)::timestamptz,
    (CURRENT_DATE - 90)::timestamptz,
    24
  ),
  -- Present (5)
  (
    'eeeeeeee-0001-0001-0001-000000000006',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Leadership Week 3 (Active)',
    (CURRENT_DATE - 3)::timestamptz,
    (CURRENT_DATE + 4)::timestamptz,
    48
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000007',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000002',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'July Session A',
    (CURRENT_DATE + 14)::timestamptz,
    (CURRENT_DATE + 18)::timestamptz,
    32
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000008',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000004',
    'aaaaaaaa-0002-0001-0001-000000000003',
    'August Overnight Session',
    (CURRENT_DATE + 42)::timestamptz,
    (CURRENT_DATE + 46)::timestamptz,
    36
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000009',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000003',
    'aaaaaaaa-0002-0001-0001-000000000002',
    'Fall Partner Retreat',
    (CURRENT_DATE + interval '3 months'),
    (CURRENT_DATE + interval '3 months' + interval '4 days'),
    24
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000010',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000002',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'November School Residency',
    (CURRENT_DATE + interval '5 months'),
    (CURRENT_DATE + interval '5 months' + interval '4 days'),
    32
  ),
  -- Future (5)
  (
    'eeeeeeee-0001-0001-0001-000000000011',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Summer 2027 Kickoff',
    (CURRENT_DATE + interval '7 months'),
    (CURRENT_DATE + interval '7 months' + interval '6 days'),
    48
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000012',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000004',
    'aaaaaaaa-0002-0001-0001-000000000002',
    'Spring 2027 Expedition',
    (CURRENT_DATE + interval '9 months'),
    (CURRENT_DATE + interval '9 months' + interval '5 days'),
    24
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000013',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000002',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Winter 2027 Outdoor Ed',
    (CURRENT_DATE + interval '8 months'),
    (CURRENT_DATE + interval '8 months' + interval '4 days'),
    32
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000014',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000003',
    'aaaaaaaa-0002-0001-0001-000000000003',
    'New Year Alumni Overnight',
    (CURRENT_DATE + 198)::timestamptz,
    (CURRENT_DATE + 201)::timestamptz,
    36
  ),
  (
    'eeeeeeee-0001-0001-0001-000000000015',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000001',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Early 2027 Leadership Session',
    (CURRENT_DATE + interval '10 months'),
    (CURRENT_DATE + interval '10 months' + interval '6 days'),
    48
  );
