import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export default function Logout({modal, setModal}) {
    const cancelButtonRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {logout, setError} = useAuth();

    async function handleLogout() {
        try {
            setError("");
            setLoading(true);
            await logout();
            navigate("/login");
        } catch {
            setError("Failed to logout");
        }
        setLoading(false);

    }

    return (
        <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white dark:bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div
                        className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-200 sm:mx-0 sm:h-10 sm:w-10">
                        {/*<ExclamationIcon*/}
                        {/*    className="h-6 w-6 text-red-600"*/}
                        {/*    aria-hidden="true"*/}
                        {/*/>*/}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                            className="text-lg leading-6 font-medium text-gray-500 dark:text-gray-400"
                        >
                            Logging out
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to log out ?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                  rounded-md border border-gray-300 bg-white text-gray-500 text-base font-medium hover:bg-gray-100 focus:outline-none focus:ring-gray-200 focus:ring-2 focus:ring-offset-2 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600
                  "
                    onClick={() => setModal(false)}
                    ref={cancelButtonRef}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
