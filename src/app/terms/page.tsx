import Link from "next/link";
import { ChevronLeft, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service | Recipo",
  description: "Terms of Service for Recipo - Our rules and guidelines for using the platform"
};

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-gray-800"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <ScrollText className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>
          
          <div className="prose dark:prose-invert prose-amber max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <h2>Introduction</h2>
            <p>
              Welcome to Recipo! These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Recipo website and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
            
            <h2>Using Recipo</h2>
            <p>
              You may use our services only as permitted by these Terms and any applicable laws. You may not misuse our services.
            </p>
            
            <h2>Your Account</h2>
            <p>
              To use certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2>User Content</h2>
            <p>
              Our services may allow you to upload, submit, store, send, or receive content such as recipes, photos, or comments ("User Content"). You retain ownership rights in your User Content. By submitting User Content, you grant Recipo a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, and distribute such content for the purposes of operating and providing our services.
            </p>
            
            <h2>Prohibited Activities</h2>
            <p>When using our services, you agree not to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Upload or share content that is illegal, harmful, threatening, abusive, or defamatory</li>
              <li>Attempt to gain unauthorized access to any part of our services</li>
              <li>Use our services to distribute unsolicited commercial communications</li>
              <li>Interfere with or disrupt our services</li>
            </ul>
            
            <h2>Termination</h2>
            <p>
              We may suspend or terminate your access to our services if you violate these Terms or if we reasonably believe that you have misused our services. You may also stop using our services at any time.
            </p>
            
            <h2>Intellectual Property</h2>
            <p>
              The Recipo name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Recipo or its affiliates. You must not use such marks without our prior written permission.
            </p>
            
            <h2>Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" without any warranties, either express or implied. We do not warrant that our services will be uninterrupted, timely, secure, or error-free.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Recipo shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>
            
            <h2>Changes to These Terms</h2>
            <p>
              We may modify these Terms from time to time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the change becoming effective. Your continued use of our services after such modifications will constitute your acknowledgment and agreement to the modified Terms.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Recipo is established, without regard to its conflict of law provisions.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:eslamdev@outlook.de" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">eslamdev@outlook.de</a>
            </p>
            
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link href="/privacy" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                View our Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 