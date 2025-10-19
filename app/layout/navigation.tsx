import SiteIcon from "./site-icon";


export default function Navigation() {
    return (
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            {/* Logo/Name */}
            <a href="#" className="flex items-center space-x-2">
                <SiteIcon className="w-8 h-8" />
                <span className="text-xl font-extrabold text-primary">RUNPLANNER<span className="font-normal text-secondary">.FIT</span></span>
            </a>
                
            {/* Quick Link CTA */}
            <a href="#tool" className="px-4 py-2 text-sm font-semibold rounded-full text-white bg-secondary hover:bg-opacity-90 hidden sm:inline-block shadow-lg">
                Get Started
            </a>
        </nav>
    );
}