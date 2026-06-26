-- AI suggestion log entries.

INSERT INTO public.ai_suggestion_logs (
  id,
  organization_id,
  kind,
  prompt,
  output,
  status,
  age_group,
  program_type,
  created_by,
  created_at
) VALUES
  (
    '66666666-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'survey',
    'Middle school outdoor leadership reflection — confidence, safety comfort, inclusion',
    'Draft survey with reflection prompts on leadership confidence, safety comfort, teamwork, and facilitator feedback for ages 11–13.',
    'saved',
    '11-13',
    'Outdoor leadership',
    'bbbbbbbb-0001-0001-0001-000000000001',
    (CURRENT_DATE - 12)::timestamptz
  ),
  (
    '66666666-0001-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'activity',
    'Rainy-day team building for ages 10–12, low-risk, Challenge Course indoor alternatives',
    'Indoor knot circle, silent lineup challenge, and collaborative shelter-design prompts suitable for Challenge Course indoor space.',
    'draft',
    '10-12',
    'Team building',
    'bbbbbbbb-0001-0001-0001-000000000002',
    (CURRENT_DATE - 5)::timestamptz
  ),
  (
    '66666666-0001-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'survey',
    'Post-expedition reflection for Blair Academy partner cohort',
    'Five-question reflection on teamwork, resilience, and transfer back to school community.',
    'saved',
    '14-16',
    'Expedition',
    'bbbbbbbb-0001-0001-0001-000000000001',
    (CURRENT_DATE - 2)::timestamptz
  );
