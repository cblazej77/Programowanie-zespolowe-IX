import { Text, View } from 'react-native';
import {
    HomeBottomContainer,
    HomeMiddleContainer,
    HomePage,
    HomeSearchContainer,
    HomeSearchTextInput,
    HomeTitleText,
    HomeUpperContainer,
    
} from './../components/styles';
const Home = () => {

    return (
        <HomePage>
            <HomeUpperContainer>
                <HomeTitleText>
                    Szukaj artystów
                </HomeTitleText>
            </HomeUpperContainer>
            <HomeMiddleContainer>
                <HomeSearchContainer>
                    <HomeSearchTextInput>
                    </HomeSearchTextInput>
                </HomeSearchContainer>
            </HomeMiddleContainer>
            <HomeBottomContainer>
            </HomeBottomContainer>
        </HomePage>
    );
}
export default Home;