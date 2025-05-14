import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { QuoteRequest } from "@shared/schema";

export default function AdminQuotes() {
  // Fetch quote requests
  const { data: quotes, isLoading, error } = useQuery<{ success: boolean, data: QuoteRequest[] }>({
    queryKey: ['/api/quotes'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-primary mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xl">Loading quote requests...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-lg">
          <h2 className="font-bold text-lg mb-2">Error Loading Quote Requests</h2>
          <p>{(error as Error).message || "Failed to load quote requests"}</p>
          <div className="mt-4">
            <Link href="/" className="text-primary hover:underline">Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

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
        
        {quotes && quotes.data && quotes.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">City</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {quotes.data.map((quote) => (
                  <tr key={quote.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{quote.id}</td>
                    <td className="py-3 px-4">{quote.name}</td>
                    <td className="py-3 px-4">{quote.email}</td>
                    <td className="py-3 px-4">{quote.city}</td>
                    <td className="py-3 px-4">{quote.phone}</td>
                    <td className="py-3 px-4">{quote.service || 'Not specified'}</td>
                    <td className="py-3 px-4">
                      {new Date(quote.createdAt).toLocaleDateString()} {new Date(quote.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-xl">No quote requests found.</p>
          </div>
        )}
      </main>
    </div>
  );
}