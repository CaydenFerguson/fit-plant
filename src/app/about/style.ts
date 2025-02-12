import styled from 'styled-components'

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 10%;
  border-radius: 20px;
  text-align: left;
  width: 100%;
  gap: 50px;
  max-width: 1300px;
  margin: auto;
`

export const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const Logo = styled.img`
  width: 550px;
  height: auto;
  border-radius: 15px;
  max-width: 100%;
`

export const HeroContent = styled.div`
  flex: 2;
  text-align: left;
  max-width: 600px;
`

export const HeroTitle = styled.h1`
  font-size: 4rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`

export const HeroSubtitle = styled.p`
  font-size: 1.8rem;
  color: #ffffff;
  line-height: 1.8;
  text-align: center;
`

export const ContentSection = styled.section`
  max-width: 1100px;
  margin: 80px auto;
  text-align: left;
  padding: 20px;
`

export const ContentTitle = styled.h2`
  font-size: 3rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 10px;
`

export const ContentText = styled.p`
  font-size: 1.6rem;
  color: #ffffff;
  line-height: 2;
  margin-bottom: 10px;
  max-width: 900px;
`

export const WhyChooseSection = styled(ContentSection)``

export const WhyChooseItem = styled.p`
  font-size: 1.6rem;
  color: #ffffff;
  margin-bottom: 10px;
  text-align: left;
  display: flex;
  align-items: left;
  gap: 15px;
`

export const ContactSection = styled(ContentSection)``

export const ContactLink = styled.a`
  font-size: 1.6rem;
  color: #ffffff;
  text-decoration: none;
  margin: 10px;
  display: block;
  transition: color 0.3s ease;

  &:hover {
    color: #66bb6a;
  }
`
