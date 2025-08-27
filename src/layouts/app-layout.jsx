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
        Made by Sarthak the Great
      </div>
    </div>
  )
}

export default AppLayout