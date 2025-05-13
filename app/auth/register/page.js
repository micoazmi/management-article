'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/lib/api'; 
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'ADMIN'], { errorMap: () => ({ message: 'Please select a role' }) }),
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.post('/register', formData);
      alert('Registration successful!');
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow">

        <div className="flex justify-center mb-6">
          <img src="/logoipsum.svg" alt="Logo" className="h-8" />
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    
          <div>
            <label className="block text-sm font-medium">Username</label>
            <Input placeholder="Input username" {...register('username')} />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>

  
          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input type="password" placeholder="Input password" {...register('password')} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

 
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              {...register('role')}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Select Role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
          </div>

  
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>

   
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
