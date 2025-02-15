"use client"

import { NextPage } from "next"
import Link from "next/link"

const ErrorBoundary: NextPage<IErrorBoundary> = ({ error, reset }) => {
  console.log(error)

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      Please try again, or contact our customer support team if this issue persists.
      <Link href="/">
        <>Return home</>
      </Link>
      <div
        onClick={reset}
        className=""
      >
        Retry
      </div>
    </div>
  )
}

export default ErrorBoundary
