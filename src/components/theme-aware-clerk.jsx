import { ClerkProvider } from '@clerk/clerk-react'
import { shadesOfPurple, light } from '@clerk/themes'
import { useTheme } from './theme-provider'

const ThemeAwareClerkProvider = ({ children, publishableKey }) => {
  const { theme } = useTheme()
  
  // Determine which theme to use based on current theme
  const getClerkTheme = () => {
    // If theme is 'system', check system preference
    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return systemDark ? shadesOfPurple : light
    }
    
    // Use explicit theme
    return theme === 'dark' ? shadesOfPurple : light
  }

  return (
    <ClerkProvider 
      appearance={{
        baseTheme: getClerkTheme(),
        elements: {
          // Additional custom styling for better integration
          userButtonAvatarBox: "w-10 h-10",
          userButtonPopoverCard: "shadow-lg border border-gray-200 dark:border-gray-700",
          userButtonPopoverActions: "bg-white dark:bg-gray-800",
          userButtonPopoverActionButton: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
          userButtonPopoverFooter: "bg-gray-50 dark:bg-gray-800"
        },
        variables: {
          colorPrimary: theme === 'dark' ? '#8b5cf6' : '#3b82f6',
          colorBackground: theme === 'dark' ? '#1f2937' : '#ffffff',
          colorText: theme === 'dark' ? '#f3f4f6' : '#1f2937',
        }
      }}
      publishableKey={publishableKey}
    >
      {children}
    </ClerkProvider>
  )
}

export default ThemeAwareClerkProvider
