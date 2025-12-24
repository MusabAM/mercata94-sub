
import { Link } from "react-router-dom";

export default function LegalPage() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Legal Guidelines</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            94Mercato is an online digital marketplace operated by Outbrix LLC, a company registered in the State of Wyoming, United States. By accessing or using this website, you agree to comply with and be bound by the following legal guidelines.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                1. General Information
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  94Mercato provides a digital platform that allows users to browse, list, buy, and sell goods or services offered by third parties. 94Mercato does not manufacture, own, or directly sell third-party products or services unless explicitly stated.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                2. Eligibility
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  By using this website, you confirm that you are at least 18 years old or the legal age in your jurisdiction and that you have the legal capacity to enter into binding agreements.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                3. User Responsibilities
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Users agree to use the platform lawfully and responsibly. Any activity involving fraud, misuse, infringement, or violation of applicable laws may result in suspension or termination of access.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                4. Marketplace Transactions
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  All transactions conducted through 94Mercato are agreements solely between buyers and sellers. 94Mercato and Outbrix LLC are not parties to these transactions and do not guarantee the quality, legality, safety, or delivery of any products or services.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                5. Payments & Third-Party Services
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Payments and related services may be processed by third-party providers. 94Mercato is not responsible for errors, delays, or disputes arising from third-party services.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                6. Intellectual Property
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  All content on this website, including text, graphics, logos, design elements, and software, is the property of Outbrix LLC or its licensors and is protected by applicable intellectual property laws. Unauthorized use is prohibited.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                7. Limitation of Liability
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  To the fullest extent permitted by law, 94Mercato and Outbrix LLC shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or its services.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                8. No Professional Advice
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Information provided on this website is for general informational purposes only and does not constitute legal, financial, or professional advice.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                9. Privacy
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Use of 94Mercato is also governed by applicable privacy practices regarding the collection and use of information.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                10. Modifications
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  94Mercato reserves the right to modify these legal guidelines at any time. Continued use of the website constitutes acceptance of any changes.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                11. Governing Law
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  These legal guidelines are governed by and interpreted in accordance with the laws of the State of Wyoming, United States.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                12. Contact
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  For legal inquiries, please contact Outbrix LLC at Outbrixllc@zohomail.com.
                  For support-related inquiries, please contact <Link to="mailto:support@94Mercato.com" className="text-indigo-600 hover:text-indigo-500">support@94Mercato.com</Link>.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
