import Link from "next/link";
import { ChevronLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy | Recipo",
  description: "Privacy Policy for Recipo - Learn how we protect your information"
};

export default function PrivacyPolicy() {
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
            <Shield className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>
          
          <div className="prose dark:prose-invert prose-amber max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <h2>Introduction</h2>
            <p>
              At Recipo, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, such as your name, email address, and password. We may also collect information about your interactions with our website, including the recipes you view, save, or create.
            </p>
            
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Personalize your experience</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
            
            <h2>Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our website. This helps us provide you with a good experience when you browse our website and allows us to improve our site.
            </p>
            
            <h2>Information Sharing</h2>
            <p>
              We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with:
            </p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>As required by law or to protect rights and interests</li>
              <li>In connection with a business transaction such as a merger or acquisition</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </p>
            
            <h2>Your Choices</h2>
            <p>
              You can access, update, or delete your account information at any time by logging into your account settings. You can also opt out of receiving promotional emails by following the instructions in those emails.
            </p>
            
            <h2>Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the change becoming effective.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@recipo.com" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">privacy@recipo.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 