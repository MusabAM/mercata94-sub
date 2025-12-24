export default function Cookie() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cookie Policy</h1>
        <p className="mt-6 text-xl leading-8">Last Updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-10 max-w-2xl">
          <p>This Cookie Policy explains how 94mercato uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">1. What Are Cookies?</h2>
          <p className="mt-6">Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. How We Use Cookies</h2>
          <p className="mt-6">We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our platform.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">3. Your Choices Regarding Cookies</h2>
          <p className="mt-6">You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">4. Where to Find More Information About Cookies</h2>
          <p className="mt-6">You can learn more about cookies and the following third-party websites:</p>
          <ul className="mt-8 max-w-xl space-y-8 text-gray-600 list-disc pl-8">
            <li>AllAboutCookies: http://www.allaboutcookies.org/</li>
            <li>Network Advertising Initiative: http://www.networkadvertising.org/</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">If you have any questions about our use of cookies or other technologies, please email us at support@mercato94.com.</p>
        </div>
      </div>
    </div>
  )
}