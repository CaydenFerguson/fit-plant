import styled from '@emotion/styled'
import { device } from '@/app/theme'

export const HeroSection = styled.section`git
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
  padding: 20px;
  width: 100%;
  margin: auto;

  ${device.lg} {
    align-items: center;
    justify-content: center;
    padding: 100px 10%;
    border-radius: 20px;
    text-align: left;
    gap: 50px;
    max-width: 1300px;
    margin: auto;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  ${device.lg} {
    justify-content: flex-start;
  }
`

export const Logo = styled.img`
  width: 200px;
  height: auto;
  border-radius: 15px;
  max-width: 100%;

  ${device.lg} {
    width: 400px;
  }
`

export const HeroContent = styled.div`
  flex: 1;
  max-width: 100%;
  text-align: center;

  ${device.lg} {
    flex: 2;
    text-align: left;
    max-width: 600px;
  }
`

export const HeroTitle = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;

  ${device.md} {
    font-size: 3rem;
  }

  ${device.lg} {
    font-size: 3.5rem;
  }
`

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  line-height: 1.8;
  text-align: center;

  ${device.md} {
    font-size: 1.6rem;
  }

  ${device.lg} {
    font-size: 1.7rem;
  }
`

export const ContentSection = styled.section`
  width: 100%;
  margin: 20px auto;
  text-align: center;
  padding: 20px;

  ${device.lg} {
    max-width: 1100px;
    margin: 50px auto;
    text-align: left;
    padding: 20px;
  }
`

export const ContentTitle = styled.h2`
  font-size: 2rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 10px;

  ${device.md} {
    font-size: 2.5rem;
  }

  ${device.lg} {
    font-size: 2.7rem;
  }
`

export const ContentText = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  line-height: 1.8;
  margin-bottom: 10px;
  max-width: 100%;

  ${device.md} {
    font-size: 1.4rem;
  }

  ${device.lg} {
    font-size: 1.5rem;
    max-width: 900px;
  }
`

export const WhyChooseSection = styled(ContentSection)`
  margin-top: 30px;
`

export const WhyChooseItem = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 8px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 15px;

  ${device.md} {
    font-size: 1.4rem;
  }

  ${device.lg} {
    font-size: 1.5rem;
  }
`

export const ContactSection = styled(ContentSection)`
  margin-top: 20px;
`

export const ContactLink = styled.a`
  font-size: 1.2rem;
  color: #ffffff;
  text-decoration: none;
  margin: 8px;
  display: block;
  transition: color 0.3s ease;

  &:hover {
    color: #66bb6a;
  }

  ${device.md} {
    font-size: 1.4rem;
  }

  ${device.lg} {
    font-size: 1.5rem;
  }
`
