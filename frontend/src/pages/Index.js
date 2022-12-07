import TextToGif from "../components/TextToGif";
import Footer from "../components/Footer";

import { useAuthContext } from "../hooks/useAuthContext";

//Main page
function Index() {
  
  const {user} = useAuthContext()

  return (
    <div className="Index">
      {user && (
        <div>
          <TextToGif />
          <Footer />
        </div>
      )}
      {!user && (
        <div className="welcoming-message">
          <h1>Welcome!</h1>
          <h3>Please login to start using the app</h3>
        </div>
      )}
    </div>
  );
}

export default Index;
