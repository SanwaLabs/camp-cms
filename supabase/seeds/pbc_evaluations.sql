-- Evaluations and rubric scores.

INSERT INTO public.evaluations (
  id,
  organization_id,
  staff_profile_id,
  evaluator_id,
  session_id,
  submitted_at,
  score,
  summary,
  coaching_notes
) VALUES
  (
    '11111111-0002-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'cccccccc-0001-0001-0001-000000000001',
    'bbbbbbbb-0001-0001-0001-000000000003',
    'eeeeeeee-0001-0001-0001-000000000002',
    (CURRENT_DATE - 90)::timestamptz,
    4.10,
    'Solid facilitation fundamentals. Room to grow on session transitions.',
    NULL
  ),
  (
    '11111111-0002-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'cccccccc-0001-0001-0001-000000000001',
    'bbbbbbbb-0001-0001-0001-000000000003',
    'eeeeeeee-0001-0001-0001-000000000001',
    (CURRENT_DATE - 45)::timestamptz,
    4.40,
    'Improved group management during outdoor modules.',
    NULL
  ),
  (
    '11111111-0002-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'cccccccc-0001-0001-0001-000000000001',
    'bbbbbbbb-0001-0001-0001-000000000002',
    'eeeeeeee-0001-0001-0001-000000000006',
    (CURRENT_DATE - 7)::timestamptz,
    4.70,
    'Excellent group management and strong adaptation when weather changed.',
    NULL
  ),
  (
    '11111111-0002-0001-0001-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'cccccccc-0001-0001-0001-000000000002',
    'bbbbbbbb-0001-0001-0001-000000000001',
    'eeeeeeee-0001-0001-0001-000000000003',
    (CURRENT_DATE - 3)::timestamptz,
    4.20,
    'Positive rapport with campers. Needs checklist reinforcement before field sessions.',
    'Schedule shadow session on challenge course equipment checks.'
  ),
  (
    '11111111-0002-0001-0001-000000000005',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'cccccccc-0001-0001-0001-000000000004',
    'bbbbbbbb-0001-0001-0001-000000000003',
    'eeeeeeee-0001-0001-0001-000000000004',
    (CURRENT_DATE - 14)::timestamptz,
    4.80,
    'Outstanding lakefront session leadership and inclusive group culture.',
    NULL
  );

INSERT INTO public.evaluation_scores (evaluation_id, category, score) VALUES
  ('11111111-0002-0001-0001-000000000001', 'safety', 4),
  ('11111111-0002-0001-0001-000000000001', 'engagement', 4),
  ('11111111-0002-0001-0001-000000000001', 'preparedness', 4),
  ('11111111-0002-0001-0001-000000000001', 'inclusion', 4),
  ('11111111-0002-0001-0001-000000000002', 'safety', 4),
  ('11111111-0002-0001-0001-000000000002', 'engagement', 5),
  ('11111111-0002-0001-0001-000000000002', 'preparedness', 4),
  ('11111111-0002-0001-0001-000000000002', 'inclusion', 5),
  ('11111111-0002-0001-0001-000000000003', 'safety', 5),
  ('11111111-0002-0001-0001-000000000003', 'engagement', 5),
  ('11111111-0002-0001-0001-000000000003', 'preparedness', 4),
  ('11111111-0002-0001-0001-000000000003', 'inclusion', 5),
  ('11111111-0002-0001-0001-000000000004', 'safety', 4),
  ('11111111-0002-0001-0001-000000000004', 'engagement', 4),
  ('11111111-0002-0001-0001-000000000004', 'preparedness', 4),
  ('11111111-0002-0001-0001-000000000004', 'inclusion', 5),
  ('11111111-0002-0001-0001-000000000005', 'safety', 5),
  ('11111111-0002-0001-0001-000000000005', 'engagement', 5),
  ('11111111-0002-0001-0001-000000000005', 'preparedness', 5),
  ('11111111-0002-0001-0001-000000000005', 'inclusion', 5);
