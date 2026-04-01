-- Add moderation fields to cases table
ALTER TABLE cases
  ADD COLUMN moderation_status text NOT NULL DEFAULT 'pending_review',
  ADD COLUMN moderation_comment text NULL;

ALTER TABLE cases
  ADD CONSTRAINT cases_moderation_status_check
  CHECK (moderation_status IN ('pending_review', 'needs_changes', 'published', 'unpublished'));

-- Migrate existing data based on is_published flag
UPDATE cases SET moderation_status = 'published'      WHERE is_published = true;
UPDATE cases SET moderation_status = 'pending_review' WHERE is_published = false;
