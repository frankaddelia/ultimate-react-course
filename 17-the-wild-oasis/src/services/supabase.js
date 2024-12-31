import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://tuffmlaxogiwwjctxhzz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1ZmZtbGF4b2dpd3dqY3R4aHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NTkwOTcsImV4cCI6MjA1MTIzNTA5N30.shlJQ-Kbo8ndHv3LNa_eEz42w3uR_eRBYEsbXn2OjoE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
