import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import React from 'react';

export const metadata = {
  title: 'Dashboard : Admin View'
};

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Admin', link: '/dashboard/admin' }
];

export default function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">Admin Page</div>
      </div>
    </PageContainer>
  );
}
