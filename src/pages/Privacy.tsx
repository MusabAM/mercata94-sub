export default function Privacy() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-6 text-xl leading-8">Last Updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-10 max-w-2xl">
          <p>This Privacy Policy describes how 94mercato (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and discloses your personal information when you use our website, products, and services.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">1. Information We Collect</h2>
          <p className="mt-6">We may collect the following types of personal information from you:</p>
          <ul className="mt-8 max-w-xl space-y-8 text-gray-600 list-disc pl-8">
            <li>Contact information, such as your name, email address, and phone number.</li>
            <li>Demographic information, such as your age, gender, and location.</li>
            <li>Usage information, such as your IP address, browser type, and operating system.</li>
            <li>Information you provide to us, such as when you contact us for support or participate in surveys.</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. How We Use Your Information</h2>
          <p className="mt-6">We may use your personal information for the following purposes:</p>
          <ul className="mt-8 max-w-xl space-y-8 text-gray-600 list-disc pl-8">
            <li>To provide and improve our products and services.</li>
            <li>To personalize your experience on our platform.</li>
            <li>To communicate with you about our products, services, and promotions.</li>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>To protect the security and integrity of our platform.</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">3. Information Sharing and Disclosure</h2>
          <p className="mt-6">We may share your personal information with third-party service providers who assist us in operating our platform and providing our services. We may also disclose your information if required by law or to protect our rights or the rights of others.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">4. Data Security</h2>
          <p className="mt-6">We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">5. Your Choices</h2>
          <p className="mt-6">You may opt-out of receiving promotional communications from us by following the instructions in those communications. You may also access, update, or delete your personal information by contacting us.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">If you have any questions about this Privacy Policy, please contact us at support@mercato94.com.</p>
        </div>
      </div>
    </div>
  )
}