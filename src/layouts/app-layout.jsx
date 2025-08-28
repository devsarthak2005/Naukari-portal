import Header from "@/components/header"
import AnimatedBackground from "@/components/animated-background"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div> 
      <AnimatedBackground />
      <div className="grid-background">
       </div>
       <main className="min-h-screen container relative z-10">
        <Header />
        <Outlet />
      </main>
     
       <div className="p-10 text-center bg-gray-800 mt-10 relative z-10">
         <footer className="text-white space-y-6">
           {/* Main Footer Content */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
             
             {/* Company Info */}
             <div className="space-y-3">
               <h3 className="text-xl font-bold text-white">EaseApply</h3>
               <p className="text-gray-300 text-sm">
                 Your gateway to finding the perfect job or the ideal candidate. 
                 Connecting talent with opportunity.
               </p>
               <div className="flex items-center gap-2">
                 <img src="/logo.png" className="h-8 w-8" alt="EaseApply" />
                 <span className="text-sm font-medium">Made by Sarthak Borse the Great</span>
               </div>
             </div>

             {/* Quick Links */}
             <div className="space-y-3">
               <h3 className="text-lg font-semibold text-white">Quick Links</h3>
               <ul className="space-y-2 text-sm text-gray-300">
                 <li><a href="/jobs" className="hover:text-white transition-colors">Browse Jobs</a></li>
                 <li><a href="/post-job" className="hover:text-white transition-colors">Post a Job</a></li>
                 <li><a href="/my-jobs" className="hover:text-white transition-colors">My Jobs</a></li>
                 <li><a href="/saved-jobs" className="hover:text-white transition-colors">Saved Jobs</a></li>
               </ul>
             </div>

             {/* Contact Info */}
             <div className="space-y-3">
               <h3 className="text-lg font-semibold text-white">Contact Us</h3>
               <div className="space-y-2 text-sm text-gray-300">
                 <p>📧 Contact: <a href="mailto:borsesarthak33@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">borsesarthak33@gmail.com</a></p>
                 <p>📞 Phone: <span className="text-white font-medium">+91 9302755266</span></p>
                 <p>🌐 Support: Available 24/7</p>
                 <p>📍 Location: India</p>
               </div>
             </div>
           </div>

           {/* Divider */}
           <div className="border-t border-gray-600"></div>

           {/* Bottom Footer */}
           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
             <div className="flex items-center gap-4">
               <span>© 2025 EaseApply. All Rights Reserved.</span>
               <span>|</span>
               <span>Crafted with ❤️ by Sarthak Borse</span>
             </div>
             <div className="flex items-center gap-4">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <span>|</span>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               <span>|</span>
               <a href="mailto:borsesarthak33@gmail.com" className="hover:text-white transition-colors">Support</a>
             </div>
           </div>
         </footer>
       </div>
    </div>
  )
}

export default AppLayout