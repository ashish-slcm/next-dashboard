'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

export default function UserCreateForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
    active: 1,
    camera_Master_Id: ''
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      name === 'active' || name === 'camera_Master_Id'
        ? parseInt(value)
        : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await res.json();

    if (res.ok) {
      toast({
        title: '✅ User created successfully!'
      });
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        mobile: '',
        role: '',
        active: 1,
        camera_Master_Id: ''
      });
    } else {
      toast({
        variant: 'destructive',
        title: '❌ Error',
        description: `${result.error}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl space-y-4 rounded-lg border p-6 shadow-md"
    >
      <h2 className="text-2xl font-semibold">Create New User</h2>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="mobile">Mobile</Label>
        <Input
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="camera_Master_Id">Camera Master ID</Label>
        <Input
          id="camera_Master_Id"
          name="camera_Master_Id"
          type="number"
          inputMode="numeric"
          className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={formData.camera_Master_Id ?? ''}
          onChange={handleChange}
          min={0}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="active">Active</Label>
        <Input
          id="active"
          name="active"
          type="number"
          value={formData.active}
          onChange={handleChange}
          className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          max={10}
          min={0}
          required
        />
      </div>

      <Button type="submit">Create</Button>
    </form>
  );
}
