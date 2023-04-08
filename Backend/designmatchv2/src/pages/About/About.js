import React from 'react';
import { AllPage, Top, Date, Bottom, Border, Question, Space } from './Elements';

const About = () => {
  return (
    <AllPage>
        <Border>
        <Top>O nas!</Top>
        <Space></Space>
        <Question>Kim jesteśmy?</Question>     
          <Date>Wystartowaliśmy w 2023, Designmatch jest serwisem
                na którym można kupić różne rodzaje grafik, pojekty i obrazy
                stworzone przez zarejestrowanych design'erów.</Date> 
        <Question>Dlaczego my?</Question> 
          <Date>Jeszcze nie wiem, ale wygląda to trochę jak komunikator.</Date> 
        <Bottom>Zostań częścią przyszłości!</Bottom>
      </Border>- ,
    </AllPage>
  )
};

export default About;