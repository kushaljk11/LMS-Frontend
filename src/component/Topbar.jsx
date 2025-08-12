import { MdLocalLibrary } from "react-icons/md";
import LogoutButton from "../utils/Logout";

export default function Topbar() {
  const basecss = "cursor-pointer text-2xl text-blue-500";

  return (
    <div className="w-full shadow-md border-r px-6 py-4 bg-gray-100 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-3 rounded-xl text-white">
          <MdLocalLibrary className="text-2xl" />
        </div>
        <div>
          <p className="font-semibold leading-none">Library System</p>
          <p className="text-gray-600 text-sm leading-none">
            Management Portal
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <LogoutButton className={basecss} />
      </div>
    </div>
  );
}
