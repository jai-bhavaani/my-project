import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { AuthLayout } from './components/AuthLayout';
import { VisualColumn } from './components/VisualColumn';
import { LoginForm } from './components/LoginForm';
import { AppShell } from './components/dashboard/AppShell';
import { ResourceMarketplace } from './components/marketplace/ResourceMarketplace';
import { StandaloneUploadPage } from './components/upload/StandaloneUploadPage';
import { UploadStatus } from './components/upload-status/UploadStatus';
import { AdminDashboard } from './components/admin/AdminDashboard';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'admin'>('student');
  const [currentView, setCurrentView] = useState<'marketplace' | 'upload' | 'admin'>('marketplace');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkUserRole(session.user.id);
      } else {
        setIsInitializing(false);
      }
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        checkUserRole(session.user.id);
      } else {
        setIsInitializing(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (data && data.role === 'admin') {
        setUserRole('admin');
      } else {
        setUserRole('student');
      }
    } catch (err) {
      console.error('Error fetching role:', err);
      setUserRole('student');
    } finally {
      setIsInitializing(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const renderContent = () => {
    switch (currentView) {
      case 'marketplace': return <ResourceMarketplace />;
      case 'upload': return <StandaloneUploadPage />;
      case 'admin': return <UploadStatus />;
      default: return <ResourceMarketplace />;
    }
  };

  if (isInitializing) {
    return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading application...</div>;
  }

  return (
    <>
      {!session ? (
        <AuthLayout
          visualColumn={<VisualColumn />}
          formColumn={
            <div style={{ width: '100%' }}>
              <LoginForm onLoginSuccess={() => { /* Subscription handles state change */ }} />

              <div style={{ marginTop: '2rem', textAlign: 'center', backgroundColor: '#F3F4F6', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.875rem', color: '#4B5563', fontWeight: 'bold' }}>Testing Admin Portal?</p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  Create an account above, then go to your Supabase Dashboard &rarr; Table Editor &rarr; `profiles` table and change your role from `student` to `admin`. Refresh the page to see the Admin Tools.
                </p>
              </div>
            </div>
          }
        />
      ) : userRole === 'student' ? (
        <>
          <AppShell
            onLogout={handleLogout}
            onNavigate={(view) => setCurrentView(view)}
            currentView={currentView}
          >
            {renderContent()}
          </AppShell>
        </>
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
