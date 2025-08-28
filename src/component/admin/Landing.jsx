import { MdLocalLibrary } from "react-icons/md";
import TextType from "../animations/TextType";

function Landing() {
  return (
    <>
      <div className="w-full shadow-md border-b px-6 py-4 bg-white flex justify-between items-center sticky top-0 z-50 font-sans">
        <div className="flex items-center space-x-3">
          <MdLocalLibrary className="text-5xl text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Library System</h2>
            <p className="text-gray-500 text-sm">Empowering Knowledge Access</p>
          </div>
        </div>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
          onClick={() => (window.location.href = "/login")}
        >
          Sign In
        </button>
      </div>

      <div className="h-screen flex flex-col justify-center items-center text-center font-sans bg-gray-50">
        <TextType
          text="JK Library"
          className="text-6xl font-bold tracking-tight text-gray-900"
        />

        <h2 className="text-5xl font-semibold text-blue-600 mt-2">
          Management System
        </h2>

        <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-600">
          Manage your library smarter, faster, and easier with our modern and
          user-friendly platform.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
            onClick={() => window.location.href = "/login"}
          >
            Get Started
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      <div className="relative h-screen w-full">
        <img
          src="/banner.jpg" 
          alt="Library Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to JK Library
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl">
            Explore books, manage your library efficiently, and empower
            knowledge access for everyone.
          </p>
          <button
            className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
            onClick={() => (window.location.href = "/login")}
          >
            Explore Now
          </button>
        </div>
      </div>

      <div className="flex flex-col text-center justify-center items-center py-20 bg-white font-sans">
        <h1 className="text-4xl font-bold text-green-600">
          Everything You Need for Your Library
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl">
          Powerful tools designed for efficiency and simplicity.
        </p>

        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <Card
            icon={<MdLocalLibrary className="text-2xl" />}
            title="Complete Book Management"
            subtitle="Easily organize, categorize, and track your book collections."
          />
          <Card
            icon={<MdLocalLibrary className="text-2xl" />}
            title="Member Management"
            subtitle="Handle member registrations, profiles, and notifications seamlessly."
          />
          <Card
            icon={<MdLocalLibrary className="text-2xl" />}
            title="Borrow Management"
            subtitle="Track borrowings, due dates, and returns with automated alerts."
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-12 bg-gray-50 px-6 lg:px-16 py-20 font-sans">
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-600">
            Why Choose Our Library Management System?
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Designed for simplicity and efficiency, our LMS helps institutions
            and individuals manage resources smarter and faster.
          </p>
          <ul className="mt-6 space-y-3 text-gray-700 text-base">
            <li>✅ Real-time inventory tracking</li>
            <li>✅ Automated due-date notifications</li>
            <li>✅ Comprehensive analytics & reports</li>
            <li>✅ Advanced search capabilities</li>
            <li>✅ Customizable roles & permissions</li>
          </ul>
        </div>

        <div className="w-full lg:w-1/3 bg-white p-8 text-center rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-blue-600">500k+</h1>
          <p className="text-gray-600">Libraries Trust Us</p>
          <h1 className="text-3xl font-bold mt-4 text-green-600">99.9%</h1>
          <p className="text-gray-600 mt-1">Uptime Guaranteed</p>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-5 hover:bg-green-600 transition-colors font-medium"
            onClick={() => (window.location.href = "/login")}
          >
            Start Free Trial
          </button>
        </div>
      </div>

      <div className="text-center py-28 bg-gray-100 font-sans">
        <h1 className="text-4xl font-bold text-blue-600">
          Ready To Transform Your Library?
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Join hundreds of libraries that already made the switch.
        </p>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors font-medium"
          onClick={() => (window.location.href = "/login")}
        >
          Sign in to Continue
        </button>
        <p className="mt-6 text-gray-500 font-semibold">JK LMS</p>
        <p className="text-gray-400 font-medium">kushaladmin@library.com</p>
      </div>

      <footer className="bg-white py-4 mt-4 text-center font-medium text-gray-500 border-t">
        <p>© 2025 JK LMS. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Landing;

function Card({ icon, title, subtitle }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-transform w-80 text-left">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
    </div>
  );
}
