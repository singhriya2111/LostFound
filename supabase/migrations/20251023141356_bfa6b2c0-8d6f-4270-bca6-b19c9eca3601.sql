-- Allow anyone to view profiles for contact purposes
-- This is needed so users can see who posted lost/found items
CREATE POLICY "Anyone can view profiles for posted items"
ON public.profiles
FOR SELECT
USING (true);