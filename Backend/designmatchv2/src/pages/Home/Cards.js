import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import {
  Cards2,
  FilterWrapper,
  SubtitleText,
  TitleText,
  CheckBoxLabel,
  CheckBoxWrapper,
  CheckBox,
  JobText,
  Input,
  FilterLabel,
  StyledSelect,
  StyledOption,
  CardsWrapper,
  StyledOptgroup,
  CategoryText,
  RightLabel,
  TopSection,
  Button,
  FilterDropDownContainer,
  Icon,
  CategoryWrapper,
  CheckBoxText,
} from './CardsElement';
import axios from '../../api/axios';
import { useMemo } from 'react';
import LoadingPage from '../LoadingPage';
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cards = () => {
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [getData, setGetData] = useState(null);
  const [selectLanguage, setSelectLanguage] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [selectTag, setSelectTag] = useState("");
  const [levelsFilter, setLevelsFilter] = useState([]);
  const [citiesFilter, setCitiesFilter] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [languagesFilter, setLanguagesFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [selectCategories, setSelectCategories] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const urlFilter = process.env.REACT_APP_GET_ARTIST_FILTER;

  const handleCityChange = (e) => {
    const city = e.target.id;
    if (e.target.checked) {
      setCitiesFilter([...citiesFilter, city]);
    } else {
      setCitiesFilter(citiesFilter.filter((c) => c !== city));
    }
  };

  const handleLanguageChange = (e) => {
    const language = e.target.id;
    if (e.target.checked) {
      setLanguagesFilter([...languagesFilter, language]);
    } else {
      setLanguagesFilter(languagesFilter.filter((c) => c !== language));
    }
  };

  const handleTagChange = (e) => {
    const tag = e.target.id;
    if (e.target.checked) {
      setTagsFilter([...tagsFilter, tag]);
    } else {
      setTagsFilter(tagsFilter.filter((c) => c !== tag));
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.id;
    if (e.target.checked) {
      setCategoriesFilter([...categoriesFilter, category]);
    } else {
      setCategoriesFilter(categoriesFilter.filter((c) => c !== category));
    }
  };

  const handleLevelChange = (e) => {
    const level = e.target.id;
    if (e.target.checked) {
      setLevelsFilter([...levelsFilter, level]);
    } else {
      setLevelsFilter(levelsFilter.filter((c) => c !== level));
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [citiesResponse, languagesResponse, tagsResponse, categoriesResponse, levelsResponse, filteredResponse] = await Promise.all([
  //         axios.request({
  //           method: 'get',
  //           maxBodyLength: 5000,
  //           url: "/api/artist/getAvailableCities",
  //           headers: {},
  //         }),
  //         axios.request({
  //           method: 'get',
  //           maxBodyLength: 5000,
  //           url: "/api/artist/getAvailableLanguages",
  //           headers: {},
  //         }),
  //         axios.request({
  //           method: 'get',
  //           maxBodyLength: 5000,
  //           url: "/api/artist/getAvailableTags",
  //           headers: {},
  //         }),
  //         axios.request({
  //           method: 'get',
  //           maxBodyLength: 5000,
  //           url: "/api/artist/getAvailableCategories",
  //           headers: {},
  //         }),
  //         axios.request({
  //           method: 'get',
  //           maxBodyLength: 5000,
  //           url: "/api/artist/getAvailableLevels",
  //           headers: {},
  //         }),
  //         axios.post(
  //           '/artist/filter',
  //           {
  //             level: levelsFilter,
  //             location: citiesFilter,
  //             skills: categoriesFilter,
  //             languages: languagesFilter,
  //             tags: tagsFilter,
  //           },
  //           {
  //             params: { page: 0, size: 10 },
  //             headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  //           }),
  //       ]);
  //       setCities(citiesResponse.data);
  //       setLanguages(languagesResponse.data);
  //       setTags(tagsResponse.data);
  //       setCategories(categoriesResponse.data);
  //       setLevels(levelsResponse.data);
  //       setFiltered(filteredResponse.data);
  //       setGetData("Get all data");
  //     } catch (err) {
  //       console.error(err);
  //       setGetData(null);
  //     }
  //   };

  //   fetchData();
  // }, [levelsFilter, categoriesFilter, languagesFilter, citiesFilter, tagsFilter]);

  const citiesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableCities',
      headers: {},
    }),
    [],
  );

  const tagsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableTags',
      headers: {},
    }),
    [],
  );

  const languagesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableLanguages',
      headers: {},
    }),
    [],
  );

  const levelsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableLevels',
      headers: {},
    }),
    [],
  );

  const categoriesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableCategories',
      headers: {},
    }),
    [],
  );

  useEffect(() => {
    const filter = async () => {
      try {
        const response = await axios
          .post(
            '/artist/filter',
            {
              level: levelsFilter,
              location: citiesFilter,
              skills: categoriesFilter,
              languages: languagesFilter,
              tags: tagsFilter,
            },
            {
              params: { page: 0, size: 10 },
              headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            },
          )
          .catch((error) => {
            console.log(error);
          });
        if ((response.status = 200)) {
          setFiltered(response.data);
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    filter();
  }, [levelsFilter, categoriesFilter, languagesFilter, citiesFilter, tagsFilter]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData),
          ],
        );
        setCities(citiesResponse.data);
        setTags(tagsResponse.data);
        setLevels(levelsResponse.data);
        setLanguages(languagesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [citiesData, tagsData, categoriesData, languagesData, levelsData]);


  const cityOptions = useMemo(() => {
    return cities.map((city, index) => (
      <CheckBoxWrapper key={index}>
        <div>
          <CheckBox
            type='checkbox'
            id={city}
            checked={citiesFilter.includes(city)}
            onChange={handleCityChange}
          />
          <CheckBoxLabel htmlFor={city} />
        </div>
        <CheckBoxText>{city}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const languageOptions = useMemo(() => {
    return languages.map((language, index) => (
      <CheckBoxWrapper key={index}>
        <div>
          <CheckBox
            type='checkbox'
            id={language}
            checked={languagesFilter.includes(language)}
            onChange={handleLanguageChange}
          />
          <CheckBoxLabel htmlFor={language} />
        </div>
        <CheckBoxText>{language}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const tagOptions = useMemo(() => {
    return tags.map((tag, index) => (
      <CheckBoxWrapper key={index}>
        <div>
          <CheckBox
            type='checkbox'
            id={tag}
            checked={tagsFilter.includes(tag)}
            onChange={handleTagChange}
          />
          <CheckBoxLabel htmlFor={tag} />
        </div>
        <CheckBoxText>{tag}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const levelOptions = useMemo(() => {
    return levels.map((level, index) => (
      <CheckBoxWrapper key={index}>
        <div>
          <CheckBox
            type='checkbox'
            id={level}
            checked={levelsFilter.includes(level)}
            onChange={handleLevelChange}
          />
          <CheckBoxLabel htmlFor={level} />
        </div>
        <CheckBoxText>{level}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const categoryOptions = useMemo(() => {
    if (!Array.isArray(categories.categories)) {
      return null;
    }

    return categories.categories.map((category, indexC) => (
      <CategoryWrapper>
        <CategoryText key={indexC}>{category.name}</CategoryText>
        {category.subcategories.map((subcategory, indexS) => (
          <CheckBoxWrapper key={indexS}>
            <div>
              <CheckBox
                type='checkbox'
                id={subcategory}
                checked={categoriesFilter.includes(subcategory)}
                onChange={handleCategoryChange}
              />
              <CheckBoxLabel htmlFor={subcategory} />
            </div>
            <CheckBoxText>{subcategory}</CheckBoxText>
          </CheckBoxWrapper>
        ))}

      </CategoryWrapper>
    ));
  });

  //console.log(filtered.content[0].firstname);

  const filteredCards = useMemo(() => {
    if (!filtered || !filtered.content) {
      return null;
    }

    return filtered.content.map((filter, indexF) => (
      <CardItem key={indexF}
        avatar="/assets/cards/person1.jpg"
        name={filter.firstname}
        surname={filter.lastname}
        level={filter.level}
        rating={3.5}
        ratingCount={12}
        city={filter.city}
        skills={filter.skills}
        project1="/assets/cards/design1.jpg"
        project2="/assets/cards/design2.png"
        project3="/assets/cards/design3.jpg"
        project4="/assets/cards/design4.png"
      />
    ));
  });

  const handleCityVisibleClick = () => {
    setShowCities(!showCities);
  }

  const handleLanguageVisibleClick = () => {
    setShowLanguages(!showLanguages);
  }

  const handleTagVisibleClick = () => {
    setShowTags(!showTags);
  }

  const handleCategoryVisibleClick = () => {
    setShowCategories(!showCategories);
  }

  const handleLevelVisibleClick = () => {
    setShowLevels(!showLevels);
  }

  return (
    <Cards2>
      <FilterLabel>
        <TitleText>Filtruj</TitleText>
        <FilterWrapper>
          <FilterDropDownContainer onClick={handleCityVisibleClick}>
            <FontAwesomeIcon icon={showCities ? faChevronDown : faChevronRight} />
            <SubtitleText>Skąd?</SubtitleText>
          </FilterDropDownContainer>
          {showCities && (
            <>
              {cityOptions}
            </>
          )}
          <FilterDropDownContainer onClick={handleLanguageVisibleClick}>
            <FontAwesomeIcon icon={showLanguages ? faChevronDown : faChevronRight} />
            <SubtitleText>Języki</SubtitleText>
          </FilterDropDownContainer>
          {showLanguages && (
            <>
              {languageOptions}
            </>
          )}
          <FilterDropDownContainer onClick={handleTagVisibleClick}>
            <FontAwesomeIcon icon={showTags ? faChevronDown : faChevronRight} />
            <SubtitleText>Tagi</SubtitleText>
          </FilterDropDownContainer>
          {showTags && (
            <>
              {tagOptions}
            </>
          )}
          <FilterDropDownContainer onClick={handleCategoryVisibleClick}>
            <FontAwesomeIcon icon={showCategories ? faChevronDown : faChevronRight} />
            <SubtitleText>Umiejętności</SubtitleText>
          </FilterDropDownContainer>
          {showCategories && (
            <>
              {categoryOptions}
            </>
          )}
          <FilterDropDownContainer onClick={handleLevelVisibleClick}>
            <FontAwesomeIcon icon={showLevels ? faChevronDown : faChevronRight} />
            <SubtitleText>Poziom</SubtitleText>
          </FilterDropDownContainer>
          {showLevels && (
            <>
              {levelOptions}
            </>
          )}
        </FilterWrapper>
      </FilterLabel>

      {filtered ? (
        <RightLabel>
          <TopSection>
            <Button>Filteruj</Button>
            <StyledSelect>
              <StyledOption value="">Sortuj po...</StyledOption>
              <StyledOption value="1">najlepsza ocena</StyledOption>
              <StyledOption value="2">najwięcej prac</StyledOption>
              <StyledOption value="3">ostatnia aktywność</StyledOption>
            </StyledSelect>
          </TopSection>
          <CardsWrapper>
            {filteredCards}
          </CardsWrapper>
        </RightLabel>

      ) : (
        <LoadingPage /> //test tego albo
        /*
        <CardsWrapper> //tego nie wiem co lepsze
          <CardItem />
          <CardItem />
          <CardItem />
        </CardsWrapper>
        */
      )}
    </Cards2>
  )
}

export default Cards;