import { Link } from "wouter";

export default function AdminQuotes() {
  return (
    <div className="min-h-screen font-body bg-neutral text-darkText">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quote Request Admin</h1>
            <Link href="/" className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-lg">
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-heading font-bold mb-6">Quote Requests</h2>

        <div className="bg-white p-6 rounded-lg shadow space-y-3">
          <p className="text-lg">
            This project no longer stores quote requests in a database.
          </p>
          <p className="text-sm text-muted-foreground">
            Submissions are forwarded to n8n and can be viewed in your n8n execution logs.
          </p>
          <p className="text-sm">
            If you want an admin view again later, we can either read from n8n (via an API you expose) or add a lightweight storage option.
          </p>
        </div>
      </main>
    </div>
  );
}