import * as Font from 'expo-font';  
import { useState, useEffect } from 'react';  

const useFonts =  (): boolean => {  
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);  

  useEffect(() => {  
    const loadFonts = async () => {  
        try {  
            await Font.loadAsync({  
                'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'), 
                'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'), 
                'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'), 
                'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'), 
                'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'), 
                'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'), 
              });  
            setFontsLoaded(true);  
          } catch (error) {  
            console.warn(error);  
          }  
        };  
   
    loadFonts();  
  }, []);  

  return fontsLoaded;  
};  

export default useFonts;