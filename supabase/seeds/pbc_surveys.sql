-- Survey templates for partner schools.

INSERT INTO public.survey_templates (
  id,
  organization_id,
  school_id,
  name,
  program_type,
  age_group,
  question_count,
  reuse_count,
  last_used_at,
  content
) VALUES
  (
    '77777777-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'aaaaaaaa-0003-0001-0001-000000000001',
    'Middle School Outdoor Leadership Reflection',
    'Outdoor leadership',
    '11-13',
    8,
    12,
    CURRENT_DATE - 28,
    '{"theme":"leadership"}'::jsonb
  ),
  (
    '77777777-0001-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'aaaaaaaa-0003-0001-0001-000000000002',
    'Partner School Teamwork Pulse',
    'Team building',
    '14-16',
    6,
    7,
    CURRENT_DATE - 5,
    '{"theme":"teamwork"}'::jsonb
  );

-- Approved survey for school partner read-only demo access.
INSERT INTO public.surveys (
  id,
  organization_id,
  survey_template_id,
  school_id,
  program_id,
  name,
  status,
  approved_for_partner_access
) VALUES
  (
    '77777777-0002-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    '77777777-0001-0001-0001-000000000001',
    'aaaaaaaa-0003-0001-0001-000000000001',
    'dddddddd-0001-0001-0001-000000000002',
    'Princeton Middle School — Spring Session Feedback',
    'published',
    true
  );
