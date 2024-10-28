import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "LeetCode Tracker by Vansh Chaurasiya",
  description: "Track's my LeetCode progress with my heatmap feature. Analyzes daily coding activities, lists problems solved, and understands your learning patterns. Join me on this journey of improvement and mastery in algorithm challenges.",
  keywords: "LeetCode tracker, heatmap, coding progress, algorithm challenges, daily coding activity, Vansh Chaurasiya, problem solving, programming, software development, Vansh Chaurasiya github, vansh-codes, vansh codes, leetcode tracking, leetcode progress, leetcode heatmap, leetcode problems, leetcode solutions, leetcode patterns, leetcode mastery, leetcode improvement, leetcode journey, leetcode learning, leetcode algorithm, leetcode challenges, leetcode solutions, leetcode problems, leetcode patterns, leetcode mastery, leetcode improvement, leetcode journey, leetcode learning, leetcode algorithm, leetcode challenges",
  author: "Vansh Chaurasiya",
  robots: "index, follow",
  og: {
    title: "LeetCode Tracker by Vansh Chaurasiya",
    description: "Track's my LeetCode progress with my heatmap feature. Click on any day's box to see your pushes and problems solved.",
    type: "website",
  },
  icon: {
    href: "/favicon.jpeg",
    type: "image/x-icon",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.jpeg" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 to-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
