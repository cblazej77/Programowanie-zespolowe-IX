import styled from "styled-components";
import { LinearGradient } from 'expo-linear-gradient';

//const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
    primary: "#F0EDEB",
    secondary: "#BEB5BC",
    darkLight: "#4A4E69",
    darkLight2: "#888cab",
    notificationsRed: "#DA7676",
    tertiary: "#000000AA",
    brand: "#000FFF",
    red: "#F00",
    black: "#1D1D1F",
    green: "#47D531",
    green2: "#3dc428",
    white: "#F5F5F5",
    grey: "#00000022",
    link: "#4159a3",
};

const {
    primary,
    secondary,
    tertiary,
    darkLight,
    brand,
    red,
    green,
    grey
} = Colors;

//text with custom font
export const AppText = styled.Text`
    fontFamily: 'LexendDeca-Regular';
`;

export const HeaderText = styled(AppText)`
    color: ${primary};
    fontSize: 26px;

    ${(props) => props.bold == true && `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`;

export const RegularText = styled(AppText)`
    color: ${darkLight};
    fontSize: 16px;

    ${(props) => props.bold == true && `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`;

export const StatsText = styled(AppText)`
    color: ${darkLight};
    fontSize: 18px;
    text-align: center;

    ${(props) => props.bold == true && `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`;

export const SmallText = styled(AppText)`
    color: ${darkLight};
    fontSize: 11px;

    ${(props) => props.bold == true && `
        fontFamily: 'LexendDeca-SemiBold';
    `}
`;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: 80px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    background-color: ${primary};
`;

export const WelcomeConteiner = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height = 50%;
    min-width = 100%;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};


    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width = 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${grey};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: #000000;
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 37px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 35px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;

    ${(props) => props.google == true && `
        flex-direction: row;
        justify-content: space-evenly;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;

    ${(props) => props.google == true && `
    padding-left: 20px;
`}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${props => props.type == 'SUCCESS' ? green : red}
`;

export const Line = styled.View`
    height: 1px;
    width = 100%;
    background-color: ${secondary};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${darkLight};
    font-size: 15px;
`;

export const ChatLabel = styled.View`
    background-color: ${darkLight};
    width: 100%;
    height: 50px;
    flexDirection: row;
    alignItems: center;
`;

export const ChatImage = styled.Image`
    flex: 1;
    resizeMode: contain;
    tintColor: ${primary};
`;

export const ChatText = styled.Text`
    color: ${primary};
    fontSize: 25px;
    flex: 1;
`;

export const ChatIconButton = styled.TouchableOpacity`
    height: 50%;
    flex: 1;
`;

export const ChatMessages = styled.FlatList`
    background-color: ${secondary};
`;

export const HomeLabel = styled.View`
    background-color: ${primary};
    width: 100%;
    height: 45px;
    flexDirection: row;
    alignItems: center;
    padding: 1px;
`;

export const HomeIconButton = styled.TouchableOpacity`
    flex: 0.3;
    width: 40%;
`;

export const HomeTextInput = styled.TextInput`
    flex: 1;
    height: 50%;
    borderRadius: 30px;
    paddingLeft: 10px;
    fontSize: 14px;
    marginRight: 10px;
    marginLeft: 5px;
`;

export const LinearGradientStyle = styled(LinearGradient)`
    marginVertical: 5px;
    borderRadius: 5px;
    paddingVertical: 15px;
`;
