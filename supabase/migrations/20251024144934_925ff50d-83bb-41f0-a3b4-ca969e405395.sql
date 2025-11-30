-- First check and drop if exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'items_posted_by_fkey' 
        AND table_name = 'items'
    ) THEN
        ALTER TABLE public.items DROP CONSTRAINT items_posted_by_fkey;
    END IF;
END $$;

-- Add foreign key relationship between items.posted_by and profiles.id
ALTER TABLE public.items
ADD CONSTRAINT items_posted_by_fkey
FOREIGN KEY (posted_by)
REFERENCES public.profiles(id)
ON DELETE CASCADE;