import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export const testSetup = async () => {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('users').select('id').limit(1);
    if (error) throw error;

    // Test Instagram API connection (if token exists)
    const { data: platformData } = await supabase
      .from('platforms')
      .select('access_token')
      .eq('platform_name', 'instagram')
      .single();

    if (platformData?.access_token) {
      const response = await fetch('https://graph.instagram.com/me?fields=id,username&access_token=' + platformData.access_token);
      if (!response.ok) throw new Error('Instagram API connection failed');
    }

    toast.success('All systems operational! 🚀', {
      description: 'Database and API connections are working correctly.'
    });
  } catch (error) {
    console.error('Test setup error:', error);
    toast.error('Setup check failed', {
      description: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}; 