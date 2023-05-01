import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, RegularText, StatsText, AppText, Avatar, Bubble, Line, RegularTextInput, AppTextInput, ModalBubble, } from './styles';
import Stars from 'react-native-stars';
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store';
import {default as baseURL} from "./AxiosAuth";
import axios from "axios";
import Loading from './Loading';
import Hyperlink from 'react-native-hyperlink';
import { Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';

const { darkLight, link, black, primary } = Colors;


const generateBoxShadowStyle = (  
    xOffset,  
    yOffset,  
    shadowColorIos,  
    shadowOpacity,  
    shadowRadius,  
    elevation,  
    shadowColorAndroid,  
  ) => {  
    if (Platform.OS === 'ios') {  
      styles.boxShadow = {  
        shadowColor: shadowColorIos,  
  shadowOpacity,  
        shadowRadius,  
        shadowOffset: {width: xOffset, height: yOffset},  
       
      };  
    } else if (Platform.OS === 'android') {  
      styles.boxShadow = {   elevation,  
        shadowColor: shadowColorAndroid,  
      };  
    } };  



async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (!result) {
      alert("Nie uzyskano danych z klucza: " + key);
    }
    return result;
  }
  
 const ProfileEditing = ({ navigation }) => {

    generateBoxShadowStyle(0,8,'#0F0F0F33',0.2,15,2,'#0F0F0F33');

    const [token, setToken] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [artistProfile, setArtistProfile] = useState('');
    const [toSendProfile, setToSendProfile] = useState('');
    const [availableTags, setAvailableTags] = useState('');
    //Hook'a for temp values when editing
    const [bio, setBio] = useState('');
    const [level, setLevel] = useState('');
    const [location, setLocation] = useState('');
    const [dribble, setDribble] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [pinterest, setPinterest] = useState('');
    const [twitter, setTwitter] = useState('');
    const [website, setWebsite] = useState('');
    const [educationList, setEducationList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);
    const [skills, setSkills] = useState([]);
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [tagModal, setTagModal] = useState(false);

    //funcions handling setState for temp values
    function handleAddEducationElement(id, school_name, faculty, field_of_study, degree, start_date, end_date, description) {
            setEducationList(educationList => [
                ...educationList,
                {
                    id: id,
                    school_name: school_name,
                    faculty: faculty,
                    field_of_study: field_of_study,
                    degree: degree,
                    start_date: start_date,
                    end_date: end_date,
                    description: description
                }
            ]);   
    }

    function handleChangeEducationElement(id, school_name, faculty, field_of_study, degree, start_date, end_date, description) {
        setEducationList(
            educationList.map(e => {
                if(e.id === id) {
                    e.school_name = school_name;
                    e.faculty = faculty;
                    e.field_of_study = field_of_study;
                    e.degree = degree;
                    e.start_date = start_date;
                    e.end_date = end_date;
                    e.description = description;
                }
                return e;
            })
        );
    }

    function handleDeleteEducationElement(id) {
        setEducationList(
            educationList.filter(e => e.id !== id)
        );
    }

    function handleAddExperienceElement(id, company, city, position, description, start_date, end_date) {
        setExperienceList(experienceList => [
            ...experienceList,
            {
                id: id,
                company: company,
                city: city,
                position: position,
                description: description,
                start_date: start_date,
                end_date: end_date
            }
        ]);
    }

    function handleChangeExperienceElement(id, company, city, position, description, start_date, end_date) {
        setExperienceList(
            experienceList.map(e => {
                if(e.id === id) {
                    e.company = company;
                    e.city = city;
                    e.position = position;
                    e.start_date = start_date;
                    e.end_date = end_date;
                    e.description = description;
                }
                return e;
            })
        );
    }

    function handleDeleteExperienceElement(id) {
        setExperienceList(
            experienceList.filter(e => e.id !== id)
        );
    }

    function handleAddSkill(skill) {
        setSkills(skills => [
            ...skills,
            skill
        ]);
    }

    function handleDeleteSkill(skill) {
        setSkills(
            skills.filter(s => s !== skill)
        );
    }

    function handleAddTag(tag) {
        setTags(tags => [
            ...tags,
            tag
        ]);
    }

    function handleDeleteTag(tag) {
        setTags(
            tags.filter(t => t !== tag)
        );
    }

    function handleAddLanguage(language) {
        setLanguages(languages => [
            ...languages,
            language
        ]);
    }

    function handleDeleteLanguage(language) {
        setLanguages(
            languages.filter(l => l !== language)
        );
    }

    //funkcje czyszczace 
    function handleClearEducationList() {
        setEducationList([]);
    }

    function handleClearExperienceList() {
        setExperienceList([]);
    }

    function handleClearSkills() {
        setSkills([]);
    }

    function handleClearTags() {
        setTags([]);
    }

    function handleClearLanguages() {
        setLanguages([]);
    }

    function clear() {
        handleClearEducationList();
        handleClearExperienceList();
        handleClearLanguages();
        handleClearSkills();
        handleClearTags();
        setBio('');
        setLevel('');
        setLocation('');
        setDribble('');
        setFacebook('');
        setInstagram('');
        setTwitter('');
        setPinterest('');
        setWebsite('');
        setLinkedin('');
    }

    function addTag() {
        const list = availableTags.filter(item => {
            if(!tags.includes(item)) return item;
        })

        return <SelectDropdown>

        </SelectDropdown>
    }

    async function getAccessToken() {
        const t = await getValueFor("accessToken");
        setToken(t);
        console.log(t);
    }

    async function getUserInfo() {
        const u = await getValueFor("user");
        setUserInfo(JSON.parse(u));
        console.log(u);
    }

    async function updateArtistProfile() {
        const response = await axios.put( baseURL + '/api/artist/updateArtistProfile',{ 'bio': 'Siema to ja micha\u0142', 'level': 'Mid', 'location': 'Warszawa', 'skills': [ 'Maskotka' ], 'tags': [ 'Fotografia' ], 'languages': [ 'Polski' ], 'education': [ { 'school_name': 'UMK', 'faculty': 'STEM', 'field_of_study': 'IT', 'degree': 'master', 'start_date': '01/2001', 'end_date': '03/2004', 'description': 'string' } ], 'experience': [ { 'company': 'UMK', 'city': 'Trou\u0144', 'position': 'Programmer', 'description': 'programming programs', 'start_date': '06/2004', 'end_date': '01/2007' } ], 'website': 'string', 'facebook': 'string', 'linkedin': 'string', 'instagram': 'string', 'dribble': 'string', 'pinterest': 'string', 'twitter': 'string' }, { params: { 'username': 'MiMichu' }, headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } } );

        // console.log("STARE TOSENDPROFILE: " + JSON.stringify(toSendProfile));
        // toSendProfile.bio = bio;
        // toSendProfile.level = level;
        // toSendProfile.skills = skills;
        // toSendProfile.tags = tags;
        // toSendProfile.languages = languages;
        // toSendProfile.facebook = facebook;
        // toSendProfile.instagram = instagram;
        // toSendProfile.dribble = dribble;
        // toSendProfile.pinterest = pinterest;
        // toSendProfile.twitter = twitter;
        // toSendProfile.linkedin = linkedin;
        // toSendProfile.website = website;
        // toSendProfile.location = location;
        // educationList.map(item => {
        //     delete item.id;
        // })
        // experienceList.map(item => {
        //     delete item.id;
        // })
        // toSendProfile.education = educationList;
        // toSendProfile.experience = experienceList;
        // console.log("NOWE TOSENDPROFILE: " + JSON.stringify(toSendProfile));
        // let data = JSON.stringify({toSendProfile});
          
        // const url = baseURL + '/api/artist/updateArtistProfile?username=' + userInfo.username;
        // try {
        //     const response = await axios.put(url,
        //         data,
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //         }
        //     );
        //     console.log(response);
        // } catch (err) {
        //     console.log("Nie udalo sie wyslac update'u");
        //     if (!err?.response) {
        //         console.log('Brak odpowiedzi serwera');
        //         console.log(err)
        //     } else if (err.response?.status === 409) {
        //         console.log(err)
        //     } else {
        //         console.log('Błąd: ');
        //         console.log(err);
        //     }
        // }
    }

    function getIdOfLastEducationElement() {
        let l = educationList.length;
        if(l > 0) {
            return educationList.at(l-1).id;
        } else return -1;
    }

    function getIdOfLastExperienceElement() {
        let l = experienceList.length;
        if(l > 0) {
            return experienceList.at(l-1).id;
        } else return -1;
    }

    useEffect(() => {
        getAccessToken();
        getUserInfo();
      }, []);

    useEffect(() => {
        if(userInfo) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: baseURL + '/api/artist/getArtistProfile?username=' + userInfo.username,
                headers: { }
            };

            const fetchData = async () => {
            try{
                const result = await axios.request(config);
                console.log(result.data);
                setArtistProfile(result.data);
            } catch(error){
                console.log(error);
            }
            };
            
            fetchData();
        }
      }, [userInfo]);

      useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + '/api/artist/getAvailableTags',
            headers: { }
          };
          
          const fetchData = async () => {
            try{
                const result = await axios.request(config);
                console.log(result.data);
                setAvailableTags(result.data);
            } catch(error){
                console.log(error);
            }
            };
            
            fetchData();
      }, []);

      useEffect(() => {
        if(artistProfile) {
            setToSendProfile(artistProfile);
            setBio(artistProfile.bio);
            setLevel(artistProfile.level);
            setLocation(artistProfile.location);
            for(let i = 0; i < artistProfile.education.length; i++) {
                handleAddEducationElement(i, artistProfile.education[i].school_name, artistProfile.education[i].faculty,
                    artistProfile.education[i].field_of_study, artistProfile.education[i].degree, artistProfile.education[i].start_date,
                    artistProfile.education[i].end_date, artistProfile.education[i].description);
            }
            for(let i = 0; i < artistProfile.experience.length; i++) {
                handleAddExperienceElement(i, artistProfile.experience[i].company, artistProfile.experience[i].city,
                    artistProfile.experience[i].position, artistProfile.experience[i].description, artistProfile.experience[i].start_date,
                    artistProfile.experience[i].end_date);
            }
            for(let i = 0; i < artistProfile.skills.length; i++) {
                handleAddSkill(artistProfile.skills[i]);
            }
            for(let i = 0; i < artistProfile.tags.length; i++) {
                handleAddTag(artistProfile.tags[i]);
            }
            for(let i = 0; i < artistProfile.languages.length; i++) {
                handleAddLanguage(artistProfile.languages[i]);
            }
            setDribble(artistProfile.dribble);
            setFacebook(artistProfile.facebook);
            setInstagram(artistProfile.instagram);
            setLinkedin(artistProfile.linkedin);
            setPinterest(artistProfile.pinterest);
            setTwitter(artistProfile.twitter);
            setWebsite(artistProfile.website);
        }
      }, [artistProfile]);

    function ListEducation() {
        if(educationList){
        const list = educationList.map(item => { 
            return <View style={[styles.ListElement, {marginBottom: 10}]} key={item.id}>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Kierunek: "}</AppText>
                    <AppTextInput 
                        maxLength={50} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "82%"}}
                        defaultValue={item.faculty}
                        onChangeText={newText => {item.faculty = newText}}
                        placeholder="Wpisz kierunek"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Uczelnia: "}</AppText>
                    <AppTextInput 
                        maxLength={100} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "83%"}}
                        defaultValue={item.school_name}
                        onChangeText={newText => {item.school_name = newText}}
                        placeholder="Wpisz nazwę uczelni"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Dziedzina nauk: "}</AppText>
                    <AppTextInput 
                        maxLength={50} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "71%"}}
                        defaultValue={item.field_of_study}
                        onChangeText={newText => {item.field_of_study = newText}}
                        placeholder="Wpisz dziedzinę nauk"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Stopień: "}</AppText>
                    <AppTextInput 
                        maxLength={30} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "30%"}}
                        defaultValue={item.degree}
                        onChangeText={newText => {item.degree = newText}}
                        placeholder="Wpisz stopień"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Od: "}</AppText>
                    <AppTextInput 
                        maxLength={7} 
                        style={{flexWrap: "wrap", width: "20%"}}
                        defaultValue={item.start_date}
                        onChangeText={newText => {item.start_date = newText}}
                        placeholder="Wpisz datę rozpoczęcia w formacie MM/YYYY"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}> 
                    <AppText>{"Do: "}</AppText>
                    <AppTextInput 
                        maxLength={7} 
                        style={{flexWrap: "wrap", width: "20%"}}
                        defaultValue={item.end_date}
                        onChangeText={newText => {item.end_date = newText}}
                        placeholder="Wpisz datę rozpoczęcia w formacie MM/YYYY"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Opis: "}</AppText>
                    <AppTextInput 
                        maxLength={255} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "90%"}}
                        defaultValue={item.description}
                        onChangeText={newText => {item.description = newText}}
                        placeholder="Wpisz opis"    
                    />
                </View>
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={() => handleDeleteEducationElement(item.id)}>
                        <Bubble style={[{alignContent: "center", marginBottom: 3, marginTop: 3}, styles.boxShadow]}>
                            <AppText>Usuń</AppText>
                        </Bubble>
                    </TouchableOpacity>
                </View>
            </View> });
            return <>
                {list}
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {handleAddEducationElement(getIdOfLastEducationElement() + 1,"","","","","","","")}}>
                        <Bubble style={[{alignContent: "center", marginBottom: 3, marginTop: 3}, styles.boxShadow]}>
                            <AppText>Dodaj</AppText>
                        </Bubble>
                    </TouchableOpacity>
                </View>
            </>
        } else {
            return <View></View>
        }
    }

    function ListExperience() {
        if(experienceList){
        const list = experienceList.map(item => {
            return <View style={[styles.ListElement, {marginBottom: 10}]} key={item.id}>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Nazwa firmy: "}</AppText>
                    <AppTextInput 
                        maxLength={100} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "75%"}}
                        defaultValue={item.company}
                        onChangeText={newText => {item.company = newText}}
                        placeholder="Wpisz nazwę firmy"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Miasto: "}</AppText>
                    <AppTextInput 
                        maxLength={50} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "40%"}}
                        defaultValue={item.city}
                        onChangeText={newText => {item.city = newText}}
                        placeholder="Wpisz miasto"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Stanowisko: "}</AppText>
                    <AppTextInput 
                        maxLength={50} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "78%"}}
                        defaultValue={item.position}
                        onChangeText={newText => {item.position = newText}}
                        placeholder="Wpisz stanowisko"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Opis obowiązków: "}</AppText>
                    <AppTextInput 
                        maxLength={255} 
                        multiline={true}
                        style={{flexWrap: "wrap", width: "67.5%"}}
                        defaultValue={item.description}
                        onChangeText={newText => {item.description = newText}}
                        placeholder="Wpisz stanowisko"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Od: "}</AppText>
                    <AppTextInput 
                        maxLength={7}
                        style={{flexWrap: "wrap", width: "20%"}}
                        defaultValue={item.start_date}
                        onChangeText={newText => {item.start_date = newText}}
                        placeholder="Wpisz datę rozpoczęcia w formacie MM/YYYY"    
                    />
                </View>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}}>
                    <AppText>{"Do: "}</AppText>
                    <AppTextInput 
                        maxLength={7}
                        style={{flexWrap: "wrap", width: "20%"}}
                        defaultValue={item.end_date}
                        onChangeText={newText => {item.end_date = newText}}
                        placeholder="Wpisz datę rozpoczęcia w formacie MM/YYYY"    
                    />
                </View>
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={() => handleDeleteExperienceElement(item.id)}>
                        <Bubble style={[{alignContent: "center", marginBottom: 3, marginTop: 3}, styles.boxShadow]}>
                            <AppText>Usuń</AppText>
                        </Bubble>
                    </TouchableOpacity>
                </View>
            </View> });
            return <>
            {list}
            <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {handleAddExperienceElement(getIdOfLastExperienceElement() + 1,"","","","","","")}}>
                        <Bubble style={[{alignContent: "center", marginBottom: 3, marginTop: 3}, styles.boxShadow]}>
                            <AppText>Dodaj</AppText>
                        </Bubble>
                    </TouchableOpacity>
                </View></>
        } else {
            return <View></View>
        }
    }

    function ListSkills() {
        if(skills){
        const list = skills.map((item, id) => 
            <Bubble style={[{width: item.size, marginRight: 5, flexDirection: "row", alignItems: "center"},styles.boxShadow]} key={id}>
                <AppText>{item}</AppText>
                <TouchableOpacity onPress={() => handleDeleteSkill(item)}>
                    <Ionicons size={16} name={"close"} color="#A9A9A9" style={{marginTop: 3}}/>
                </TouchableOpacity>
            </Bubble>);
            return <>
            {list}
            <TouchableOpacity>
                <Bubble style={[{marginRight: 5, flexDirection: "row", alignItems: "center"},styles.boxShadow]}>
                    <Ionicons size={16} name={"add"} color="#A9A9A9" style={{marginTop: 3}}/>
                    <AppText>Dodaj</AppText>
                </Bubble>
            </TouchableOpacity>
            </>
        } else {
            return <View></View>
        }
    }

    function ListLanguages() {
        if(languages){
        const list = languages.map((item, id) => 
            <Bubble style={[{width: item.size, marginRight: 5, flexDirection: "row", alignItems: "center"},styles.boxShadow]} key={id}>
                <AppText>{item}</AppText>
                <TouchableOpacity onPress={() => handleDeleteLanguage(item)}>
                    <Ionicons size={16} name={"close"} color="#A9A9A9" style={{marginTop: 3}}/>
                </TouchableOpacity>
            </Bubble>);
            return <>
                {list}
                <TouchableOpacity>
                    <Bubble style={[{marginRight: 5, flexDirection: "row", alignItems: "center"},styles.boxShadow]}>
                        <Ionicons size={16} name={"add"} color="#A9A9A9" style={{marginTop: 3}}/>
                        <AppText>Dodaj</AppText>
                    </Bubble>
                </TouchableOpacity>
            </>
        } else {
            return <View></View>
        }
    }

    function ListTags() {
        if(tags){
        const list = tags.map((item, id) => 
            <Bubble style={[{width: item.size, marginRight: 5, flexDirection: "row", alignItems: "center"},styles.boxShadow]} key={id}  >
                <AppText style={{marginRight: 2}}>{item}</AppText>
                <TouchableOpacity onPress={() => handleDeleteTag(item)}>
                    <Ionicons size={16} name={"close"} color="#A9A9A9" style={{marginTop: 3}}/>
                </TouchableOpacity>
            </Bubble>);
            return <>
            {list}
            <TouchableOpacity onPress={() => addTag()}>
                <Bubble style={[{marginRight: 5, flexDirection: "row", alignItems: "center"},styles.boxShadow]}>
                    <Ionicons size={16} name={"add"} color="#A9A9A9" style={{marginTop: 3}}/>
                    <AppText>Dodaj</AppText>
                </Bubble>
            </TouchableOpacity>
            </>
        } else {
            return <View></View>
        }
    }

    function ListLinks() {
        if(artistProfile) {
            const links = [
                {id: 1, name: "Facebook:", data: facebook},
                {id: 2, name: "Instagram:", data: instagram},
                {id: 3, name: "LinkedIn:", data: linkedin},
                {id: 4, name: "Pinterest:", data: pinterest},
                {id: 5, name: "Twitter:", data: twitter},
                {id: 6, name: "Dribble:", data: dribble},
                {id: 7, name: "Twoja strona:", data: website},
                ];
            const list = links.map(item =>
                <View flexDirection="row" alignItems="center" style={{marginBottom: 10}} key={item.id}>
                    <AppText style={{width: "25%", alignContent: "flex-start", alignItems: "flex-start"}}>{item.name}</AppText>
                    <AppTextInput 
                        maxLength={100}
                        style={{flexWrap: "wrap", width: "70%"}}
                        defaultValue={item.data}
                        onChangeText={newText => {item.data = newText}}
                        placeholder="Wpisz adres"
                        autoComplete="off"
                        autoCorrect={false}
                    />
                </View>);
            return <View style={styles.ListElement}>{list}</View>
        } else {
            return <View></View>
        }
    }

    return (
        <>{artistProfile ? (
            <ScrollView nestedScrollEnabled={true} style={{ flex: 1}} height={300}>
            <View style={{ flexDirection: "row", margin: 15, justifyContent: "space-between" }}>
                <Avatar resizeMode="contain" source={require('../assets/img/avatar.png')}></Avatar>
                <View style={{ width: "65%", alignItems: "center", justifyContent: "space-around" }}>
                    <Stars
                        default={3.5}
                        spacing={7}
                        count={5}
                        starSize={30}
                        half={true}
                        disabled={true}
                        fullStar={require('../assets/img/star.png')}
                        halfStar={require('../assets/img/star-half.png')}
                        emptyStar={require('../assets/img/star-outline.png')}

                    />
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
                        <View>
                            <StatsText bold={true}>63</StatsText>
                            <StatsText>Prace</StatsText>
                        </View>
                        <View>
                            <StatsText bold={true}>205</StatsText>
                            <StatsText>Opinie</StatsText>
                        </View>
                        <View>
                            <StatsText bold={true}>3,5/5</StatsText>
                            <StatsText>Ocena</StatsText>
                        </View>
                    </View>
                </View>
            </View>
            <AppText style={styles.About}>O mnie:</AppText>
            <RegularTextInput 
                maxLength={255} 
                multiline={true}
                style={{ marginHorizontal: 15, color: black, fontSize: 15, flexWrap: "wrap"}}
                value={bio}
                onChangeText={setBio}>
            </RegularTextInput>
            <View>
                <View style={{justifyContent: "center", alignItems: "center"}}><Line style={{width: "90%"}}/></View>
                <View style={{flexDirection: "row", alignItems: "center", marginBottom: 15}}>
                    <AppText style={styles.ListHeader}>
                        Wykształcenie:
                    </AppText>
                </View>
                {ListEducation()}
                <View style={{justifyContent: "center", alignItems: "center"}}><Line style={{width: "90%"}}/></View>
                <View style={{flexDirection: "row", alignItems: "center", marginBottom: 15}}>
                    <AppText style={styles.ListHeader}>
                        Doświadczenie zawodowe:
                    </AppText>
                </View>
                {ListExperience()}
                <View style={{justifyContent: "center", alignItems: "center"}}><Line style={{width: "90%"}}/></View>
                
            </View>
            <View style={{ width: "100%", flexDirection: "column", justifyContent: "space-around", margin: 10 }}>
                <AppText style={{fontSize: 19, color: black }}>Umiejętności:</AppText>
                <View style={{ width: "90%", flexDirection: "row", flexWrap: "wrap" }}>
                    {ListSkills()}
                </View>
                <AppText style={{fontSize: 19, color: black }}>Języki:</AppText>
                <View style={{ width: "90%", flexDirection: "row", flexWrap: "wrap" }}>
                    {ListLanguages()}
                </View>
                <AppText style={{fontSize: 19, color: black}}>Tagi:</AppText>
                <View style={{width: "90%", flexDirection: "row", flexWrap: "wrap" }}>
                    {ListTags()}
                </View>
                <AppText style={{fontSize: 19, color: black}}>Linki: </AppText>
                {ListLinks()}
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", alignContent: "center", marginBottom: 15}}>
                <Button onPress={() => updateArtistProfile()}title='Zapisz' color={darkLight}>
                </Button>
                <Button title='Odrzuć' color={darkLight}>
                </Button>
            </View>
            </ScrollView>) : (
            <Loading />
        ) }</>
    );
}

export default ProfileEditing;


const styles = StyleSheet.create({
    HeaderViewStyle: {
        justifyContent: "flex-end",
    },
    ContentLabelStyle: {
        flexDirection: "row",
        width: "100%",
        height: 35,
    },
    IconStyle: {
        height: 30,
        width: 30,
        tintColor: darkLight
    },
    ListHeader: {
        fontSize: 19,
        color: black,
        marginHorizontal: 10,
    },
    ListElement: {
        color: black,
        marginHorizontal: 15,
    },
    About: {
        fontFamily: 'LexendDeca-SemiBold',
        fontSize: 22,
        marginHorizontal: 10,
        color: black,
    }
});