'use client'

import React from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import PanelGeneric from '@/components/panels/panelGeneric'
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
      <PanelGeneric>
        <HeroSection>
          <LogoContainer>
            <Logo src="/icons/Logo.png" alt="Fit Plant Logo" />
          </LogoContainer>

          <HeroContent>
            <HeroTitle>Oh hey there!</HeroTitle>
            <HeroSubtitle>
              We are Fit Plants, and our mission is to make plant care smarter
              and easier for everyone. 🌱
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <ContentSection>
          <ContentTitle>About Fit Plants</ContentTitle>
          <ContentText>
            Fit Plants is an innovative plant monitoring solution designed to
            keep your green friends thriving. Our system integrates advanced
            sensor technology with a centralized hub, ensuring real-time
            insights into your plant’s health.
          </ContentText>
          <ContentText>
            Built on <strong>Next.js</strong>, our responsive front-end delivers
            a seamless desktop experience, while integration with{' '}
            <strong>PWA</strong> and <strong>Capacitor</strong> ensures a
            native-like mobile experience.
          </ContentText>
          <ContentText>
            Powered by <strong>Firebase</strong>, Fit Plants offers a secure and
            scalable backend, making it easier than ever to care for your
            plants.
          </ContentText>
        </ContentSection>

        <WhyChooseSection>
          <ContentTitle>Why Choose Fit Plants?</ContentTitle>
          <WhyChooseItem>✅ Real-time plant monitoring</WhyChooseItem>
          <WhyChooseItem>✅ User-friendly interface</WhyChooseItem>
          <WhyChooseItem>✅ Secure & scalable technology</WhyChooseItem>
          <WhyChooseItem>✅ Mobile-friendly experience</WhyChooseItem>
        </WhyChooseSection>

        <ContactSection>
          <ContentTitle>Get in Touch</ContentTitle>
          <ContactLink href="mailto:support@fitplants.com">
            📧 support@fitplants.com
          </ContactLink>
          <ContactLink href="">🐦 Twitter</ContactLink>
          <ContactLink href="">📷 Instagram</ContactLink>
        </ContactSection>
      </PanelGeneric>
    </NormalPageLayout>
  )
}
