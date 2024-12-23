import { getCurrentUser } from '@/actions/user';
import React from 'react';

type Props = {
}

const Page = async (props: Props) => {
  try {
    const user = await getCurrentUser();
    return <div>Page</div>;
  } catch (error: unknown) {
    console.error('Error fetching user:', error instanceof Error ? error.message : 'Unknown error');
    return <div>Error loading page. Please try again later.</div>;
  }
};

export default Page;