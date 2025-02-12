'use client'

import React from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import {
  HeroSection,
  HeroContent,
  LogoContainer,
  Logo,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  ContentTitle,
  ContentText,
  ContactSection,
  WhyChooseSection,
  ContactLink,
  WhyChooseItem,
} from './style'

export default function AboutPage() {
  return (
    <NormalPageLayout>
      <HeroSection>
        <LogoContainer>
          <Logo src="/icons/icon-192x192.png" alt="Fit Plant Logo" />
        </LogoContainer>

        <HeroContent>
          <HeroTitle>Oh hey there!</HeroTitle>
          <HeroSubtitle>
            We are Fit Plant, and our mission is to make plant care smarter and
            easier for everyone. 🌱
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentTitle>About Fit Plant</ContentTitle>
        <ContentText>
          Fit Plant is an innovative plant monitoring solution designed to keep
          your green friends thriving. Our system integrates advanced sensor
          technology with a centralized hub, ensuring real-time insights into
          your plant’s health.
        </ContentText>
        <ContentText>
          Built on <strong>Next.js</strong>, our responsive front-end delivers a
          seamless desktop experience, while integration with{' '}
          <strong>PWA</strong> and <strong>Capacitor</strong> ensures a
          native-like mobile experience.
        </ContentText>
        <ContentText>
          Powered by <strong>Firebase</strong>, Fit Plant offers a secure and
          scalable backend, making it easier than ever to care for your plants.
        </ContentText>
      </ContentSection>

      <WhyChooseSection>
        <ContentTitle>Why Choose Fit Plant?</ContentTitle>
        <WhyChooseItem>✅ Real-time plant monitoring</WhyChooseItem>
        <WhyChooseItem>✅ User-friendly interface</WhyChooseItem>
        <WhyChooseItem>✅ Secure & scalable technology</WhyChooseItem>
        <WhyChooseItem>✅ Mobile-friendly experience</WhyChooseItem>
      </WhyChooseSection>

      <ContactSection>
        <ContentTitle>Get in Touch</ContentTitle>
        <ContactLink href="mailto:support@fitplant.com">
          📧 support@fitplant.com
        </ContactLink>
        <ContactLink href="">🐦 Twitter</ContactLink>
        <ContactLink href="">📷 Instagram</ContactLink>
      </ContactSection>
    </NormalPageLayout>
  )
}
