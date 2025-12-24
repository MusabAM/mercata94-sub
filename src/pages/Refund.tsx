export default function Refund() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Refund Policy</h1>
        <p className="mt-6 text-xl leading-8">Last Updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-10 max-w-2xl">
          <p>Due to the digital nature of our products, which are available for immediate download upon purchase, we generally do not offer refunds. Once a product has been purchased and downloaded, it cannot be "returned."</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">1. When a Refund May Be Granted</h2>
          <p className="mt-6">We believe in our products and strive for customer satisfaction. We will grant refunds under the following circumstances:</p>
          <ul className="mt-8 max-w-xl space-y-4 text-gray-600 list-disc pl-8">
            <li><strong>Technical Issues:</strong> If a digital file is corrupt and we are unable to provide you with a working version within 48 hours.</li>
            <li><strong>Incorrect Product:</strong> If you received a different product than the one you purchased.</li>
            <li><strong>Misleading Description:</strong> If the product was materially not as described in the product listing.</li>
          </ul>
          <p className="mt-6">We do not issue refunds for reasons such as changing your mind, not having the correct software to open the file (when specified in the description), or if you bought the item by mistake (unless it's an accidental duplicate purchase).</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. How to Request a Refund</h2>
          <p className="mt-6">To request a refund, please contact our support team at support@mercato94.com within 14 days of your purchase. Please include your order number, a description of the issue, and any relevant screenshots. Our team will review your request and get back to you.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">For Customers in the EU & UK</h2>
          <p className="mt-6">By purchasing a digital product from our store, you consent to its immediate download and delivery, and you acknowledge that you thereby waive your 14-day right of withdrawal.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">Your satisfaction is important to us. If you have any issues or questions, please don't hesitate to reach out to us at support@mercato94.com before requesting a refund. We are here to help.</p>
        </div>
      </div>
    </div>
  )
}
