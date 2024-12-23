import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { Suspense } from 'react'


const NewPasswordPage = () => {
  return (
    <Suspense>
    <NewPasswordForm />
    </Suspense>
  )
}

export default NewPasswordPage;