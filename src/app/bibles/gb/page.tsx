import { redirect } from 'next/navigation';

export default function BiblesGbPage() {
  // Redirect to the main Bibles page
  redirect('/bibles');

  // This will never be rendered because of the redirect
  return null;
}
