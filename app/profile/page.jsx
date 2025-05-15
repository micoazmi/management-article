'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../footer/footer';
import api from '@/lib/api';
import Navbar2 from '../navbar/navbar2';
import { User } from 'lucide-react';

export default function MyAccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data;
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar with blue background override */}
        <Navbar2 user={user} setUser={setUser} />

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
        <User className="w-24 h-24  rounded-full bg-gray-200 p-1 text-gray-600" />
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <label className="text-sm font-medium text-gray-700">
            <input
              type="text"
              value={ "Username : "+user?.username || ''}
              readOnly
              className="mt-1 w-full px-3 py-2 border rounded text-gray-700"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            <input
              type="text"
              value={"Role : "+user?.role || ''}
              readOnly
              className="mt-1 w-full px-3 py-2 border rounded text-gray-700 capitalize"
            />
          </label>
        </div>

        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm"
        >
          Back to Home
        </button>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
