'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  mobile: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const getUserProfile = async () => {
    const res = await fetch(`/api/profile`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.user;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const avatar = session?.user?.image;

      if (status === 'authenticated') {
        try {
          setLoading(true);
          const data = await getUserProfile();
          data.avatar = avatar;
          setProfile(data);
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (session) {
      fetchUser();
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>User not found</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-foreground">
      <h2 className="mb-6 text-lg font-semibold">Profile details</h2>

      <div className="flex items-center justify-between border-b py-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>
              {(profile.name ?? 'NA')
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{profile.name}</span>
        </div>
      </div>

      <div className="border-b py-4">
        <div className="mb-2 font-medium">Email address</div>
        <div>{profile.email}</div>
      </div>

      <div className="border-b py-4">
        <div className="mb-2 font-medium">Phone number</div>
        <div>{profile.mobile}</div>
      </div>
    </div>
  );
}
