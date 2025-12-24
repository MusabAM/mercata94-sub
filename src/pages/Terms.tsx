export default function Terms() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Service</h1>
        <p className="mt-6 text-xl leading-8">Last Updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-10 max-w-2xl">
          <p>Welcome to 94mercato! These Terms of Service (&quot;Terms&quot;) govern your use of our website, products, and services. By accessing or using our platform, you agree to be bound by these Terms.</p>
          
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">1. Account Registration</h2>
          <p className="mt-6">You may be required to create an account to access certain features of our platform. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. Prohibited Activities</h2>
          <p className="mt-6">You agree not to engage in any of the following prohibited activities:</p>
          <ul className="mt-8 max-w-xl space-y-8 text-gray-600 list-disc pl-8">
            <li>Violating any laws or regulations.</li>
            <li>Infringing upon the intellectual property rights of others.</li>
            <li>Distributing spam or other unsolicited communications.</li>
            <li>Engaging in any fraudulent or deceptive practices.</li>
            <li>Interfering with the operation of our platform.</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">3. Intellectual Property</h2>
          <p className="mt-6">All content on our platform, including text, graphics, logos, and software, is the property of 94mercato or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or distribute any content from our platform without our prior written permission.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">4. Limitation of Liability</h2>
          <p className="mt-6">To the fullest extent permitted by law, 94mercato shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of our platform.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">5. Governing Law</h2>
          <p className="mt-6">These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">If you have any questions about these Terms, please contact us at support@mercato94.com.</p>
        </div>
      </div>
    </div>
  )
}