-- Demo auth users for Princeton-Blairstown Center (local development only).
-- Password: bcrypt hash of DEMO_USER_PASSWORD — see .env.local (never commit plaintext).

DO $$
DECLARE
  v_instance_id uuid := '00000000-0000-0000-0000-000000000000';
  v_org_id uuid := 'aaaaaaaa-0001-0001-0001-000000000001';
  v_pw text := '$2a$10$8lJGLfaqg6fO6VmzIqxipenrYzc9Q.C9jnKIRwuzY/gj0MPa885XK';
  rec record;
BEGIN
  FOR rec IN
    SELECT *
    FROM (
      VALUES
        (
          'bbbbbbbb-0001-0001-0001-000000000001'::uuid,
          'sage@sanwalabs.ai',
          'Sage Admin',
          'admin'::public.app_role
        ),
        (
          'bbbbbbbb-0001-0001-0001-000000000002'::uuid,
          'program_manager@sanwalabs.ai',
          'Program Manager Demo',
          'program_manager'::public.app_role
        ),
        (
          'bbbbbbbb-0001-0001-0001-000000000003'::uuid,
          'site_lead@sanwalabs.ai',
          'Site Lead Demo',
          'site_lead'::public.app_role
        ),
        (
          'bbbbbbbb-0001-0001-0001-000000000004'::uuid,
          'facilitator@sanwalabs.ai',
          'Facilitator Demo',
          'facilitator'::public.app_role
        ),
        (
          'bbbbbbbb-0001-0001-0001-000000000005'::uuid,
          'school_partner@sanwalabs.ai',
          'School Partner Demo',
          'school_partner'::public.app_role
        )
    ) AS users (id, email, full_name, role)
  LOOP
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      v_instance_id,
      rec.id,
      'authenticated',
      'authenticated',
      rec.email,
      v_pw,
      now(),
      '',
      '',
      '',
      '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('full_name', rec.full_name),
      now(),
      now()
    );

    INSERT INTO auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      rec.id,
      rec.id,
      rec.id::text,
      jsonb_build_object('sub', rec.id::text, 'email', rec.email),
      'email',
      now(),
      now(),
      now()
    );

    INSERT INTO public.profiles (id, organization_id, role, full_name, email)
    VALUES (rec.id, v_org_id, rec.role, rec.full_name, rec.email);
  END LOOP;
END $$;

UPDATE public.sites
SET site_lead_id = 'bbbbbbbb-0001-0001-0001-000000000003'
WHERE id = 'aaaaaaaa-0002-0001-0001-000000000001';
