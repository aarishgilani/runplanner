export default function Footer() {
    return (
        <footer className="bg-primary pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-6 mb-4">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
                <p className="text-sm border-t border-gray-700 pt-4 mt-4">
                    &copy; 2024 runplanner.fit. All rights reserved. <span className="block sm:inline mt-1 sm:mt-0">Built for the running community.</span>
                </p>
            </div>
        </footer>
    );
}
