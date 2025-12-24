export default function Refund() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Refund Policy</h1>
        <p className="mt-6 text-xl leading-8">Last Updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-10 max-w-2xl">
          <p>We want you to be satisfied with your purchases on 94mercato. If you are not happy with a product, you may be eligible for a refund under the following conditions:</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">1. Eligibility for Refunds</h2>
          <p className="mt-6">To be eligible for a refund, you must request it within [number] days of your purchase. The product must be in its original condition and packaging.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. How to Request a Refund</h2>
          <p className="mt-6">To request a refund, please contact us at support@mercato94.com with your order details and the reason for your request. We will review your request and notify you of our decision.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">3. Non-Refundable Items</h2>
          <p className="mt-6">Certain items are not eligible for refunds, including:</p>
          <ul className="mt-8 max-w-xl space-y-8 text-gray-600 list-disc pl-8">
            <li>Digital products that have been downloaded or accessed.</li>
            <li>Custom-made or personalized items.</li>
            <li>Items damaged due to misuse or neglect.</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">4. Processing Refunds</h2>
          <p className="mt-6">If your refund request is approved, we will process the refund to your original method of payment within [number] business days.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">If you have any questions about our Refund Policy, please contact us at support@mercato94.com.</p>
        </div>
      </div>
    </div>
  )
}