-- Staff profiles and certifications for PBC demo roster.

INSERT INTO public.staff_profiles (
  id,
  organization_id,
  profile_id,
  site_id,
  full_name,
  role,
  status,
  email,
  phone,
  background_check_status,
  sick_leave_days,
  notes
) VALUES
  (
    'cccccccc-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    NULL,
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Jordan Ellis',
    'Lead Facilitator',
    'active',
    'jordan.ellis@pbc-demo.org',
    '(555) 010-4211',
    'clear',
    2,
    'Strong with middle-school groups. CPR renewal due soon.'
  ),
  (
    'cccccccc-0001-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    NULL,
    'aaaaaaaa-0002-0001-0001-000000000002',
    'Morgan Reyes',
    'Facilitator',
    'seasonal',
    'morgan.reyes@pbc-demo.org',
    '(555) 010-8920',
    'pending',
    0,
    'Needs final background check before overnight sessions.'
  ),
  (
    'cccccccc-0001-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'bbbbbbbb-0001-0001-0001-000000000003',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Alex Kim',
    'Site Lead',
    'active',
    'site_lead@sanwalabs.ai',
    '(555) 010-1198',
    'clear',
    1,
    'Site lead for Main Campus. Best reviewer for complex incident debriefs.'
  ),
  (
    'cccccccc-0001-0001-0001-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000001',
    NULL,
    'aaaaaaaa-0002-0001-0001-000000000003',
    'Sam Ortiz',
    'Facilitator',
    'active',
    'sam.ortiz@pbc-demo.org',
    '(555) 010-3344',
    'clear',
    1,
    'Lakefront programming specialist with strong evaluation scores.'
  ),
  (
    'cccccccc-0001-0001-0001-000000000005',
    'aaaaaaaa-0001-0001-0001-000000000001',
    NULL,
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Riley Chen',
    'Lead Facilitator',
    'active',
    'riley.chen@pbc-demo.org',
    '(555) 010-7788',
    'clear',
    0,
    'Crisis Prevention certification expired — schedule renewal immediately.'
  ),
  (
    'cccccccc-0001-0001-0001-000000000006',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'bbbbbbbb-0001-0001-0001-000000000004',
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Jamie Park',
    'Facilitator',
    'seasonal',
    'facilitator@sanwalabs.ai',
    '(555) 010-5566',
    'clear',
    0,
    'Seasonal facilitator linked to demo login account.'
  ),
  (
    'cccccccc-0001-0001-0001-000000000007',
    'aaaaaaaa-0001-0001-0001-000000000001',
    NULL,
    'aaaaaaaa-0002-0001-0001-000000000001',
    'Taylor Brooks',
    'Program Coordinator',
    'active',
    'taylor.brooks@pbc-demo.org',
    '(555) 010-9900',
    'clear',
    3,
    'Coordinates school partner logistics and session scheduling.'
  );

INSERT INTO public.certifications (
  id,
  staff_profile_id,
  name,
  expires_at,
  status
) VALUES
  (
    '99999999-0001-0001-0001-000000000001',
    'cccccccc-0001-0001-0001-000000000001',
    'CPR / First Aid',
    CURRENT_DATE + 18,
    'expiring'
  ),
  (
    '99999999-0001-0001-0001-000000000002',
    'cccccccc-0001-0001-0001-000000000001',
    'Mandated Reporter',
    CURRENT_DATE + 200,
    'current'
  ),
  (
    '99999999-0001-0001-0001-000000000003',
    'cccccccc-0001-0001-0001-000000000002',
    'Water Safety',
    CURRENT_DATE + 120,
    'current'
  ),
  (
    '99999999-0001-0001-0001-000000000004',
    'cccccccc-0001-0001-0001-000000000003',
    'Crisis Prevention',
    CURRENT_DATE + 90,
    'current'
  ),
  (
    '99999999-0001-0001-0001-000000000005',
    'cccccccc-0001-0001-0001-000000000004',
    'Water Safety Instructor',
    CURRENT_DATE + 180,
    'current'
  ),
  (
    '99999999-0001-0001-0001-000000000006',
    'cccccccc-0001-0001-0001-000000000005',
    'Crisis Prevention',
    CURRENT_DATE - 5,
    'expired'
  ),
  (
    '99999999-0001-0001-0001-000000000007',
    'cccccccc-0001-0001-0001-000000000005',
    'CPR / First Aid',
    CURRENT_DATE + 60,
    'current'
  ),
  (
    '99999999-0001-0001-0001-000000000008',
    'cccccccc-0001-0001-0001-000000000006',
    'CPR / First Aid',
    CURRENT_DATE + 300,
    'current'
  );
