 
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import StoreProvider from "@/components/storeProvider";
export const metadata = {
  title: "Pramply",
  description: "Home Page",
};
 
export default function RootLayout({ children }) {
  
  return   <StoreProvider customChildren={children} />
}
