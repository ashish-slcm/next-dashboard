import { Breadcrumbs } from '@/components/breadcrumbs';
import ProfileCreateForm from '../profile-create-form';
import PageContainer from '@/components/layout/page-container';
import Profile from '../profile';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Profile', link: '/dashboard/profile' }
];
export default function ProfileViewPage() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        {/* <ProfileCreateForm categories={[]} initialData={null} /> */}
        <Profile />
      </div>
    </PageContainer>
  );
}
