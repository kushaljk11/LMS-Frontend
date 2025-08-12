import { MdLocalLibrary } from "react-icons/md";
import TextType from "../animations/TextType";

function Landing() {
  return (
    <>
      <div className="main w-full shadow-md border-r px-6 py-4 bg-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="content">
            <MdLocalLibrary className="text-5xl text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Library System</h2>
            <p className="text-gray-600">JK ko ho</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-black transition-colors" onClick={() => {window.location.href = '/login'}}>
            Sign In
          </button>
        </div>
      </div>

      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="text-center mb-8">
          <TextType
            text={["JK Library"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
          <h1 className="text-5xl font-semibold text-slate-700">
            Management System
          </h1>
          <p className="text-blue-900 mt-1">
            Streamline your library operations with my comprehensive, secure and
            very user friendly management system.
          </p>
        </div>
        <div>
          <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors" onClick={() => {window.location.href = '/login'}}>
            Get Started
          </button>
        </div>
      </div>

      {/* card */}
      <div className="flex flex-col text-center justify-center items-center mt-24 mb-24">
        <div>
          <h1 className="text-4xl font-bold mt-12 text-blue-600">
            Everything that you need for your library
          </h1>
          <p className="text-blue-900 mt-2">
            Our platform offers a wide range of features to manage your library
            effectively.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <Card
            icon={<MdLocalLibrary className="text-3xl text-blue-500" />}
            title="Complete Book Management"
            subtitle="Manage all aspects of your library's book collection."
          />
          <Card
            icon={<MdLocalLibrary className="text-3xl text-blue-500" />}
            title="Member Management"
            subtitle="Comprehensive member management features. with registration, profiles and tracking  with automated notifications."
          />
          <Card
            icon={<MdLocalLibrary className="text-3xl text-blue-500" />}
            title="Borrow Management"
            subtitle="Manage all aspects of your library's book borrowing process and tracking the books with different due dates."
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-8 mt-8 bg-gray-100 px-4 lg:px-0">
        <div className="w-full lg:w-1/3 p-6 mt-12 lg:mt-24 mb-12 lg:mb-24">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium mt-4 text-blue-600">
            Why choose our Library
          </h1>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-blue-600">
            Management System?
          </h1>
          <p className="mt-2">
            Our LMS is designed to make learning smarter, faster, and more
            engaging. With a clean, intuitive interface and powerful features,
            we help institutions, businesses, and individuals create, manage,
            and deliver courses with ease.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-sm sm:text-base">
              ✅ Real time inventory tracking
            </span>
            <span className="text-sm sm:text-base">
              ✅ Automated notifications for due dates
            </span>
            <span className="text-sm sm:text-base">
              ✅ Comprehensive reporting and analytics
            </span>
            <span className="text-sm sm:text-base">
              ✅ Advanced search capabilities
            </span>
            <span className="text-sm sm:text-base">
              ✅ Customizable user roles and permissions
            </span>
          </div>
        </div>

        <div className="w-1/5 h-1/2 bg-white p-6  mt-52 text-center rounded-lg">
          <h1 className="text-2xl font-bold text-blue-800">500k</h1>
          <p>Libraries Trust Us</p>
          <h1 className="text-2xl font-bold mt-2 text-blue-950">99.9%</h1>
          <p className="mt-2">Uptime Guaranteed</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2" onClick={() => {window.location.href = '/login'}}>
            Start Free Trial
          </button>
        </div>
      </div>

      <div className="text-center mt-36 mb-36">
        <h1 className="text-4xl font-bold text-blue-600">Ready To Transform Your Library?</h1>
        <p className="text-blue-900 mt-2">
          Join where hundreds of libraries have already made the switch.
        </p>
        <button className="bg-black  text-white px-4 py-2 rounded-xl mt-2" onClick={() => {window.location.href = '/login'}}>
          Sign in to continue
        </button>
        <p className="mt-2 text-gray-500 font-semibold">JK LMS</p>
        <p className="text-gray-500 font-semibold">kushaladmin@library.com</p>
      </div>

      <footer className="bg-gray-200 py-4 mt-4 text-center font-semibold">
        <p>© 2025 JK LMS. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Landing;

function Card({ icon, title, subtitle }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 w-80">
      <div className="flex items-center justify-between mb-4">{icon}</div>
      <div className="space-y-1">
        <h3 className="text-sm text-left font-medium text-gray-700">{title}</h3>
        <div className="text-sm text-gray-500 break-words text-left">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
